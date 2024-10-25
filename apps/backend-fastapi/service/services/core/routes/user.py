import strawberry
from fastapi import HTTPException, status, UploadFile

from crud.bucket import add_file
from crud.media import get_media_by_id_db
from .middleware import Context
from .schemas import UserGet, AuthPayload, MediaGet
from typing import Optional, Dict, Any
from crud.user import get_user_by_email_db, create_user_db
from services.core.utils import create_access_token, create_refresh_token, get_password_hash, verify_password
from database import Session, Media
from database.models import User
from conf.settings import service_settings

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

async def add_avatar(info: strawberry.Info[Context], file: UploadFile) -> UserGet:
    auth: AuthPayload = await info.context.user().user()
    db: Session = info.context.session()

    user: User = await get_user_by_email_db(db, auth.user.email)
    if user.avatar_id is not None:
        pass
        # TODO need to remote old avatar

    filePath = f'{service_settings.MEDIA_STORAGE_PATH}/avatars/{user.id}/{file.filename}'

    add_file(filePath, file.file.read())



# async def add_avatar(info: strawberry.Info[Context], file: UploadFile) -> MediaGet:
#     user: AuthPayload = await info.context.user()
#     db: Session = info.context.session()
#
#
#         filePath = f'{FOLDER}/{uuid.uuid4()}-{file.filename}'
#
#         try:
#             print("buckets", supabase.storage.list_buckets())
#             bucket = supabase.storage.get_bucket(PROJECT_BUCKET)
#
#         except StorageException as e:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e)
#
#         result = bucket.upload(path=filePath, file=file.file.read())
#         public_url = supabase.storage.from_(PROJECT_BUCKET).get_public_url(filePath)
#
#         ext: str = file.filename.split('.')[-1]
#
#         entry = supabase.table('media').insert(
#             {'path': filePath, 'name': file.filename, 'ext': ext, 'public_path': public_url,
#              'user': user.user.id}).execute()
#         return MediaGet(id=entry.data[0]['id'], path=public_url)

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
