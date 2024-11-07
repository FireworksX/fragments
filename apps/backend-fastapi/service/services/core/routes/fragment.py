import uuid
from typing import List
import strawberry
from fastapi import HTTPException, UploadFile
from starlette import status

from conf import service_settings
from crud.bucket import add_file, delete_file
from crud.media import create_media_db, delete_media_by_public_path_db
from crud.project import get_project_by_id_db
from .schemas import FragmentGet, AuthPayload, FragmentPost, ProjectGet, RoleGet, FragmentPatch, UserGet
from .middleware import Context
from crud.fragment import create_fragment_db, Fragment, get_fragments_by_project_id_db, get_fragment_by_id_db, \
    update_fragment_by_id_db, add_fragment_media
from database import Session, Project, Media
from .project import project_by_id, transform_project_campaigns
from .utils import get_user_role_in_project, transform_project_members


def fragment_db_to_fragment(fragment: Fragment, project: ProjectGet) -> FragmentGet:
    return FragmentGet(id=fragment.id, name=fragment.name, author=fragment.author, document=fragment.document,
                       props=fragment.props, project=project,
                       assets=[] if fragment.assets is None else [relation.media.public_path for relation in fragment.assets])


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

    fragment: Fragment = await create_fragment_db(db, fg.name, user.user.id, fg.project_id, fg.document, fg.props)
    return fragment_db_to_fragment(fragment, await project_by_id(info, fg.project_id))


async def fragments_in_project(info: strawberry.Info[Context], project_id: int) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')

    fragments: List[Fragment] = await get_fragments_by_project_id_db(db, project_id)
    out: List[FragmentGet] = []
    for fg in fragments:
        out.append(fragment_db_to_fragment(fg, await project_by_id(info, fg.project_id)))
    return out


async def fragment_by_id(info: strawberry.Info[Context], fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')

    return fragment_db_to_fragment(fragment, await project_by_id(info, project.id))


async def add_fragment_asset_route(info: strawberry.Info[Context], file: UploadFile, fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, fragment.project_id)
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
    print(filePath, public_url, media.id, fragment_id)
    fragment: Fragment = await add_fragment_media(db, media.id, fragment_id)
    return fragment_db_to_fragment(fragment, await project_by_id(info, project.id))



async def remove_fragment_asset_route(info: strawberry.Info[Context], fragment_id: int, public_path: str) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, fragment.project_id)
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
    return fragment_db_to_fragment(fragment, await project_by_id(info, project.id))



async def update_fragment_route(info: strawberry.Info[Context], fg: FragmentPatch) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fg.id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fg.id} does not exist')
    project: ProjectGet = await project_by_id(info, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Project with id {fragment.project_id} does not exist or you do not have permission to view it')
    permission: bool = await write_permission(db, user.user.id, fg.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update fragments')

    fragment: Fragment = await update_fragment_by_id_db(db, values=fg.__dict__)
    return fragment_db_to_fragment(fragment, await project_by_id(info, project.id))

