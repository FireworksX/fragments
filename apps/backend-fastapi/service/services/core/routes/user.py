from services.dependencies import supabase
from gotrue.errors import AuthApiError
from fastapi import HTTPException, status
from .schemas import User, AuthPayload
from typing import Optional

async def login(email: str, password: str) -> AuthPayload:
    # Authenticate with Supabase
    response = supabase.auth.sign_in_with_password({"email": email, "password": password})

    if response is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    # Assuming usersService.find_one_user_by_email is a synchronous function
    data = supabase.postgrest.from_table("users").select("*").eq("email", email).execute()
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user: User = User(last_name=data.dict()['data'][0]['last_name'],
                      first_name=data.dict()['data'][0]['first_name'],
                      id=data.dict()['data'][0]['id'],
                      email=data.dict()['data'][0]['email'])
    return AuthPayload(
        user=user,
        access_token=response.session.access_token,
        refresh_token=response.session.refresh_token
    )

async def signup(email: str, password: str, first_name: str, last_name: Optional[str] = None) -> AuthPayload:
    # Authenticate with Supabase
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
    except AuthApiError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

    if response is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    # Assuming usersService.find_one_user_by_email is a synchronous function
    data = supabase.postgrest.table("users").insert({"last_name":last_name, "first_name": first_name, "email": email}).execute()
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user: User = User(last_name=data.dict()['data'][0]['last_name'],
                      first_name=data.dict()['data'][0]['first_name'],
                      id=data.dict()['data'][0]['id'],
                      email=data.dict()['data'][0]['email'])
    return AuthPayload(
        user=user,
        access_token=response.session.access_token,
        refresh_token=response.session.refresh_token
    )

async def logout(info):
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return supabase.auth.sign_out()

async def profile(info):
    user = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user

async def refresh(info):
    user = info.context.refresh_user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user