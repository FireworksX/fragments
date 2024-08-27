from services.dependencies import supabase
from .schemas import User, AuthPayload
from strawberry.fastapi import BaseContext
class Context(BaseContext):
    def user(self) -> AuthPayload | None:
        if not self.request:
            return None

        authorization = self.request.headers.get("Authorization", None)
        refresh = self.request.headers.get("refresh", None)
        rsp = supabase.auth.get_user(authorization)
        if rsp is None:
            return None

        email: str = rsp.dict()['user']['user_metadata']['email']

        data = supabase.postgrest.from_table("users").select("*").eq("email", email).execute()
        if not data:
            return None
        user: User = User(last_name=data.dict()['data'][0]['last_name'],
                          first_name=data.dict()['data'][0]['first_name'],
                          id=data.dict()['data'][0]['id'],
                          email=data.dict()['data'][0]['email'])
        return AuthPayload(
            user=user,
            access_token=authorization,
            refresh_token=refresh
        )

    def refresh_user(self) -> AuthPayload | None:
        if not self.request:
            return None

        refresh = self.request.headers.get("refresh", None)
        rsp = supabase.auth.refresh_session(refresh)
        if rsp is None:
            return None

        email: str = rsp.dict()['user']['user_metadata']['email']
        print(rsp.dict())

        data = supabase.postgrest.from_table("users").select("*").eq("email", email).execute()
        if not data:
            return None
        user: User = User(last_name=data.dict()['data'][0]['last_name'],
                          first_name=data.dict()['data'][0]['first_name'],
                          id=data.dict()['data'][0]['id'],
                          email=data.dict()['data'][0]['email'])
        return AuthPayload(
            user=user,
            access_token=rsp.session.access_token,
            refresh_token=rsp.session.refresh_token
        )

async def get_context() -> Context:
    return Context()
