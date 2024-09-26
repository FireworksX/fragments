from typing import List
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, Media
from .middleware import Context
import uuid
from storage3.utils import StorageException
from fastapi import FastAPI, File, UploadFile

FOLDER = 'assets'
PROJECT_BUCKET = 'project'


async def upload_asset(info: strawberry.Info[Context], file: UploadFile) -> Media:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    filePath = f'{FOLDER}/{uuid.uuid4()}-{file.filename}'

    try:
        print("buckets", supabase.storage.list_buckets())
        bucket = supabase.storage.get_bucket(PROJECT_BUCKET)

    except StorageException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e)

    result = bucket.upload(path=filePath, file=file.file.read())
    public_url = supabase.storage.from_(PROJECT_BUCKET).get_public_url(filePath)

    ext: str = file.filename.split('.')[-1]

    entry = supabase.table('media').insert({'path': filePath, 'name': file.filename, 'ext': ext, 'public_path': public_url, 'user': user.user.id}).execute()
    return Media(id=entry.data[0]['id'], path=public_url)


async def asset(info: strawberry.Info[Context], id_: int) -> Media:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    entry = supabase.table('media').select('*').eq('id', id_).execute()
    return Media(id=entry.data[0]['id'], path=entry.data[0]['public_path'])
