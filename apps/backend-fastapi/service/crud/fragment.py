from crud.media import get_media_by_id_db
from database import FragmentMedia
from database.models import Project, Fragment
from sqlalchemy.orm import Session
from typing import Optional, List


async def create_fragment_db(db: Session, name: str, author_id: int, project_id: int, document: str,
                             props: str) -> Fragment:
    fragment: Fragment = Fragment(name=name, author_id=author_id, project_id=project_id, document=document, props=props)
    db.add(fragment)
    db.commit()
    db.refresh(fragment)
    return fragment


async def get_fragment_by_id_db(db: Session, fragment_id: int) -> Optional[Fragment]:
    return db.query(Fragment).filter(Fragment.id == fragment_id).first()


async def get_fragments_by_project_id_db(db: Session, project_id: int) -> List[Fragment]:
    return db.query(Fragment).filter(Fragment.project_id == project_id).all()


async def update_fragment_by_id_db(db: Session, values: dict) -> Fragment:
    fragment: Fragment = await get_fragment_by_id_db(db, values['id'])
    if values.get('name') is not None:
        fragment.name = values['name']
    if values.get('document') is not None:
        fragment.document = values['document']
    if values.get('props') is not None:
        fragment.props = values['props']
    db.merge(fragment)
    db.commit()
    db.refresh(fragment)
    return fragment


async def add_fragment_media(db, media_id: int, fragment_id: int) -> Fragment:
    fragment_media: FragmentMedia = FragmentMedia(media_id=media_id, fragment_id=fragment_id)
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    fragment_media.media = await get_media_by_id_db(db, media_id)
    fragment_media.fragment = fragment
    fragment.assets.append(fragment_media)
    db.commit()
    db.refresh(fragment)
    return fragment
