from crud.media import get_media_by_id_db
from database import FragmentMedia
from database.models import Project, Fragment, Fragment
from sqlalchemy.orm import Session
from typing import Optional, List
import uuid
from sqlalchemy import desc, and_, func


async def create_fragment_db(db: Session, name: str, author_id: int, project_id: int, document: str,
                             props: str, linked_fragments: Optional[List[int]], directory_id: int) -> Fragment:
    fragment: Fragment = Fragment(project_id=project_id, name=name, author_id=author_id, document=document, props=props,
                                  directory_id=directory_id)
    if linked_fragments is not None:
        db.add(fragment)
        db.commit()
        fragments: List[Fragment] = db.query(Fragment).filter(Fragment.id.in_(linked_fragments)).all()
        for fr in fragments:
            fragment.linked_fragments.append(fr)
    else:
        db.add(fragment)
    db.commit()
    db.refresh(fragment)
    return fragment


async def get_fragments_by_ids_db(
        db: Session,
        fragment_ids: Optional[List[int]] = None,
        project_id: Optional[int] = None
) -> List[Fragment]:
    query = db.query(Fragment)

    if fragment_ids:
        query = query.filter(Fragment.id.in_(fragment_ids))

    if project_id:
        query = query.filter(Fragment.project_id == project_id)

    return query.all()


async def get_fragment_by_id_db(db: Session, fragment_id: int) -> Fragment:
    return db.query(Fragment).filter(Fragment.id == fragment_id).first()


async def get_fragments_by_project_id_db(db: Session, project_id: int) -> List[Fragment]:
    return db.query(Fragment).filter(Fragment.project_id == project_id).all()


async def update_fragment_by_id_db(db: Session, values: dict, linked_fragments: List[int]) -> Fragment:
    fragment_id: int = values['id']
    fragment: Fragment = db.query(Fragment).filter(Fragment.id == fragment_id).first()

    if linked_fragments is not None and len(linked_fragments) > 0:
        fragment.linked_fragments.clear()
        fragments: List[Fragment] = db.query(Fragment).filter(Fragment.id.in_(linked_fragments)).all()
        for fr in fragments:
            fragment.linked_fragments.append(fr)
        db.commit()

    if values.get('name') is not None:
        fragment.name = values['name']
    if values.get('document') is not None:
        fragment.document = values['document']
    if values.get('props') is not None:
        fragment.props = values['props']
    if values.get('directory_id') is not None:
        fragment.directory_id = values['directory_id']
    db.commit()
    db.refresh(fragment)
    return fragment


async def add_fragment_media_db(db, media_id: int, fragment_id: int) -> Fragment:
    fragment_media: FragmentMedia = FragmentMedia(media_id=media_id, fragment_id=fragment_id)
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    fragment_media.media = await get_media_by_id_db(db, media_id)
    fragment_media.fragment = fragment
    fragment.assets.append(fragment_media)
    db.commit()
    db.refresh(fragment)
    return fragment


async def delete_fragment_by_id_db(db: Session, fragment_id: int) -> None:
    """
    Deletes the Fragment with the given ID if (and only if) no other fragment
    has this fragment in its 'linked_fragments' relationship.

    Raises:
        ValueError: if the fragment doesn't exist or if other fragments still reference it.
    """
    # 1) Get the fragment from the DB
    fragment = db.query(Fragment).get(fragment_id)
    if fragment is None:
        raise ValueError(f"No fragment found with id={fragment_id}")

    # 2) Check if ANY other fragment references this fragment in its linked_fragments
    referencing_fragments = (
        db.query(Fragment)
        .filter(Fragment.id != fragment_id)  # exclude the fragment itself
        .filter(Fragment.linked_fragments.any(Fragment.id == fragment_id))
        .all()
    )

    if referencing_fragments:
        # At least one fragment references this fragment
        referencing_info = [(f.id, f.name) for f in referencing_fragments]
        msg = (
            f"Cannot delete fragment {fragment_id} because it is still linked by other fragments: {referencing_info}."
        )
        raise ValueError(msg)

    # 3) Otherwise, it's safe to delete
    db.delete(fragment)
    db.commit()
