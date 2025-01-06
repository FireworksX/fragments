from crud.media import get_media_by_id_db
from database import FragmentMedia, LinkedFragment
from database.models import Project, FragmentVersion, Fragment
from sqlalchemy.orm import Session
from typing import Optional, List
import uuid
from sqlalchemy import desc, and_, func


def calculate_hash() -> str:
    return str(uuid.uuid4())

async def create_fragment_db(db: Session, name: str, author_id: int, project_id: int, document: str,
                             props: str, linked_fragments: List[int]) -> FragmentVersion:
    fragments: List[Fragment] = db.query(Fragment).filter(Fragment.id.in_(linked_fragments)).all()
    fragment: Fragment = Fragment(project_id=project_id)
    db.add(fragment)
    db.commit()
    fragment_version: FragmentVersion = FragmentVersion(fragment_id=fragment.id, name=name, author_id=author_id, document=document, props=props, version_id=calculate_hash())
    db.add(fragment_version)
    for fr in fragments:
        linked_fragment: LinkedFragment = LinkedFragment(linked_fragment=fr, fragment_version=fragment_version)
        fragment_version.linked_fragments.append(linked_fragment)
    db.commit()
    db.refresh(fragment_version)
    fragment.versions.append(fragment_version)
    db.commit()
    return fragment_version


async def get_fragment_by_id_db(db: Session, fragment_id: int, version_id: Optional[str] = None) -> Optional[FragmentVersion]:
    if version_id is None:
        return (
            db.query(FragmentVersion)
            .filter(FragmentVersion.fragment_id == fragment_id)
            .order_by(desc(FragmentVersion.created_at))
            .first()
        )
    return db.query(FragmentVersion).filter(FragmentVersion.fragment_id == fragment_id).filter(FragmentVersion.version_id == version_id).first()

async def get_project_id_by_fragment_id(db: Session, fragment_id: int) -> Optional[int]:
    return db.query(Fragment).filter(Fragment.id == fragment_id).first().project_id

async def get_fragments_by_project_id_db(db: Session, project_id: int) -> List[FragmentVersion]:
    """
        Returns only the most recent FragmentVersion for each Fragment
        that belongs to the specified project_id.
        """
    # Subquery: group by fragment_id, find max created_at
    latest_version_subq = (
        db.query(
            FragmentVersion.fragment_id,
            func.max(FragmentVersion.created_at).label("max_created_at")
        )
        .group_by(FragmentVersion.fragment_id)
        .subquery()
    )

    # Main query:
    #  1) Join to Fragment so we can filter by project_id
    #  2) Join to subquery on (fragment_id, created_at) to get only the newest version
    #  3) Select only the FragmentVersion object
    query = (
        db.query(FragmentVersion)
        .join(Fragment, Fragment.id == FragmentVersion.fragment_id)
        .join(
            latest_version_subq,
            and_(
                FragmentVersion.fragment_id == latest_version_subq.c.fragment_id,
                FragmentVersion.created_at == latest_version_subq.c.max_created_at
            )
        )
        .filter(Fragment.project_id == project_id)
    )

    # Returns a list of FragmentVersion objects (the latest for each fragment)
    return query.all()


async def update_fragment_by_id_db(db: Session, values: dict, linked_fragments: List[int]) -> FragmentVersion:
    fragment_id: int = values['id']

    latest_version = (
        db.query(FragmentVersion)
        .filter(FragmentVersion.fragment_id == fragment_id)
        .order_by(desc(FragmentVersion.created_at))
        .first()
    )
    fragments: List[Fragment] = db.query(Fragment).filter(Fragment.id.in_(linked_fragments)).all()
    new_fragment_version: FragmentVersion = FragmentVersion(fragment_id=fragment_id, name=latest_version.name,
                                                            author_id=latest_version.author_id,
                                                            document=latest_version.document,
                                                            props=latest_version.props,
                                                            version_id=calculate_hash())
    new_fragment_version.linked_fragments.clear()
    for fr in fragments:
        linked_fragment: LinkedFragment = LinkedFragment(linked_fragment=fr, fragment_version=new_fragment_version)
        new_fragment_version.linked_fragments.append(linked_fragment)
    db.commit()
    latest_version.upgrade_version = new_fragment_version
    db.commit()

    if values.get('name') is not None:
        new_fragment_version.name = values['name']
    if values.get('document') is not None:
        new_fragment_version.document = values['document']
    if values.get('props') is not None:
        new_fragment_version.props = values['props']
    db.commit()
    db.refresh(new_fragment_version)
    return new_fragment_version


async def add_fragment_media(db, media_id: int, fragment_id: int, version_hash: Optional[str] = None) -> FragmentVersion:
    fragment_media: FragmentMedia = FragmentMedia(media_id=media_id, fragment_id=fragment_id)
    fragment: FragmentVersion = await get_fragment_by_id_db(db, fragment_id, version_hash)
    fragment_media.media = await get_media_by_id_db(db, media_id)
    fragment_media.fragment = fragment
    fragment.assets.append(fragment_media)
    db.commit()
    db.refresh(fragment)
    return fragment
