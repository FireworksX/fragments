from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from database import FragmentMedia
from database.models import Fragment, Media, ProjectGoal
from services.core.routes.schemas.fragment import FragmentPatch, FragmentPost


async def create_fragment_db(db: Session, author_id: int, fragment: FragmentPost) -> Fragment:
    logger.info(f"Creating fragment {fragment.name} for project {fragment.project_id}")
    fragment_db: Fragment = Fragment(
        project_id=fragment.project_id,
        name=fragment.name,
        author_id=author_id,
        document=fragment.document,
        props=fragment.props,
        directory_id=fragment.directory_id,
        favorite=fragment.favorite if fragment.favorite is not None else False,
    )
    db.add(fragment_db)
    db.commit()
    db.refresh(fragment_db)

    if fragment.linked_goals is not None:
        logger.debug(f"Linking fragment {fragment.name} to goals {fragment.linked_goals}")
        goals: List[ProjectGoal] = (
            db.query(ProjectGoal).filter(ProjectGoal.id.in_(fragment.linked_goals)).all()
        )
        for goal in goals:
            fragment_db.linked_goals.append(goal)

    if fragment.linked_fragments is not None:
        logger.debug(f"Linking fragment {fragment.name} to fragments {fragment.linked_fragments}")
        fragments: List[Fragment] = (
            db.query(Fragment).filter(Fragment.id.in_(fragment.linked_fragments)).all()
        )
        for fr in fragments:
            fragment_db.linked_fragments.append(fr)

    db.commit()
    db.refresh(fragment_db)
    logger.debug(f"Created fragment {fragment_db.id}")
    return fragment_db


async def get_fragments_by_ids_db(
    db: Session,
    fragment_ids: Optional[List[int]] = None,
    project_id: Optional[int] = None,
    favorite: Optional[bool] = None,
) -> List[Fragment]:
    logger.info(f"Getting fragments with ids={fragment_ids} and project_id={project_id}")
    query = db.query(Fragment)

    if fragment_ids:
        query = query.filter(Fragment.id.in_(fragment_ids))

    if project_id:
        query = query.filter(Fragment.project_id == project_id)

    if favorite:
        query = query.filter(Fragment.favorite == favorite)

    fragments = query.all()
    logger.debug(f"Found {len(fragments)} fragments")
    return fragments


async def get_fragment_by_id_db(db: Session, fragment_id: int) -> Optional[Fragment]:
    logger.debug(f"Getting fragment with id={fragment_id}")
    return db.query(Fragment).filter(Fragment.id == fragment_id).first()


async def get_fragments_by_project_id_db(db: Session, project_id: int) -> List[Fragment]:
    logger.info(f"Getting all fragments for project_id={project_id}")
    fragments = db.query(Fragment).filter(Fragment.project_id == project_id).all()
    logger.debug(f"Found {len(fragments)} fragments")
    return fragments


async def update_fragment_by_id_db(
    db: Session, fragment_db: Fragment, fragment: FragmentPatch
) -> Fragment:
    logger.info(f"Updating fragment {fragment_db.id}")

    await _update_fragment_links(db, fragment_db, fragment)
    await _update_fragment_values(fragment_db, fragment)

    db.commit()
    db.refresh(fragment_db)
    logger.debug(f"Updated fragment {fragment_db.id}")
    return fragment_db


async def _update_fragment_links(
    db: Session, fragment_db: Fragment, fragment: FragmentPatch
) -> None:
    if fragment.linked_fragments is not None and len(fragment.linked_fragments) > 0:
        logger.debug(f"Updating linked fragments to {fragment.linked_fragments}")
        fragment_db.linked_fragments.clear()
        fragments: List[Fragment] = (
            db.query(Fragment).filter(Fragment.id.in_(fragment.linked_fragments)).all()
        )
        for fr in fragments:
            fragment_db.linked_fragments.append(fr)

    if fragment.linked_goals is not None and len(fragment.linked_goals) > 0:
        logger.debug(f"Updating linked goals to {fragment.linked_goals}")
        fragment_db.linked_goals.clear()
        goals: List[ProjectGoal] = (
            db.query(ProjectGoal).filter(ProjectGoal.id.in_(fragment.linked_goals)).all()
        )
        for goal in goals:
            fragment_db.linked_goals.append(goal)


async def _update_fragment_values(fragment_db: Fragment, fragment: FragmentPatch) -> None:
    if fragment.name is not None:
        logger.debug(f"Updating name to {fragment.name}")
        fragment_db.name = fragment.name
    if fragment.document is not None:
        logger.debug('Updating document')
        fragment_db.document = fragment.document
    if fragment.props is not None:
        logger.debug('Updating props')
        fragment_db.props = fragment.props
    if fragment.directory_id is not None:
        logger.debug(f"Updating directory_id to {fragment.directory_id}")
        fragment_db.directory_id = fragment.directory_id
    if fragment.favorite is not None:
        logger.debug(f"Updating favorite to {fragment.favorite}")
        fragment_db.favorite = fragment.favorite


async def add_fragment_media_db(db: Session, fragment_db: Fragment, media: Media) -> Fragment:
    logger.info(f"Adding media {media.id} to fragment {fragment_db.id}")
    fragment_media: FragmentMedia = FragmentMedia(media_id=media.id, fragment_id=fragment_db.id)
    fragment_media.media = media
    fragment_media.fragment = fragment_db
    fragment_db.assets.append(fragment_media)
    db.commit()
    db.refresh(fragment_db)
    logger.debug(f"Added media to fragment {fragment_db.id}")
    return fragment_db


async def delete_fragment_by_id_db(db: Session, fragment_db: Fragment) -> None:
    logger.info(f"Attempting to delete fragment {fragment_db.id}")

    referencing_fragments = (
        db.query(Fragment)
        .filter(Fragment.id != fragment_db.id)  # exclude the fragment itself
        .filter(Fragment.linked_fragments.any(Fragment.id == fragment_db.id))
        .all()
    )

    if referencing_fragments:
        referencing_info = [(f.id, f.name) for f in referencing_fragments]
        msg = f"Cannot delete fragment {fragment_db.id} because it is still linked by other fragments: {referencing_info}."
        logger.error(msg)
        raise ValueError(msg)

    db.delete(fragment_db)
    db.commit()
    logger.info(f"Deleted fragment {fragment_db.id}")
