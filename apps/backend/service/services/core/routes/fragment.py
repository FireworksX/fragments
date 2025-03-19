import uuid
from typing import List, Optional
import strawberry
from fastapi import HTTPException, UploadFile
from starlette import status

from conf import service_settings
from crud.bucket import add_file, delete_file
from crud.media import create_media_db, delete_media_by_public_path_db
from crud.project import get_project_by_id_db
from .schemas.fragment import FragmentPost, FragmentPatch, FragmentGet
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from crud.fragment import create_fragment_db, Fragment, get_fragments_by_project_id_db, \
    update_fragment_by_id_db, add_fragment_media, delete_fragment_by_id_db, get_fragments_by_ids_db, \
    get_fragment_by_id_db
from database import Session, Project, Media
from .utils import get_user_role_in_project


async def check_read_permissions(db: Session, user_id: int, project_id: int) -> None:
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user_id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view this data')


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
        author=fragment.author,
        document=fragment.document,
        props=fragment.props,
        assets=[] if not fragment.assets else [
            relation.media.public_path for relation in fragment.assets
        ],
        linked_fragments=[]  # We'll fill this below
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
            assets=[] if not f.assets else [r.media.public_path for r in f.assets],
            # no recursion on 'linked_fragments' here, because we already flattened them
            linked_fragments=[]
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fg.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add fragments')

    fragment: Fragment = await create_fragment_db(db, fg.name, user.user.id, fg.project_id, fg.document,
                                                  fg.props, fg.linked_fragments, fg.directory_id)
    return fragment_db_to_fragment(fragment)


async def fragments_in_project(info: strawberry.Info[Context], project_id: int) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    await check_read_permissions(db, user.user.id, project_id)

    fragments: List[Fragment] = await get_fragments_by_project_id_db(db, project_id)
    out: List[FragmentGet] = []
    for fg in fragments:
        out.append(fragment_db_to_fragment(fg))
    return out


async def fragments_by_ids(info: strawberry.Info[Context], fragment_ids: List[int]) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragments: List[Fragment] = await get_fragments_by_ids_db(db, fragment_ids)
    if len(fragments) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragments with ids {fragment_ids} does not exist')

    out: List[FragmentGet] = []
    for fragment in fragments:
        await check_read_permissions(db, user.user.id, fragment.project_id)
        out.append(fragment_db_to_fragment(fragment))
    return out


async def add_fragment_asset_route(info: strawberry.Info[Context], file: UploadFile, fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')

    unique_id = uuid.uuid4()
    filePath = f'{service_settings.MEDIA_STORAGE_PATH}/fragments/{project.id}-{fragment.id}-{unique_id}-{file.filename}'

    add_file(filePath, file.file.read())

    public_url = f'{service_settings.STATIC_SERVER_URL}/fragments/{project.id}-{fragment.id}-{unique_id}-{file.filename}'
    ext: str = file.filename.split('.')[-1]

    media: Media = await create_media_db(db, "fragment_asset", filePath, ext, public_url)
    if media is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='Failed to create media file')
    fragment: Fragment = await add_fragment_media(db, media.id, fragment_id)
    return fragment_db_to_fragment(fragment)


async def remove_fragment_asset_route(info: strawberry.Info[Context], fragment_id: int,
                                      public_path: str) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')
    try:
        await delete_media_by_public_path_db(db, fragment_id, public_path)
        filePath = f'{service_settings.MEDIA_STORAGE_PATH}/fragments/{public_path.split(f'{service_settings.STATIC_SERVER_URL}/fragments/')[1]}'
        delete_file(filePath)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Media not found')
    return fragment_db_to_fragment(fragment)


async def update_fragment_route(info: strawberry.Info[Context], fg: FragmentPatch) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fg.id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fg.id} does not exist')
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update fragments')

    fragment: Fragment = await update_fragment_by_id_db(db, values=fg.__dict__,
                                                        linked_fragments=fg.linked_fragments)
    return fragment_db_to_fragment(fragment)


async def delete_fragment_route(info: strawberry.Info[Context], fragment_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')
    project_id: int = fragment.project_id
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to delete fragments')
    try:
        await delete_fragment_by_id_db(db, fragment_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))


async def fragment_by_id(info: strawberry.Info[Context], fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')
    project_id: int = fragment.project_id
    await check_read_permissions(db, user.user.id, project_id)
    return fragment_db_to_fragment(fragment)
