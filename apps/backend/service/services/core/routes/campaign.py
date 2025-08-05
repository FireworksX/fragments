from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile, status
from thefuzz import process

from conf.settings import logger
from crud.area import get_area_by_id_db
from crud.campaign import (
    add_campaign_logo_db,
    create_campaign_db,
    delete_campaign_by_id_db,
    get_campaign_by_id_db,
    get_campaign_by_name_and_area_id_db,
    get_campaigns_by_area_id_db,
    update_campaign_by_id_db,
)
from crud.media import create_media_db, delete_media_by_id_db, generate_default_media
from crud.project import get_project_by_id_db
from database import Area, Campaign, Media, Project, Session

from .feature_flag import feature_flag_db_to_feature_flag
from .middleware import Context
from .schemas.campaign import CampaignGet, CampaignPatch, CampaignPost, CampaignStatus
from .schemas.media import MediaGet, MediaType
from .schemas.user import AuthPayload, RoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def campaign_db_to_campaign(campaign: Campaign) -> CampaignGet:
    logger.debug(f"Converting campaign {campaign.id} to schema")
    return CampaignGet(
        id=campaign.id,
        area_id=campaign.area_id,
        name=campaign.name,
        description=campaign.description,
        status=campaign.status,
        logo=MediaGet(
            media_id=campaign.logo_id,
            media_type=MediaType.CAMPAIGN_LOGO,
            public_path=campaign.logo.public_path,
        ),
        author=user_db_to_user(campaign.author),
        feature_flag=feature_flag_db_to_feature_flag(campaign.feature_flag),
    )


async def campaigns_in_area(
    info: strawberry.Info[Context],
    area_id: int,
    campaign_status: Optional[CampaignStatus] = None,
) -> List[CampaignGet]:
    logger.info(f"Getting campaigns for area {area_id} with status {campaign_status}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Optional[Area] = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view campaigns in area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view campaigns',
        )

    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(db, area_id, campaign_status)
    logger.debug(f"Found {len(campaigns)} campaigns")
    out: List[CampaignGet] = []
    for cp in campaigns:
        out.append(campaign_db_to_campaign(cp))
    return out


async def campaigns_in_area_without_default(
    info: strawberry.Info[Context],
    area_id: int,
    campaign_status: Optional[CampaignStatus] = None,
) -> List[CampaignGet]:
    logger.info(f"Getting non-default campaigns for area {area_id} with status {campaign_status}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Optional[Area] = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view campaigns in area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view campaigns',
        )

    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(db, area_id, campaign_status)
    logger.debug(f"Found {len(campaigns)} campaigns before filtering defaults")
    out: List[CampaignGet] = []
    for cp in campaigns:
        if cp.default:
            continue
        out.append(campaign_db_to_campaign(cp))
    logger.debug(f"Returning {len(out)} non-default campaigns")
    return out


async def campaign_by_id(info: strawberry.Info[Context], campaign_id: int) -> CampaignGet:
    logger.info(f"Getting campaign {campaign_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view campaign {campaign_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view campaigns',
        )

    return campaign_db_to_campaign(campaign)


async def create_campaign_route(info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
    logger.info(f"Creating new campaign in area {cmp.area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Optional[Area] = await get_area_by_id_db(db, cmp.area_id)
    if area is None:
        logger.error(f"Area {cmp.area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create campaigns in area {cmp.area_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to create campaigns',
        )

    campaign: Campaign = await create_campaign_db(db, area.project_id, user.user.id, cmp)
    logger.debug(f"Created campaign {campaign.id}")

    return campaign_db_to_campaign(campaign)


async def update_campaign_route(info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
    logger.info(f"Updating campaign {cmp.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, cmp.id)
    if not campaign:
        logger.error(f"Campaign {cmp.id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Optional[Project] = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        logger.error(f"Project {campaign.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update campaign {cmp.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change campaign',
        )

    campaign = await update_campaign_by_id_db(db, campaign, cmp)
    logger.debug(f"Updated campaign {campaign.id}")

    return campaign_db_to_campaign(campaign)


async def delete_campaign_route(info: strawberry.Info[Context], campaign_id: int) -> None:
    logger.info(f"Deleting campaign {campaign_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Optional[Project] = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        logger.error(f"Project {campaign.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete campaign {campaign_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change campaign',
        )

    if campaign.default:
        logger.error(f"Cannot delete default campaign {campaign_id}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Cannot delete default campaign'
        )

    await delete_campaign_by_id_db(db, campaign)
    logger.debug(f"Deleted campaign {campaign.id}")


async def add_campaign_logo_route(
    info: strawberry.Info[Context], file: UploadFile, campaign_id: int
) -> MediaGet:
    logger.info(f"Adding logo to campaign {campaign_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Optional[Project] = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        logger.error(f"Project {campaign.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to add logo to campaign {campaign_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change campaign',
        )

    try:
        media: Media = await create_media_db(db, file)
    except Exception as exc:
        logger.error(f"Failed to create media file for campaign {campaign_id}: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        ) from exc

    campaign = await add_campaign_logo_db(db, campaign, media)
    logger.debug(f"Added logo {media.id} to campaign {campaign_id}")

    return MediaGet(
        media_id=media.id, media_type=MediaType.CAMPAIGN_LOGO, public_path=media.public_path
    )


async def delete_campaign_logo_route(
    info: strawberry.Info[Context], campaign_id: int
) -> CampaignGet:
    logger.info(f"Deleting logo from campaign {campaign_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Optional[Project] = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        logger.error(f"Project {campaign.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to delete logo from campaign {campaign_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change campaign',
        )

    await delete_media_by_id_db(db, campaign.logo_id)
    default_logo = await generate_default_media(db, f"{campaign.name}.png")
    campaign = await add_campaign_logo_db(db, campaign, default_logo)
    logger.debug(f"Deleted logo from campaign {campaign_id} and set default logo {default_logo.id}")
    return campaign_db_to_campaign(campaign)


async def campaign_by_name(
    info: strawberry.Info[Context],
    area_id: int,
    name: str,
    limit: Optional[int] = 5,
    campaign_status: Optional[CampaignStatus] = None,
) -> list[CampaignGet]:
    logger.info(f"Searching for campaigns with name '{name}' in area {area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Optional[Area] = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to search campaigns in area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view campaigns',
        )

    campaign: Optional[Campaign] = await get_campaign_by_name_and_area_id_db(db, area_id, name)
    if campaign:
        logger.debug(f"Found exact match for campaign name '{name}'")
        return [campaign_db_to_campaign(campaign)]

    campaigns: list[CampaignGet] = await campaigns_in_area(info, area_id, campaign_status)
    scores = process.extractBests(name, [campaign.name for campaign in campaigns], limit=limit)
    logger.debug(f"Found {len(scores)} fuzzy matches for campaign name '{name}'")
    out: List[CampaignGet] = []
    for score in scores:
        campaign_db: Optional[Campaign] = await get_campaign_by_name_and_area_id_db(
            db, area_id, score[0]
        )
        if campaign_db:
            out.append(campaign_db_to_campaign(campaign_db))

    return out
