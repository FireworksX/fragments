import math
import os
from io import BytesIO
from typing import Optional
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from conf import service_settings
from database import Media

from .image_generator import generate_image


async def create_media_db(
    db: Session, file: UploadFile, directory_id: Optional[int] = None
) -> Media:
    content = await file.read()
    unique_name = f"{uuid4()}_{file.filename}"
    path = os.path.join(service_settings.MEDIA_STORAGE_PATH, unique_name)

    # Save file to disk
    try:
        with open(path, 'wb') as f:
            f.write(content)
    except Exception as e:
        raise e

    media: Media = Media(
        filename=unique_name,
        content_type=file.content_type,
        data=content,
        path=path,
        directory_id=directory_id,
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


async def get_media_by_id_db(db: Session, media_id: int) -> Optional[Media]:
    return db.query(Media).filter(Media.id == media_id).first()


async def delete_media_by_id_db(db: Session, media_id: int) -> None:
    file = db.query(Media).get(media_id)

    if not file:
        return

    if os.path.exists(file.path):
        try:
            os.remove(file.path)
        except Exception as e:
            raise e

    # Delete from DB
    db.delete(file)
    db.commit()


async def generate_default_media(db: Session, filename: str) -> Media:
    img_byte_arr = generate_image()

    upload_file = UploadFile(
        file=img_byte_arr, filename=filename, headers={'content-type': 'image/png'}
    )

    return await create_media_db(db, upload_file)
