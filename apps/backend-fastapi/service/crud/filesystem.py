"""

class ProjectItem:
    project_id: int
    name: str
    type: FileSystemItemType
    items: Optional[List["ProjectItem"]]
"""
from typing import List, Optional

from fastapi import HTTPException

from database import Session, FilesystemProjectItem
from services.core.routes.schemas.filesystem import FileSystemItemType, ProjectItem


async def create_project_item_db(db: Session, parent_id: Optional[int], name: str, project_id: int,
                                 item_type: FileSystemItemType) -> FilesystemProjectItem:
    item: FilesystemProjectItem = FilesystemProjectItem(project_id=project_id, name=name, item_type=int(item_type.value))
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


async def update_project_item_db(db: Session, values: dict) -> FilesystemProjectItem:
    item_id = values.get("id")
    item: FilesystemProjectItem = db.query(FilesystemProjectItem).filter(FilesystemProjectItem.id == item_id).first()

    if values.get('name') is not None:
        item.name = values['name']
    if values.get('type') is not None:
        item.item_type = values['type']
    db.commit()
    db.refresh(item)
    return item


async def get_project_item_by_id(db: Session, item_id: int) -> Optional[FilesystemProjectItem]:
    return db.query(FilesystemProjectItem).filter(FilesystemProjectItem.id == item_id).first()


async def delete_project_item_by_id(db: Session, item_id: int) -> bool:
    rows_deleted = (
        db.query(FilesystemProjectItem)
        .filter(FilesystemProjectItem.id == item_id)
        .delete()
    )
    db.commit()
    return rows_deleted > 0


async def get_project_items_by_project_id(db: Session, project_id: int) -> List[FilesystemProjectItem]:
    return db.query(FilesystemProjectItem).filter(
            FilesystemProjectItem.project_id == project_id,
            FilesystemProjectItem.parent_id.is_(None)
        ).all()
