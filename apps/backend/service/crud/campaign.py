from typing import List, Optional

from sqlalchemy.orm import Session

from crud.media import generate_default_media
from database.models import (
    Campaign,
    CampaignDeviceTypeFilter,
    CampaignGeoLocationFilter,
    CampaignOSTypeFilter,
    CampaignPageFilter,
    CampaignTimeFrameFilter,
)
from services.core.routes.schemas.campaign import FiltersPost
from services.core.routes.schemas.filter import (
    DeviceType,
    FilterGeoLocationPost,
    FilterTimeFramePost,
    OSType,
)


def add_os_type_filter_to_campaign(campaign: Campaign, os_type_filter: OSType) -> None:
    relation: CampaignOSTypeFilter = CampaignOSTypeFilter(
        campaign_id=campaign.id, os_type=int(os_type_filter.value)
    )
    relation.campaign = campaign


def add_device_type_filter_to_campaign(campaign: Campaign, device_type_filter: DeviceType) -> None:
    relation: CampaignDeviceTypeFilter = CampaignDeviceTypeFilter(
        campaign_id=campaign.id, device_type=int(device_type_filter.value)
    )
    relation.campaign = campaign


def add_page_filter_to_campaign(campaign: Campaign, page_filter: str) -> None:
    relation: CampaignPageFilter = CampaignPageFilter(campaign_id=campaign.id, page=page_filter)
    relation.campaign = campaign


def add_geolocation_filter_to_campaign(
    campaign: Campaign, geo_location_filter: FilterGeoLocationPost
) -> None:
    relation: CampaignGeoLocationFilter = CampaignGeoLocationFilter(
        campaign_id=campaign.id,
        country=geo_location_filter.country,
        region=geo_location_filter.region,
        city=geo_location_filter.city,
    )
    relation.campaign = campaign


def add_time_frame_filter_to_campaign(
    campaign: Campaign, time_frame_filter: FilterTimeFramePost
) -> None:
    relation: CampaignTimeFrameFilter = CampaignTimeFrameFilter(
        campaign_id=campaign.id,
        to_time=time_frame_filter.to_time,
        from_time=time_frame_filter.from_time,
    )
    relation.campaign = campaign


async def create_campaign_db(
    db: Session,
    name: str,
    project_id: int,
    area_id: int,
    description: str,
    active: bool,
    archived: bool,
    author_id: int,
    default: bool,
    fragment_id: Optional[int],
    filters: Optional[FiltersPost],
) -> Campaign:
    default_campaign_logo = await generate_default_media(db, f"{name}_campaign.png")
    campaign: Campaign = Campaign(
        name=name,
        project_id=project_id,
        area_id=area_id,
        description=description,
        active=active,
        archived=archived,
        author_id=author_id,
        fragment_id=fragment_id,
        default=default,
        logo_id=default_campaign_logo.id,
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)

    if filters is not None:
        for os_type in filters.os_types:
            add_os_type_filter_to_campaign(campaign, os_type)
        for device_type in filters.device_types:
            add_device_type_filter_to_campaign(campaign, device_type)
        for page in filters.pages:
            add_page_filter_to_campaign(campaign, page)
        for geo_location in filters.geolocations:
            add_geolocation_filter_to_campaign(campaign, geo_location)
        for time_frame in filters.time_frames:
            add_time_frame_filter_to_campaign(campaign, time_frame)
    db.commit()
    db.refresh(campaign)
    return campaign


async def get_campaign_by_id_db(db: Session, campaign_id: int) -> Optional[Campaign]:
    return db.query(Campaign).filter(Campaign.id == campaign_id).first()


async def delete_campaign_by_id_db(db: Session, campaign_id: int) -> None:
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if campaign.default:
        raise ValueError('Cannot delete default campaign')
    db.delete(campaign)
    db.commit()


async def get_campaign_by_name_and_area_id_db(
    db: Session, area_id: int, name: str
) -> Optional[Campaign]:
    return (
        db.query(Campaign).filter(Campaign.area_id == area_id).filter(Campaign.name == name).first()
    )


async def get_campaigns_by_area_id_db(
    db: Session, area_id: int, active: Optional[bool] = None, archived: Optional[bool] = None
) -> List[Campaign]:
    query = db.query(Campaign).filter(Campaign.area_id == area_id)
    if active is not None:
        query = query.filter(Campaign.active == active)
    if archived is not None:
        query = query.filter(Campaign.archived == archived)
    return query.all()


async def get_default_campaign_by_project_id_db(db: Session, project_id: int) -> Optional[Campaign]:
    return (
        db.query(Campaign)
        .filter(Campaign.project_id == project_id, Campaign.default == True)
        .first()
    )


async def update_campaign_by_id_db(
    db: Session, values: dict, filters: Optional[FiltersPost]
) -> Campaign:
    campaign: Campaign = await get_campaign_by_id_db(db, values['id'])
    if values.get('name') is not None:
        campaign.name = values['name']
    if values.get('description') is not None:
        campaign.description = values['description']
    if values.get('active') is not None:
        campaign.active = values['active']
    if values.get('archived') is not None:
        campaign.archived = values['archived']
    if values.get('fragment_id') is not None:
        campaign.fragment_id = values['fragment_id']
    db.merge(campaign)
    db.commit()
    db.refresh(campaign)

    if filters is not None:
        campaign.os_types_filter.clear()
        campaign.device_types_filter.clear()
        campaign.pages_filter.clear()
        campaign.geo_locations_filter.clear()
        campaign.time_frames_filter.clear()

        for os_type in filters.os_types:
            add_os_type_filter_to_campaign(campaign, os_type)
        for device_type in filters.device_types:
            add_device_type_filter_to_campaign(campaign, device_type)
        for page in filters.pages:
            add_page_filter_to_campaign(campaign, page)
        for geo_location in filters.geolocations:
            add_geolocation_filter_to_campaign(campaign, geo_location)
        for time_frame in filters.time_frames:
            add_time_frame_filter_to_campaign(campaign, time_frame)

    db.commit()
    db.refresh(campaign)
    return campaign
