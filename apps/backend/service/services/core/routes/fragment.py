from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile
from starlette import status

from crud.fragment import (
    Fragment,
    add_fragment_media_db,
    create_fragment_db,
    delete_fragment_by_id_db,
    get_fragment_by_id_db,
    get_fragments_by_ids_db,
    get_fragments_by_project_id_db,
    update_fragment_by_id_db,
)
from crud.media import create_media_db, delete_media_by_id_db
from crud.project import get_project_by_id_db
from database import Media, Project, Session

from .middleware import Context
from .schemas.fragment import FragmentGet, FragmentMediaGet, FragmentPatch, FragmentPost
from .schemas.media import MediaGet, MediaType
from .schemas.user import AuthPayload, RoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def check_read_permissions(db: Session, user_id: int, project_id: int) -> None:
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user_id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view this data',
        )


def gather_all_linked_fragments(root_fragment: Fragment) -> list[Fragment]:
    """
    Returns a list of ALL fragments reachable via .linked_fragments from 'root_fragment',
    including 'root_fragment' itself if you prefer (or you can exclude it).
    Uses a visited set to avoid infinite loops on cycles.
    """
    visited_ids = set()
    result = []

    # You can do either a stack (DFS) or queue (BFS). Here is DFS:
    stack = [root_fragment]

    while stack:
        current = stack.pop()
        if current.id not in visited_ids:
            visited_ids.add(current.id)
            result.append(current)
            # Push each linked fragment for further exploration
            for linked in current.linked_fragments:
                stack.append(linked)

    return result


def fragment_db_to_fragment(fragment: Fragment) -> FragmentGet:
    """
    Returns a single FragmentGet, whose 'linked_fragments' is a flat list
    of *all* reachable fragments from 'fragment', avoiding cycles.
    """
    # Gather them all (including 'fragment' if desired)
    all_fragments = gather_all_linked_fragments(fragment)

    # Convert the 'root_fragment' to FragmentGet
    # We'll store all *other* fragments in its 'linked_fragments' field, for instance.
    root_fg = FragmentGet(
        id=fragment.id,
        directory_id=fragment.directory_id,
        name=fragment.name,
        author=user_db_to_user(fragment.author),
        document=fragment.document,
        props=fragment.props,
        assets=(
            []
            if not fragment.assets
            else [
                FragmentMediaGet(relation.media.id, relation.media.public_path)
                for relation in fragment.assets
            ]
        ),
        linked_fragments=[],  # We'll fill this below
    )

    # If you want a single list of all "other" fragments in linked_fragments (excluding root):
    # Or you can keep them all, depending on your preference
    other_fragments = [f for f in all_fragments if f.id != fragment.id]

    # Convert each to a FragmentGet with no further recursion
    root_fg.linked_fragments = [
        FragmentGet(
            id=f.id,
            directory_id=fragment.directory_id,
            name=f.name,
            author=f.author,
            document=f.document,
            props=f.props,
            assets=(
                []
                if not f.assets
                else [
                    FragmentMediaGet(relation.media.id, relation.media.public_path)
                    for relation in f.assets
                ]
            ),
            # no recursion on 'linked_fragments' here, because we already flattened them
            linked_fragments=[],
        )
        for f in other_fragments
    ]

    return root_fg


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.ADMIN


async def create_fragment_route(info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, fg.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, fg.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to add fragments'
        )

    fragment: Fragment = await create_fragment_db(
        db,
        fg.name,
        user.user.id,
        fg.project_id,
        fg.document,
        fg.props,
        fg.linked_fragments,
        fg.directory_id,
    )
    return fragment_db_to_fragment(fragment)


async def fragments_in_project(
    info: strawberry.Info[Context], project_id: int
) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    await check_read_permissions(db, user.user.id, project_id)

    fragments: List[Fragment] = await get_fragments_by_project_id_db(db, project_id)
    out: List[FragmentGet] = []
    for fg in fragments:
        out.append(fragment_db_to_fragment(fg))
    return out


async def fragments_by_ids(
    info: strawberry.Info[Context], fragment_ids: Optional[List[int]], project_id: Optional[int]
) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragments: List[Fragment] = await get_fragments_by_ids_db(db, fragment_ids, project_id)
    out: List[FragmentGet] = []
    for fragment in fragments:
        await check_read_permissions(db, user.user.id, fragment.project_id)
        out.append(fragment_db_to_fragment(fragment))
    return out


async def add_fragment_asset_route(
    info: strawberry.Info[Context], file: UploadFile, fragment_id: int, directory_id: int
) -> MediaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} does not exist',
        )
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view fragments',
        )

    media: Media = await create_media_db(db, file, directory_id)
    if media is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        )
    await add_fragment_media_db(db, media.id, fragment_id)
    return MediaGet(
        media_id=media.id, media_type=MediaType.FRAGMENT_ASSET, public_path=media.public_path
    )


async def delete_fragment_asset_route(
    info: strawberry.Info[Context], fragment_id: int, asset_id: int
) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} does not exist',
        )
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view fragments',
        )

    await delete_media_by_id_db(db, asset_id)
    return fragment_db_to_fragment(fragment)


async def update_fragment_route(info: strawberry.Info[Context], fg: FragmentPatch) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fg.id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f'Fragment with id {fg.id} does not exist'
        )
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to update fragments',
        )

    fragment: Fragment = await update_fragment_by_id_db(
        db, values=fg.__dict__, linked_fragments=fg.linked_fragments
    )
    return fragment_db_to_fragment(fragment)


async def delete_fragment_route(info: strawberry.Info[Context], fragment_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} does not exist',
        )
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete fragments',
        )
    try:
        await delete_fragment_by_id_db(db, fragment_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))


async def fragment_by_id(info: strawberry.Info[Context], fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} does not exist',
        )
    project_id: int = fragment.project_id
    await check_read_permissions(db, user.user.id, project_id)
    return fragment_db_to_fragment(fragment)


async def get_client_fragment(info: strawberry.Info[Context], fragment_id: int) -> FragmentGet:
    project: Project = await info.context.project()
    db: Session = info.context.session()

    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} does not exist',
        )
    if fragment.project_id != project.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Fragment with id {fragment_id} is not authorized to project {project.id}',
        )
    return fragment_db_to_fragment(fragment)
