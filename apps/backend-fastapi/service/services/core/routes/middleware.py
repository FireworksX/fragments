from .schemas import UserGet, AuthPayload
from strawberry.fastapi import BaseContext
from database import Session
from database.models import User
from services.dependencies import get_db
from crud.user import get_user_by_email_db
from conf.settings import service_settings
from services.core.utils import create_access_token, create_refresh_token
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import HTTPException, status

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"Authorization": "token"},
    )
class Context(BaseContext):
    async def user(self) -> AuthPayload | None:
        if not self.request:
            return None

        authorization = self.request.headers.get("Authorization", None)
        refresh = self.request.headers.get("Refresh", None)

        try:
            payload = jwt.decode(authorization, service_settings.ACCESS_TOKEN_SECRET_KEY, algorithms=[service_settings.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception
        user: User = await get_user_by_email_db(self.session(), email)
        if user is None:
            raise credentials_exception
        if refresh is None:
            refresh = create_refresh_token(data={"sub": user.email})
        return AuthPayload(
            user=user,
            access_token=authorization,
            refresh_token=refresh
        )

    async def refresh_user(self) -> AuthPayload | None:
        if not self.request:
            return None

        refresh = self.request.headers.get("Refresh", None)
        try:
            payload = jwt.decode(refresh, service_settings.REFRESH_TOKEN_SECRET_KEY,
                                 algorithms=[service_settings.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception
        user: User = await get_user_by_email_db(self.session(), email)
        if user is None:
            raise credentials_exception
        return AuthPayload(
            user=user,
            access_token=create_access_token(data={"sub": user.email}),
            refresh_token=refresh
        )

    def session(self) -> Session:
        return next(get_db())

async def get_context() -> Context:
    return Context()
