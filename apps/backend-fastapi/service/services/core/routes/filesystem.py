from typing import List
from fastapi import HTTPException, status
import strawberry

from crud.filesystem import create_project_item_db, get_project_item_by_id, get_project_items_by_project_id, \
    delete_project_item_by_id, update_project_item_db
from crud.project import get_project_by_id_db
from database import Session, Project, FilesystemProjectItem
from .schemas.filesystem import ProjectItem, ProjectItemGet, ProjectItemPatch
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


def project_item_db_to_project_item(item: FilesystemProjectItem, project: ProjectGet) -> ProjectItemGet:
    return ProjectItemGet(id=item.id, name=item.name, item_type=item.item_type,
                          nested_items=item.nested_items, fragment=fragment_db_to_fragment(item.fragment, project))

# if it is a fragment, use name of fragment
async def create_project_item_route(info: strawberry.Info[Context], project_item: ProjectItem) -> ProjectItemGet:
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
                                                                       project_item.project_id, project_item.item_type, project_item.fragment_id)

    return project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id))


async def get_project_item_route(info: strawberry.Info[Context], project_item_id: int) -> ProjectItemGet:
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

    return project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id))


async def get_project_items_in_project_route(info: strawberry.Info[Context], project_id: int) -> List[ProjectItemGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe items')

    return [project_item_db_to_project_item(project_item, await project_by_id(info, project_item.project_id)) for project_item in
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

    await delete_project_item_by_id(db, item_id)

# if it is a fragment, chenge name of fragment
async def update_project_item_route(info: strawberry.Info[Context], item: ProjectItemPatch) -> ProjectItemGet:
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
    return project_item_db_to_project_item(item, await project_by_id(info, project_item.project_id))
