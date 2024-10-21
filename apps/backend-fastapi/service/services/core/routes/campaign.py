from copy import deepcopy
from typing import List, Optional
from fastapi import HTTPException, status, UploadFile
import strawberry

from conf import service_settings
from crud.bucket import add_file, delete_file
from crud.campaign import create_campaign_db, get_campaign_by_id_db, get_campaigns_by_project_id_db, update_campaign_by_id_db
from crud.media import create_media_db, delete_media_by_id_db
from crud.project import get_project_by_id_db
from database import Session, Project, Campaign, Media
from .schemas import AuthPayload, CampaignGet, CampaignPost, RoleGet, CampaignPatch
from .middleware import Context
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


async def campaigns_in_project(info: strawberry.Info[Context], project_id: int, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[CampaignGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view campaigns')

    campaigns: List[Campaign] = await get_campaigns_by_project_id_db(db, project_id, active, deleted)
    out: List[CampaignGet] = []
    for cp in campaigns:
        out.append(CampaignGet(id=cp.id, name=cp.name, description=cp.description, deleted=cp.deleted,
                               active=cp.active,
                               logo=None if cp.logo is None else cp.logo.public_path, author=cp.author, project_id=cp.project_id))
    return out


async def campaign_by_id(info: strawberry.Info[Context], campaign_id: int) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view campaigns')

    return campaign


async def create_campaign_route(info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, cmp.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, cmp.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create campaigns')

    campaign: Campaign = await create_campaign_db(db, cmp.name, cmp.project_id, cmp.description,
                                                  cmp.active, cmp.deleted, user.user.id)

    return CampaignGet(id=campaign.id, name=campaign.name, description=campaign.description, deleted=campaign.deleted,
                       active=campaign.active,
                       logo=None if campaign.logo is None else campaign.logo.public_path, author=campaign.author,
                       project_id=campaign.project_id)


async def update_campaign_route(info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, cmp.id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to change campaign')

    campaign: Campaign = await update_campaign_by_id_db(db, values=cmp.__dict__)

    return CampaignGet(id=campaign.id, name=campaign.name, description=campaign.description, deleted=campaign.deleted,
                       active=campaign.active,
                       logo=None if campaign.logo is None else campaign.logo.public_path, author=campaign.author,
                       project_id=campaign.project_id)


async def add_campaign_logo_route(info: strawberry.Info[Context], file: UploadFile, campaign_id: int) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to change campaign')

    old_logo: Media | None = None
    if project.logo_id is not None:
        old_logo = deepcopy(campaign.logo)

    filePath = f'{service_settings.MEDIA_STORAGE_PATH}/projects/{project.id}-{campaign.id}-{file.filename}'

    add_file(filePath, file.file.read())

    public_url = f'{service_settings.STATIC_SERVER_URL}/projects/{project.id}-{campaign.id}-{file.filename}'
    ext: str = file.filename.split('.')[-1]

    media: Media = await create_media_db(db, "campaign_logo", filePath, ext, public_url)
    if media is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='Failed to create media file')
    project.logo_id = media.id
    db.commit()

    if old_logo is not None and old_logo.path != campaign.logo.path:
        delete_file(old_logo.path)
        await delete_media_by_id_db(db, old_logo.id)

    return CampaignGet(id=campaign.id, name=campaign.name, description=campaign.description, deleted=campaign.deleted,
                       active=campaign.active,
                       logo=None if campaign.logo is None else campaign.logo.public_path, author=campaign.author, project_id=campaign.project_id)
