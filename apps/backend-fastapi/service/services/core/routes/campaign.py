from typing import List, Optional
from fastapi import HTTPException, status
import strawberry

from crud.campaign import create_campaign_db, get_campaign_by_id_db, get_campaigns_by_project_id_db, update_campaign_by_id_db
from crud.project import get_project_by_id_db
from database import Session, Project, Campaign
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
                               logo_id=cp.logo_id, author=cp.author, project_id=cp.project_id))
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

    campaign: Campaign = await create_campaign_db(db, cmp.name, cmp.project_id, cmp.description, cmp.logo_id,
                                                  cmp.active, cmp.deleted, user.user.id)

    return CampaignGet(id=campaign.id, name=campaign.name, description=campaign.description, deleted=campaign.deleted,
                       active=campaign.active,
                       logo_id=campaign.logo_id, author=campaign.author, project_id=campaign.project_id)


async def update_campaign_route(info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, cmp.id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, cmp.id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to change campaign')

    campaign: Campaign = await update_campaign_by_id_db(db, values=cmp.__dict__)

    return CampaignGet(id=campaign.id, name=campaign.name, description=campaign.description, deleted=campaign.deleted,
                       active=campaign.active,
                       logo_id=campaign.logo_id, author=campaign.author, project_id=campaign.project_id)
