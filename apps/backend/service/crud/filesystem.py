from typing import List, Optional, Union, Tuple
from database import Session, FilesystemDirectory, Fragment


async def create_directory_db(db: Session, parent_id: Optional[int], name: str, project_id: int) -> FilesystemDirectory:
    root_dir = FilesystemDirectory(parent_id=parent_id, project_id=project_id, name=name)
    db.add(root_dir)
    db.commit()
    db.refresh(root_dir)
    return root_dir


async def get_directory_by_id_db(db: Session, directory_id: int) -> Optional[FilesystemDirectory]:
    return db.query(FilesystemDirectory).filter(FilesystemDirectory.id == directory_id).first()


async def update_directory_db(db: Session, values: dict) -> FilesystemDirectory:
    directory_id = values.get("id")
    directory: FilesystemDirectory = db.query(FilesystemDirectory).filter(
        FilesystemDirectory.id == directory_id).first()

    if values.get('name') is not None:
        directory.name = values['name']
    if values.get('parent_id') is not None:
        directory.parent_id = values['parent_id']
    db.commit()
    db.refresh(directory)
    return directory


async def delete_directory_db(db: Session, directory_id: int) -> None:
    # 1) Fetch the directory
    directory: FilesystemDirectory = db.query(FilesystemDirectory).get(directory_id)
    if directory is None:
        raise ValueError(f"No directory found with id={directory_id}")

    # Gather all fragments in this directory
    fragments_in_dir: List[Fragment] = directory.fragments
    if not fragments_in_dir:
        # If the directory has no fragments, we can delete it immediately
        db.delete(directory)
        db.commit()
        print(f"Deleted directory {directory_id} (no fragments present).")
        return

    # 2) Check whether any of these fragments are still "linked" by other fragments
    #    We'll collect all fragment IDs from this directory:
    frag_ids_in_this_dir = [frag.id for frag in fragments_in_dir]

    # Then query for any fragment *outside* of those IDs whose linked_fragments
    # include any from 'frag_ids_in_this_dir'.
    referencing_fragments = (
        db.query(Fragment)
        # Exclude the same fragments themselves (to skip self-linking or the ones in this dir)
        .filter(~Fragment.id.in_(frag_ids_in_this_dir))
        # Check if they link to ANY fragment in this directory:
        .filter(Fragment.linked_fragments.any(Fragment.id.in_(frag_ids_in_this_dir)))
        .all()
    )

    if referencing_fragments:
        # We have one or more fragments referencing at least one fragment in this directory
        referencing_info = [(f.id, f.name) for f in referencing_fragments]
        msg = (
            f"Cannot delete directory {directory_id}, because one or more fragments "
            f"in it are still linked by other fragments: {referencing_info}."
        )
        print(msg)
        raise ValueError(msg)

    # 3) If no referencing fragments, it's safe to delete
    db.delete(directory)
    db.commit()
    print(f"Deleted directory {directory_id}. No fragments in it were referenced by others.")

