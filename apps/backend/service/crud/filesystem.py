from typing import List, Optional, Tuple, Union

from database import FilesystemDirectory, Fragment, Session
from conf.settings import logger


async def create_directory_db(
    db: Session, parent_id: Optional[int], name: str, project_id: int
) -> FilesystemDirectory:
    logger.info(f"Creating directory {name} with parent_id={parent_id} in project {project_id}")
    root_dir = FilesystemDirectory(parent_id=parent_id, project_id=project_id, name=name)
    db.add(root_dir)
    db.commit()
    db.refresh(root_dir)
    logger.debug(f"Created directory {root_dir.id}")
    return root_dir


async def get_directory_by_id_db(db: Session, directory_id: int) -> Optional[FilesystemDirectory]:
    logger.debug(f"Getting directory with id={directory_id}")
    return db.query(FilesystemDirectory).filter(FilesystemDirectory.id == directory_id).first()


async def update_directory_db(db: Session, values: dict) -> FilesystemDirectory:
    directory_id = values.get('id')
    logger.info(f"Updating directory {directory_id}")
    directory: FilesystemDirectory = (
        db.query(FilesystemDirectory).filter(FilesystemDirectory.id == directory_id).first()
    )

    if values.get('name') is not None:
        logger.debug(f"Updating name to {values['name']}")
        directory.name = values['name']
    if values.get('parent_id') is not None:
        logger.debug(f"Updating parent_id to {values['parent_id']}")
        directory.parent_id = values['parent_id']
    db.commit()
    db.refresh(directory)
    logger.debug(f"Updated directory {directory.id}")
    return directory


async def delete_directory_db(db: Session, directory_id: int) -> None:
    logger.info(f"Attempting to delete directory {directory_id}")
    # 1) Fetch the directory
    directory: FilesystemDirectory = db.query(FilesystemDirectory).get(directory_id)
    if directory is None:
        logger.error(f"No directory found with id={directory_id}")
        raise ValueError(f"No directory found with id={directory_id}")

    # Gather all fragments in this directory
    fragments_in_dir: List[Fragment] = directory.fragments
    if not fragments_in_dir:
        # If the directory has no fragments, we can delete it immediately
        db.delete(directory)
        db.commit()
        logger.debug(f"Deleted directory {directory_id} (no fragments present).")
        return

    # 2) Check whether any of these fragments are still "linked" by other fragments
    #    We'll collect all fragment IDs from this directory:
    frag_ids_in_this_dir = [frag.id for frag in fragments_in_dir]
    logger.debug(f"Found {len(frag_ids_in_this_dir)} fragments in directory")

    # Then query for any fragment *outside* of those IDs whose linked_fragments
    # include any from 'frag_ids_in_this_dir'.
    referencing_fragments = (
        db.query(Fragment)
        # Exclude the same fragments themselves (to skip self-linking or the ones in this dir)
        .filter(~Fragment.id.in_(frag_ids_in_this_dir))
        # Check if they link to ANY fragment in this directory:
        .filter(Fragment.linked_fragments.any(Fragment.id.in_(frag_ids_in_this_dir))).all()
    )

    if referencing_fragments:
        # We have one or more fragments referencing at least one fragment in this directory
        referencing_info = [(f.id, f.name) for f in referencing_fragments]
        msg = (
            f"Cannot delete directory {directory_id}, because one or more fragments "
            f"in it are still linked by other fragments: {referencing_info}."
        )
        logger.error(msg)
        raise ValueError(msg)

    # 3) If no referencing fragments, it's safe to delete
    db.delete(directory)
    db.commit()
    logger.info(f"Deleted directory {directory_id}. No fragments in it were referenced by others.")
