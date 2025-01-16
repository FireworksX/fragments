from typing import List
from fastapi import HTTPException, status
import strawberry

from crud.filesystem import create_project_item_db, get_project_item_by_id, get_project_items_by_project_id, \
    delete_project_item_by_id, update_project_item_db
from crud.project import get_project_by_id_db
from database import Session, Project, FilesystemProjectItem
from .schemas.filesystem import ProjectItem, ProjectItemGet, ProjectItemPatch, ProjectData, FileSystemItemType
from .schemas.project import ProjectGet
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from .utils import get_user_role_in_project

from .fragment import fragment_db_to_fragment
from .project import project_by_id


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def project_item_db_to_project_item(
    item: FilesystemProjectItem,
    project: ProjectGet,
    current_depth: int,
    max_depth: int
) -> ProjectItemGet:
    """
    Converts a FilesystemProjectItem (from the DB) to a ProjectItemGet (for GraphQL).
    Recursively processes 'nested_items' until reaching 'max_depth'.
    """

    item_type = FileSystemItemType(item.item_type)

    # Potentially resolve a 'data' or 'fragment' field if needed
    data = None
    if item_type == FileSystemItemType.FRAGMENT and item.fragment:
        data = fragment_db_to_fragment(item.fragment, project)

    # Example: use the item's own name or the fragment's name, if present
    name = item.name if not item.fragment else item.fragment.name

    # Decide whether to recurse into children
    nested_items = None
    # Only recurse if we haven't hit the depth limit
    if item.nested_items and current_depth < max_depth:
        nested_items = [
            project_item_db_to_project_item(
                child,
                project,
                current_depth=current_depth + 1,
                max_depth=max_depth
            )
            for child in item.nested_items
        ]
    # If we're at or beyond max_depth, nested_items will remain None (or you could make it [])

    return ProjectItemGet(
        id=item.id,
        name=name,
        item_type=item_type,  # or item.item_type directly if your enum is handled differently
        nested_items=nested_items,
        data=data
    )


async def create_project_item_route(info: strawberry.Info[Context], project_item: ProjectItem, max_depth: int) -> ProjectItemGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create items')

    project_item: FilesystemProjectItem = await create_project_item_db(db, project_item.parent_id, project_item.name,
                                                                       project_item.project_id, project_item.item_type,
                                                                       project_item.data_id)

    return project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id), 0, max_depth)


async def get_project_item_route(info: strawberry.Info[Context], project_item_id: int, max_depth: int) -> ProjectItemGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project_item: FilesystemProjectItem = await get_project_item_by_id(db, project_item_id)
    if project_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist")

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe items')

    return project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id), 0, max_depth)


async def get_project_items_in_project_route(info: strawberry.Info[Context], project_id: int, max_depth: int) -> List[ProjectItemGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe items')

    return [project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id), 0, max_depth) for
            project_item in
            await get_project_items_by_project_id(db, project_id)]


# don't allow to remove item if it is referenced by another item (fragment in linked_fragments)
async def delete_project_item_route(info: strawberry.Info[Context], item_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project_item: FilesystemProjectItem = await get_project_item_by_id(db, item_id)
    if project_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist")

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to delete items')
    try:
        await delete_project_item_by_id(db, item_id)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))


async def update_project_item_route(info: strawberry.Info[Context], item: ProjectItemPatch, max_depth: int) -> ProjectItemGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project_item: FilesystemProjectItem = await get_project_item_by_id(db, item.id)
    if project_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist")

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update items')

    item: FilesystemProjectItem = await update_project_item_db(db, item.__dict__, item.nested_items)
    return project_item_db_to_project_item(item, await project_by_id(info, project_item.project_id), 0, max_depth)
