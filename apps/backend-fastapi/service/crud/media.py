from database import Media
from database.models import Campaign, Project, ProjectCampaign
from sqlalchemy.orm import Session
from typing import Optional, List


async def create_media_db(db: Session, name: str, path: str, ext: str, public_path: str) -> Media:
    media: Media = Media(name=name, path=path, ext=ext, public_path=public_path)
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


async def get_media_by_id_db(db: Session, media_id: int) -> Optional[Media]:
    return db.query(Media).filter(Media.id == media_id).first()


async def update_media_by_id_db(db: Session, values: dict) -> Campaign:
    media: Media = await get_media_by_id_db(db, values['id'])
    if values.get('name') is not None:
        media.name = values['name']
    if values.get('path') is not None:
        media.path = values['path']
    if values.get('ext') is not None:
        media.ext = values['ext']
    if values.get('public_path') is not None:
        media.public_path = values['public_path']
    db.merge(media)
    db.commit()
    db.refresh(media)
    return media
