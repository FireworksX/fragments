from typing import List, Tuple
from fastapi import HTTPException, status
import strawberry

from crud.filesystem import create_directory_db, get_directory_by_id_db, \
    delete_directory_db, update_directory_db
from crud.project import get_project_by_id_db
from database import Session, Project, FilesystemDirectory, Fragment
from .schemas.filesystem import ProjectDirectory, ProjectDirectoryGet, ProjectDirectoryPatch
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from .utils import get_user_role_in_project

from .fragment import fragment_db_to_fragment


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def gather_all_subdirectories(directory: FilesystemDirectory) -> List[FilesystemDirectory]:
    result = []
    for subdir in directory.subdirectories:
        result.append(subdir)
        result.extend(gather_all_subdirectories(subdir))
    return result


def directory_db_to_directory_flat(
        directory: FilesystemDirectory,
) -> List[ProjectDirectoryGet]:
    directories = []
    # Convert the root directory:
    root_directory = ProjectDirectoryGet(
        id=directory.id,
        name=directory.name,
        parent_id=directory.parent_id,
        project_id=directory.project_id,
        fragments=[fragment_db_to_fragment(frag) for frag in directory.fragments],
        directories=[],  # will be filled with all subdirectories (flat)
        has_subdirectories=bool(directory.subdirectories),
        has_fragments=bool(directory.fragments)
    )
    directories.append(root_directory)

    # Gather a flat list of all recursive subdirectories
    flat_dirs = gather_all_subdirectories(directory)

    # Convert each subdirectory individually (each gets only its immediate fragments)
    for subdir in flat_dirs:
        subdir_get = ProjectDirectoryGet(
            id=subdir.id,
            name=subdir.name,
            parent_id=subdir.parent_id,
            project_id=subdir.project_id,
            fragments=[fragment_db_to_fragment(frag) for frag in subdir.fragments],
            directories=[],  # We flatten, so do not nest further
            has_subdirectories=bool(subdir.subdirectories),
            has_fragments=bool(subdir.fragments)
        )
        directories.append(subdir_get)

    return directories


async def create_directory_route(info: strawberry.Info[Context], directory: ProjectDirectory) -> list[
    ProjectDirectoryGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, directory.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, directory.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create directories')

    directory_db: FilesystemDirectory = await create_directory_db(db, directory.parent_id, directory.name,
                                                                  directory.project_id)

    return directory_db_to_directory_flat(directory_db)


async def get_directory(info: strawberry.Info[Context], directory_id: int) -> list[ProjectDirectoryGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory_db: FilesystemDirectory = await get_directory_by_id_db(db, directory_id)
    if directory_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Directory does not exist")

    project: Project = await get_project_by_id_db(db, directory_db.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, directory_db.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to observe directories')

    return directory_db_to_directory_flat(directory_db)


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
                            detail=f'User is not allowed to delete directories')
    if directory_id == project.root_directory_id:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Could not delete root directory")

    try:
        await delete_directory_db(db, directory_id)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))


async def update_directory_route(info: strawberry.Info[Context],
                                 directory: ProjectDirectoryPatch) -> list[ProjectDirectoryGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory_db: FilesystemDirectory = await get_directory_by_id_db(db, directory.id)
    if directory_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Directory does not exist")

    project: Project = await get_project_by_id_db(db, directory_db.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, directory_db.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update directories')

    directory_db: FilesystemDirectory = await update_directory_db(db, directory.__dict__)
    return directory_db_to_directory_flat(directory_db)
