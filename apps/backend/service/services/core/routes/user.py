from copy import copy, deepcopy

import strawberry
from fastapi import HTTPException, status, UploadFile

from crud.media import create_media_db, delete_media_by_id_db
from .middleware import Context
from .schemas.user import UserGet, AuthPayload
from typing import Optional
from crud.user import get_user_by_email_db, create_user_db
from services.core.utils import create_access_token, create_refresh_token, get_password_hash, verify_password
from database import Session, Media
from database.models import User


async def login(info: strawberry.Info[Context], email: str, password: str) -> AuthPayload:
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


async def signup(info: strawberry.Info[Context], email: str, first_name: str, last_name: Optional[str],
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


async def add_avatar_route(info: strawberry.Info[Context], file: UploadFile) -> UserGet:
    auth: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    user: User = await get_user_by_email_db(db, auth.user.email)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    media: Media = await create_media_db(db, file)
    if media is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='Failed to create media file')
    user.avatar_id = media.id
    db.commit()

    return UserGet(id=user.id, email=user.email, first_name=user.first_name, last_name=user.last_name,
                   logo=user.avatar.public_path)


async def delete_avatar_route(info: strawberry.Info[Context]) -> UserGet:
    auth: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    user: User = await get_user_by_email_db(db, auth.user.email)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    await delete_media_by_id_db(db, user.avatar_id)
    user.avatar_id = None
    db.commit()
    return UserGet(id=user.id, email=user.email, first_name=user.first_name, last_name=user.last_name,
                   logo=user.avatar.public_path)


async def profile(info: strawberry.Info[Context]):
    user = await info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user


async def refresh(info: strawberry.Info[Context]):
    user = await info.context.refresh_user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user
