from database import Media, FragmentMedia
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


async def delete_media_by_id_db(db: Session, media_id: int) -> None:
    db.query(Media).filter(Media.id == media_id).delete()


async def delete_media_by_public_path_db(db: Session, fragment_id: int, public_path: str) -> None:
    media: Media = db.query(Media).filter(Media.public_path == public_path).first()
    if media is None:
        raise IndexError
    media_fragment: FragmentMedia = db.query(FragmentMedia).filter((FragmentMedia.fragment_id == fragment_id), (FragmentMedia.media_id == media.id)).first()
    if media_fragment is not None:
        await delete_media_by_id_db(db, media.id)
        db.query(FragmentMedia).filter(FragmentMedia.id == media_fragment.id).delete()
    else:
        raise IndexError


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
