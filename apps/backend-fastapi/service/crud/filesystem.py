"""

class ProjectItem:
    project_id: int
    name: str
    type: FileSystemItemType
    items: Optional[List["ProjectItem"]]
"""
from typing import List, Optional
from database import Session, FilesystemProjectItem, Fragment
from services.core.routes.schemas.filesystem import FileSystemItemType


async def create_project_item_db(db: Session, parent_id: Optional[int], name: str, project_id: int,
                                 item_type: FileSystemItemType, data_id: Optional[int]) -> FilesystemProjectItem:
    fragment_id: int|None = None
    if item_type is FileSystemItemType.FRAGMENT:
        fragment_id = data_id
    item: FilesystemProjectItem = FilesystemProjectItem(project_id=project_id, name=name, item_type=int(item_type.value), fragment_id=fragment_id)
    if parent_id is not None:
        parent: FilesystemProjectItem = db.query(FilesystemProjectItem).filter(
            FilesystemProjectItem.id == parent_id).first()
        db.add(item)
        db.commit()
        item.parent_id = parent.id
        parent.nested_items.append(item)
    else:
        db.add(item)
    db.commit()
    db.refresh(item)
    return item


async def update_project_item_db(db: Session, values: dict, nested_items: Optional[List[int]]) -> FilesystemProjectItem:
    item_id = values.get("id")
    item: FilesystemProjectItem = db.query(FilesystemProjectItem).filter(FilesystemProjectItem.id == item_id).first()

    if nested_items is not None and len(nested_items) > 0:
        item.nested_items.clear()
        items: List[FilesystemProjectItem] = db.query(FilesystemProjectItem).filter(FilesystemProjectItem.id.in_(nested_items)).all()
        for it in items:
            item.nested_items.append(it)

    if values.get('name') is not None:
        if item.fragment is not None:
            item.fragment.name = values['name']
    if values.get('type') is not None:
        item.item_type = values['type']
    db.commit()
    db.refresh(item)
    return item


async def get_project_item_by_id(db: Session, item_id: int) -> Optional[FilesystemProjectItem]:
    return db.query(FilesystemProjectItem).filter(FilesystemProjectItem.id == item_id).first()


async def delete_project_item_by_id(session: Session, item_id: int) -> None:
    """
    Deletes the FilesystemProjectItem by ID if (and only if)
    its associated fragment is not linked by any other fragment.
    Otherwise, raise an exception and log which fragments are referencing it.
    """

    # 1) Fetch the item and its fragment
    item = session.query(FilesystemProjectItem).get(item_id)
    if item is None:
        raise ValueError(f"No FilesystemProjectItem found with id={item_id}")

    frag = item.data
    if frag is None:
        # If there's no fragment, just delete the item
        session.delete(item)
        session.commit()
        print(f"Deleted item {item_id} (no fragment present).")
        return

    # 2) Find fragments that have this fragment in their .linked_fragments
    referencing_fragments = (
        session.query(Fragment)
        .filter(Fragment.id != frag.id)  # exclude the same fragment if self-linked
        .filter(Fragment.linked_fragments.any(Fragment.id == frag.id))
        .all()
    )

    if referencing_fragments:
        # We have one or more fragments referencing `frag`
        # Log them (here we just print, but you can use Python's `logging` module)
        referencing_info = [
            (f.id, f.name) for f in referencing_fragments
        ]
        print(
            f"Cannot delete FilesystemProjectItem {item_id} because its fragment_id={frag.id} "
            f"is still linked by these other fragment(s): {referencing_info}"
        )
        # Raise an error to block deletion
        raise ValueError(
            f"Fragment {frag.id} is still linked by these other fragment(s): {referencing_info} "
            "Deletion of item is not allowed."
        )

    # 3) If no referencing fragments, safe to delete
    session.delete(item)
    session.commit()
    print(
        f"Deleted item {item_id}, fragment {frag.id} is not referenced by other fragments."
    )


async def get_project_items_by_project_id(db: Session, project_id: int) -> List[FilesystemProjectItem]:
    return db.query(FilesystemProjectItem).filter(
            FilesystemProjectItem.project_id == project_id,
            FilesystemProjectItem.parent_id.is_(None)
        ).all()
