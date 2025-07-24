from typing import List, Tuple

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.filesystem import (
    create_directory_db,
    delete_directory_db,
    get_directory_by_id_db,
    update_directory_db,
)
from crud.project import get_project_by_id_db
from database import FilesystemDirectory, Fragment, Project, Session

from .fragment import fragment_db_to_fragment
from .middleware import Context
from .schemas.filesystem import ProjectDirectory, ProjectDirectoryGet, ProjectDirectoryPatch
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def gather_all_subdirectories(directory: FilesystemDirectory) -> List[FilesystemDirectory]:
    logger.debug(f"Gathering all subdirectories for directory {directory.id}")
    result = []
    for subdir in directory.subdirectories:
        result.append(subdir)
        result.extend(gather_all_subdirectories(subdir))
    logger.debug(f"Found {len(result)} subdirectories")
    return result


def directory_db_to_directory_flat(
    directory: FilesystemDirectory,
) -> List[ProjectDirectoryGet]:
    logger.debug(f"Converting directory {directory.id} to flat structure")
    directories = []
    # Convert the root directory:
    root_directory = ProjectDirectoryGet(
        id=directory.id,
        name=directory.name,
        parent_id=directory.parent_id,
        project_id=directory.project_id,
        fragments=[fragment_db_to_fragment(frag) for frag in directory.fragments],
        has_subdirectories=bool(directory.subdirectories),
        has_fragments=bool(directory.fragments),
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
            has_subdirectories=bool(subdir.subdirectories),
            has_fragments=bool(subdir.fragments),
        )
        directories.append(subdir_get)

    logger.debug(f"Converted {len(directories)} directories")
    return directories


async def create_directory_route(
    info: strawberry.Info[Context], directory: ProjectDirectory
) -> list[ProjectDirectoryGet]:
    logger.info(f"Creating new directory {directory.name} in project {directory.project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, directory.project_id)
    if project is None:
        logger.error(f"Project {directory.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, directory.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create directory in project {directory.project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create directories',
        )

    directory_db: FilesystemDirectory = await create_directory_db(
        db, directory.parent_id, directory.name, directory.project_id
    )
    logger.info(f"Created directory {directory_db.id}")

    return directory_db_to_directory_flat(directory_db)


async def get_directory(
    info: strawberry.Info[Context], directory_id: int
) -> list[ProjectDirectoryGet]:
    logger.info(f"Getting directory {directory_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory_db: FilesystemDirectory = await get_directory_by_id_db(db, directory_id)
    if directory_db is None:
        logger.error(f"Directory {directory_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Directory does not exist'
        )

    project: Project = await get_project_by_id_db(db, directory_db.project_id)
    if project is None:
        logger.error(f"Project {directory_db.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, directory_db.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view directory {directory_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to observe directories',
        )

    logger.info(f"Successfully retrieved directory {directory_id}")
    return directory_db_to_directory_flat(directory_db)


# don't allow to remove item if it is referenced by another item (fragment in linked_fragments)
async def delete_directory_route(info: strawberry.Info[Context], directory_id: int) -> None:
    logger.info(f"Deleting directory {directory_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory: FilesystemDirectory = await get_directory_by_id_db(db, directory_id)
    if directory is None:
        logger.error(f"Directory {directory_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Directory does not exist'
        )

    project: Project = await get_project_by_id_db(db, directory.project_id)
    if project is None:
        logger.error(f"Project {directory.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, directory.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete directory {directory_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete directories',
        )
    if directory_id == project.root_directory_id:
        logger.warning(f"Attempted to delete root directory {directory_id}")
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE, detail='Could not delete root directory'
        )

    try:
        await delete_directory_db(db, directory_id)
        logger.info(f"Successfully deleted directory {directory_id}")
    except ValueError as e:
        logger.error(f"Failed to delete directory {directory_id}: {str(e)}")
        raise HTTPException(status_code=409, detail=str(e))


async def update_directory_route(
    info: strawberry.Info[Context], directory: ProjectDirectoryPatch
) -> list[ProjectDirectoryGet]:
    logger.info(f"Updating directory {directory.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    directory_db: FilesystemDirectory = await get_directory_by_id_db(db, directory.id)
    if directory_db is None:
        logger.error(f"Directory {directory.id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Directory does not exist'
        )

    project: Project = await get_project_by_id_db(db, directory_db.project_id)
    if project is None:
        logger.error(f"Project {directory_db.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, directory_db.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update directory {directory.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to update directories',
        )

    directory_db: FilesystemDirectory = await update_directory_db(db, directory.__dict__)
    logger.info(f"Successfully updated directory {directory.id}")
    return directory_db_to_directory_flat(directory_db)
