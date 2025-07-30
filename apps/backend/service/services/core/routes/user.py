from typing import Optional

import strawberry
from fastapi import HTTPException, UploadFile, status

from conf.settings import logger
from crud.media import create_media_db, delete_media_by_id_db, generate_default_media
from crud.user import create_user_db, get_user_by_email_db
from database import Media, Session
from database.models import User
from services.core.utils import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
)

from .middleware import Context
from .schemas.media import MediaGet, MediaType
from .schemas.user import AuthPayload, UserGet


def user_db_to_user(user: User) -> UserGet:
    return UserGet(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        logo=MediaGet(
            media_id=user.avatar_id,
            media_type=MediaType.USER_LOGO,
            public_path=user.avatar.public_path,
        ),
    )


async def login(info: strawberry.Info[Context], email: str, password: str) -> AuthPayload:
    logger.info(f"Login attempt for user {email}")
    db: Session = info.context.session()
    user: User = await get_user_by_email_db(db, email)
    if user is None:
        logger.warning(f"Login failed - user {email} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')

    if not verify_password(password, user.hashed_password):
        logger.warning(f"Login failed - wrong password for user {email}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Wrong password')

    access_token = create_access_token(data={'sub': user.email})
    refresh_token = create_refresh_token(data={'sub': user.email})
    logger.info(f"Login successful for user {email}")
    return AuthPayload(
        user=user_db_to_user(user), access_token=access_token, refresh_token=refresh_token
    )


async def signup(
    info: strawberry.Info[Context],
    email: str,
    first_name: str,
    last_name: Optional[str],
    password: str,
) -> AuthPayload:
    logger.info(f"Signup attempt for user {email}")
    db: Session = info.context.session()
    user: User = await get_user_by_email_db(db, email)
    if user is not None:
        logger.warning(f"Signup failed - user {email} already exists")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='User with the same email address already exists',
        )
    hashed_password: str = get_password_hash(password)
    user = await create_user_db(db, email, first_name, last_name, hashed_password)

    access_token = create_access_token(data={'sub': user.email})
    refresh_token = create_refresh_token(data={'sub': user.email})
    logger.info(f"Signup successful for user {email}")
    return AuthPayload(
        user=user_db_to_user(user), access_token=access_token, refresh_token=refresh_token
    )


async def add_avatar_route(info: strawberry.Info[Context], file: UploadFile) -> MediaGet:
    auth: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Adding avatar for user {auth.user.email}")
    user: User = await get_user_by_email_db(db, auth.user.email)
    if user is None:
        logger.error(f"User {auth.user.email} not found when adding avatar")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    media: Media = await create_media_db(db, file)
    if media is None:
        logger.error(f"Failed to create media file for user {auth.user.email}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        )
    user.avatar_id = media.id
    db.commit()
    logger.info(f"Successfully added avatar for user {auth.user.email}")

    return MediaGet(
        media_id=media.id, media_type=MediaType.USER_LOGO, public_path=media.public_path
    )


async def delete_avatar_route(info: strawberry.Info[Context]) -> UserGet:
    auth: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Deleting avatar for user {auth.user.email}")
    user: User = await get_user_by_email_db(db, auth.user.email)
    if user is None:
        logger.error(f"User {auth.user.email} not found when deleting avatar")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    await delete_media_by_id_db(db, user.avatar_id)
    default_avatar = await generate_default_media(db, f"{user.first_name}.png")
    user.avatar_id = default_avatar.id
    db.commit()
    logger.info(f"Successfully deleted avatar for user {auth.user.email}")
    return user_db_to_user(user)


async def profile(info: strawberry.Info[Context]) -> AuthPayload:
    user = await info.context.user()
    if user is None:
        logger.warning('Profile access attempt with unauthorized user')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    logger.info(f"Profile accessed for user {user.user.email}")
    return user


async def refresh(info: strawberry.Info[Context]) -> AuthPayload:
    user = await info.context.refresh_user()
    if user is None:
        logger.warning('Token refresh attempt with unauthorized user')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    logger.info(f"Token refreshed for user {user.user.email}")
    return user
