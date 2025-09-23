import os
from typing import Optional
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from conf import service_settings
from conf.settings import logger
from database import Media

from .image_generator import generate_image


async def create_media_db(
    db: Session, file: UploadFile, directory_id: Optional[int] = None
) -> Media:
    logger.info(f"Creating media from file: {file.filename}")
    content = await file.read()
    unique_name = f"{uuid4()}"
    path = os.path.join(service_settings.MEDIA_STORAGE_PATH, unique_name)

    # Save file to disk
    try:
        with open(path, 'wb') as f:
            f.write(content)
        logger.debug(f"Saved file to disk at: {path}")
    except Exception as e:
        logger.error(f"Failed to save file to disk: {str(e)}")
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
    logger.info(f"Successfully created media with ID: {media.id}")
    return media


async def get_media_by_id_db(db: Session, media_id: int) -> Optional[Media]:
    logger.info(f"Fetching media with ID: {media_id}")
    media = db.query(Media).filter(Media.id == media_id).first()
    if media:
        logger.debug(f"Found media: {media.filename}")
    else:
        logger.debug(f"No media found with ID: {media_id}")
    return media


async def delete_media_by_id_db(db: Session, media_id: int) -> None:
    logger.info(f"Deleting media with ID: {media_id}")
    file = db.query(Media).get(media_id)

    if not file:
        logger.debug(f"No media found with ID: {media_id}")
        return

    if os.path.exists(file.path):
        try:
            os.remove(file.path)
            logger.debug(f"Deleted file from disk: {file.path}")
        except Exception as e:
            logger.error(f"Failed to delete file from disk: {str(e)}")
            raise e

    # Delete from DB
    db.delete(file)
    db.commit()
    logger.info(f"Successfully deleted media with ID: {media_id}")


async def generate_default_media(db: Session) -> Media:
    logger.info(f"Generating default media")
    img_byte_arr: bytes = generate_image()

    upload_file = UploadFile(
        file=img_byte_arr, filename=f"{uuid4()}.png", headers={'content-type': 'image/png'}  # type: ignore[arg-type]
    )

    return await create_media_db(db, upload_file)
