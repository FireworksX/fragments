from copy import deepcopy
from typing import List, Dict, Any
from fastapi import HTTPException, status, UploadFile
import strawberry

from conf import service_settings
from crud.bucket import add_file, delete_file
from crud.campaign import get_campaign_by_id_db
from crud.media import create_media_db, delete_media_by_id_db
from .schemas import FragmentGet, AuthPayload, ProjectGet, ProjectPost, RoleGet, CampaignGet, ProjectPatch
from .middleware import Context
from crud.project import create_project_db, get_project_by_id_db, get_user_project_role, get_projects_by_user_id_db, \
    update_project_by_id_db, add_user_to_project_db, change_user_role_db
from crud.user import get_user_by_id_db
from database import Session, Media
from database.models import Project, User, ProjectMemberRole
from .utils import transform_project_members, get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


async def transform_project_campaigns(db: Session, project: Project) -> List[CampaignGet]:
    res: List[CampaignGet] = []
    for campaign_relation in project.campaigns:
        res.append(await get_campaign_by_id_db(db, campaign_relation.campaign.id))
    return res


async def projects(info: strawberry.Info[Context]) -> List[ProjectGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    prs: List[Project] = await get_projects_by_user_id_db(db, user.user.id)
    res: List[ProjectGet] = []
    for project in prs:
        res.append(await project_by_id(info, project.id))  # TODO issue of sqlalchemy
    return res


async def project_by_id(info: strawberry.Info[Context], project_id: int) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to obtain project')

    return ProjectGet(id=project.id, name=project.name, logo=None if project.logo is None else project.logo.public_path,
                      owner=project.owner,
                      members=transform_project_members(project), campaigns=await transform_project_campaigns(db, project))


async def create_project_route(info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await create_project_db(db, pr.name, user.user.id)

    return ProjectGet(id=project.id, name=project.name, logo=None if project.logo is None else project.logo.public_path,
                      owner=project.owner,
                      members=transform_project_members(project), campaigns= await transform_project_campaigns(db, project))


async def add_user_to_project(info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add users')

    user_to_add: User = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist")
    await add_user_to_project_db(db, user_id, project_id, role_to_add)


async def change_user_role(info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: RoleGet):
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to change roles')

    user_to_add: User = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist")

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    await change_user_role_db(db, user_id, project_id, int(role_to_add.value))


async def update_project_route(info: strawberry.Info[Context], pr: ProjectPatch) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, pr.id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add users')

    project: Project = await get_project_by_id_db(db, pr.id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    project: Project = await update_project_by_id_db(db, values=pr.__dict__)

    return ProjectGet(id=project.id, name=project.name, logo=None if project.logo is None else project.logo.public_path,
                      owner=project.owner,
                      members=transform_project_members(project), campaigns=await transform_project_campaigns(db, project))


async def add_project_logo_route(info: strawberry.Info[Context], file: UploadFile, project_id: int) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add users')

    old_logo: Media | None = None
    if project.logo_id is not None:
        old_logo = deepcopy(project.logo)

    filePath = f'{service_settings.MEDIA_STORAGE_PATH}/projects/{project.id}-{file.filename}'

    add_file(filePath, file.file.read())

    public_url = f'{service_settings.STATIC_SERVER_URL}/projects/{project.id}-{file.filename}'
    ext: str = file.filename.split('.')[-1]

    media: Media = await create_media_db(db, "logo", filePath, ext, public_url)
    if media is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='Failed to create media file')
    project.logo_id = media.id
    db.commit()

    if old_logo is not None and old_logo.path != project.logo.path:
        delete_file(old_logo.path)
        await delete_media_by_id_db(db, old_logo.id)

    return ProjectGet(id=project.id, name=project.name, logo=None if project.logo is None else project.logo.public_path,
                      owner=project.owner,
                      members=transform_project_members(project), campaigns=await transform_project_campaigns(db, project))
