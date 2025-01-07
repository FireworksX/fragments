from copy import deepcopy
from typing import List, Optional
from fastapi import HTTPException, status, UploadFile
import strawberry

from conf import service_settings
from crud.bucket import add_file, delete_file
from crud.campaign import create_campaign_db, get_campaign_by_id_db, get_campaigns_by_project_id_db, \
    update_campaign_by_id_db, get_campaign_by_name_and_project_id_db
from crud.filesystem import create_project_item_db, get_project_item_by_id, get_project_items_by_project_id
from crud.media import create_media_db, delete_media_by_id_db
from crud.project import get_project_by_id_db
from database import Session, Project, Campaign, Media, FilesystemProjectItem
from .schemas.campaign import CampaignGet, CampaignPost, CampaignPatch
from .schemas.filesystem import ProjectItem, ProjectItemGet
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def project_item_db_to_project_item(item: FilesystemProjectItem) -> ProjectItemGet:
    return ProjectItemGet(id=item.id, project_id=item.project_id, name=item.name, item_type=item.item_type,
                          items=item.nested_items)


async def create_project_item_route(info: strawberry.Info[Context], project_item: ProjectItem) -> ProjectItemGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_item.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_item.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create campaigns')

    project_item: FilesystemProjectItem = await create_project_item_db(db, project_item.parent_id, project_item.name,
                                                                       project_item.project_id, project_item.type)

    return project_item_db_to_project_item(project_item)


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
                            detail=f'User is not allowed to create campaigns')

    return project_item_db_to_project_item(project_item)


async def get_project_items_in_project_route(info: strawberry.Info[Context], project_id: int) -> List[ProjectItemGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create campaigns')

    return [project_item_db_to_project_item(project_item) for project_item in
            await get_project_items_by_project_id(db, project_id)]
