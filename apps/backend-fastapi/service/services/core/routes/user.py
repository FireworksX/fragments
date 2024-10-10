from fastapi import HTTPException, status
from .schemas import UserGet, AuthPayload
from typing import Optional, Dict, Any
from crud.user import get_user_by_email_db, create_user_db
from services.core.utils import create_access_token, create_refresh_token, get_password_hash, verify_password
from database import Session
from database.models import User


async def login(info, email: str, password: str) -> AuthPayload:
    db: Session = info.context.session()
    user: User = await get_user_by_email_db(db, email)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='User does not exist')

    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Wrong password')

    access_token = create_access_token(
        data={"sub": user.email})

    refresh_token = create_refresh_token(data={"sub": user.email})
    return AuthPayload(
        user=user,
        access_token=access_token,
        refresh_token=refresh_token
    )


async def signup(info, email: str, first_name: str, last_name: Optional[str],
                 password: str) -> AuthPayload:
    db: Session = info.context.session()
    user: User = await get_user_by_email_db(db, email)
    if user is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='User with the same email address already exists')
    hashed_password: str = get_password_hash(password)
    user: User = await create_user_db(db, email, first_name, last_name, hashed_password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create a user")

    access_token = create_access_token(
        data={"sub": user.email})

    refresh_token = create_refresh_token(data={"sub": user.email})
    return AuthPayload(
        user=user,
        access_token=access_token,
        refresh_token=refresh_token
    )


async def profile(info):
    user = await info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user


async def refresh(info):
    user = await info.context.refresh_user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user
