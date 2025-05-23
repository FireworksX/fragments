from copy import deepcopy
from typing import List, Optional, Union

import strawberry
from fastapi import HTTPException, UploadFile, status
from thefuzz import fuzz, process

from conf import service_settings
from crud.area import get_area_by_id_db
from crud.campaign import (
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

from .fragment import fragment_db_to_fragment
from .middleware import Context
from .schemas.campaign import CampaignGet, CampaignPatch, CampaignPost
from .schemas.filter import (
    FilterDeviceTypeGet,
    FilterGeoLocationGet,
    FilterGeoLocationsGet,
    FilterOSTypeGet,
    FilterPageGet,
    FilterTimeFrameGet,
    FilterTimeFramesGet,
)
from .schemas.media import MediaGet, MediaType
from .schemas.user import AuthPayload, RoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def campaign_db_to_campaign(campaign: Campaign) -> CampaignGet:
    filters: List[
        Union[
            FilterOSTypeGet
            | FilterDeviceTypeGet
            | FilterPageGet
            | FilterGeoLocationsGet
            | FilterTimeFramesGet
        ]
    ] = [
        FilterOSTypeGet(
            os_types=[os_type_filter.os_type for os_type_filter in campaign.os_types_filter]
        ),
        FilterDeviceTypeGet(
            device_types=[
                device_type_filter.device_type
                for device_type_filter in campaign.device_types_filter
            ]
        ),
        FilterPageGet(pages=[page.page for page in campaign.pages_filter]),
        FilterGeoLocationsGet(
            geo_locations=[
                FilterGeoLocationGet(
                    country=geo_location.country, region=geo_location.region, city=geo_location.city
                )
                for geo_location in campaign.geo_locations_filter
            ]
        ),
        FilterTimeFramesGet(
            time_frames=[
                FilterTimeFrameGet(from_time=frame.from_time, to_time=frame.to_time)
                for frame in campaign.time_frames_filter
            ]
        ),
    ]
    return CampaignGet(
        id=campaign.id,
        fragment=fragment_db_to_fragment(campaign.fragment) if campaign.fragment else None,
        area_id=campaign.area_id,
        name=campaign.name,
        description=campaign.description,
        archived=campaign.archived,
        default=campaign.default,
        active=campaign.active,
        logo=MediaGet(
            media_id=campaign.logo_id,
            media_type=MediaType.CAMPAIGN_LOGO,
            public_path=campaign.logo.public_path,
        ),
        author=user_db_to_user(campaign.author),
        filters=filters,
    )


async def campaigns_in_area(
    info: strawberry.Info[Context],
    area_id: int,
    active: Optional[bool] = None,
    archived: Optional[bool] = None,
) -> List[CampaignGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view campaigns',
        )

    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(db, area_id, active, archived)
    out: List[CampaignGet] = []
    for cp in campaigns:
        out.append(campaign_db_to_campaign(cp))
    return out


async def campaign_by_id(info: strawberry.Info[Context], campaign_id: int) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view campaigns',
        )

    return campaign_db_to_campaign(campaign)


async def create_campaign_route(info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, cmp.area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create campaigns',
        )

    campaign: Campaign = await create_campaign_db(
        db,
        cmp.name,
        area.project_id,
        cmp.area_id,
        cmp.description,
        cmp.active,
        cmp.archived,
        user.user.id,
        False,
        cmp.fragment_id,
        cmp.filters,
    )

    return campaign_db_to_campaign(campaign)


async def update_campaign_route(info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, cmp.id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change campaign',
        )

    campaign: Campaign = await update_campaign_by_id_db(
        db, values=cmp.__dict__, filters=cmp.filters
    )

    return campaign_db_to_campaign(campaign)


async def delete_campaign_route(info: strawberry.Info[Context], campaign_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change campaign',
        )

    await delete_campaign_by_id_db(db, campaign_id)


async def add_campaign_logo_route(
    info: strawberry.Info[Context], file: UploadFile, campaign_id: int
) -> MediaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change campaign',
        )

    media: Media = await create_media_db(db, file)
    if media is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        )
    campaign.logo_id = media.id
    db.commit()

    return MediaGet(
        media_id=media.id, media_type=MediaType.CAMPAIGN_LOGO, public_path=media.public_path
    )


async def delete_campaign_logo_route(
    info: strawberry.Info[Context], campaign_id: int
) -> CampaignGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project.id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change campaign',
        )

    await delete_media_by_id_db(db, campaign.logo_id)
    default_logo = await generate_default_media(db, f"{campaign.name}.png")
    campaign.logo_id = default_logo.id
    db.commit()
    return campaign_db_to_campaign(campaign)


async def campaign_by_name(
    info: strawberry.Info[Context],
    area_id: int,
    name: str,
    limit: Optional[int] = 5,
    active: Optional[bool] = None,
    archived: Optional[bool] = None,
) -> list[CampaignGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view campaigns',
        )

    campaign: Campaign = await get_campaign_by_name_and_area_id_db(db, area_id, name)
    if campaign:
        return [campaign_db_to_campaign(campaign)]

    campaigns: list[CampaignGet] = await campaigns_in_area(info, area_id, active, archived)
    scores = process.extractBests(name, [campaign.name for campaign in campaigns], limit=limit)
    out: List[CampaignGet] = []
    for score in scores:
        out.append(
            campaign_db_to_campaign(
                await get_campaign_by_name_and_area_id_db(db, area_id, score[0])
            )
        )
    return out
