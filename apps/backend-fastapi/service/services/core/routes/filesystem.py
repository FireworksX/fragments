from typing import List
from fastapi import HTTPException, status
import strawberry

from crud.filesystem import create_directory_db, get_directory_by_id_db, get_root_elements_db, \
    delete_directory_db, updatee_directory_db
from crud.project import get_project_by_id_db
from database import Session, Project, FilesystemDirectory
from .schemas.filesystem import ProjectDirectory, ProjectDirectoryGet, ProjectDirectoryPatch, ProjectData, FileSystemItemType
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


def directory_db_to_directory(
    item: FilesystemDirectory,
    project: ProjectGet,
    current_depth: int,
    max_depth: int
) -> ProjectDirectoryGet:
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
            directory_db_to_directory(
                child,
                project,
                current_depth=current_depth + 1,
                max_depth=max_depth
            )
            for child in item.nested_items
        ]
    # If we're at or beyond max_depth, nested_items will remain None (or you could make it [])

    return ProjectDirectoryGet(
        id=item.id,
        name=name,
        item_type=item_type,  # or item.item_type directly if your enum is handled differently
        nested_items=nested_items,
        data=data
    )


async def create_directory(info: strawberry.Info[Context], project_item: ProjectDirectory) -> ProjectDirectoryGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create items')

    project_item: FilesystemDirectory = await create_directory_db(db, project_item.parent_id, project_item.name,
                                                                  project_item.project_id)

    return directory_db_to_directory(project_item, await project_by_id(info, project_item.project_id))


async def get_directory(info: strawberry.Info[Context], directory_id: int) -> ProjectDirectoryGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project_item: FilesystemDirectory = await get_directory_by_id_db(db, directory_id)
    if project_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist")

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe items')

    return directory_db_to_directory(project_item, await project_by_id(info, project_item.project_id))


async def geet_roots_elements_route(info: strawberry.Info[Context], project_id: int) -> List[ProjectDirectoryGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe items')

    return [directory_db_to_directory(project_item, await project_by_id(info, project_item.project_id)) for
            project_item in
            await get_root_elements_db(db, project_id)]


# don't allow to remove item if it is referenced by another item (fragment in linked_fragments)
async def delete_directory_route(info: strawberry.Info[Context], directory_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory: FilesystemDirectory = await get_directory_by_id_db(db, directory_id)
    if directory is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Directory does not exist")

    project: Project = await get_project_by_id_db(db, directory.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, directory.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to delete items')
    try:
        await delete_directory_db(db, directory_id)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))


async def update_directory_route(info: strawberry.Info[Context], directory_out: ProjectDirectoryPatch) -> ProjectDirectoryGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory: FilesystemDirectory = await get_directory_by_id_db(db, directory_out.id)
    if directory is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist")

    project: Project = await get_project_by_id_db(db, directory.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, directory.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update items')

    directory_out: FilesystemDirectory = await updatee_directory_db(db, directory_out.__dict__)
    return directory_db_to_directory(directory_out, await project_by_id(info, directory.project_id))
