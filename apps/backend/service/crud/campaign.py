import uuid
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from crud.feature_flag import create_feature_flag_db
from crud.media import generate_default_media
from database.models import Campaign, Media
from services.core.routes.schemas.campaign import CampaignPatch, CampaignPost, CampaignStatus
from services.core.routes.schemas.feature_flag import FeatureFlagPost, RotationType
from services.core.routes.schemas.release_condition import ReleaseConditionPost


async def create_campaign_db(
    db: Session, project_id: int, author_id: int, campaign: CampaignPost, default: bool = False
) -> Campaign:
    logger.info(f"Creating campaign {campaign.name} in area {campaign.area_id}")
    default_campaign_logo = await generate_default_media(db, f"{campaign.name}_campaign.png")
    try:
        logger.debug(f"Creating default feature flag for campaign {campaign.name}")
        default_campaign_feature_flag = await create_feature_flag_db(
            db,
            project_id,
            FeatureFlagPost(
                name=f'{campaign.name}_default_feature_flag',
                description=f'Default feature flag for {campaign.name}',
                rotation_type=RotationType.KEEP,
                release_condition=ReleaseConditionPost(
                    project_id=project_id,
                    name=f'{campaign.name}_default_release_condition',
                    condition_sets=[],
                ),
                variants=[],
            ),
        )
    except ValueError:
        logger.warning(f"Feature flag name conflict for {campaign.name}, adding UUID")
        default_campaign_feature_flag = await create_feature_flag_db(
            db,
            project_id,
            FeatureFlagPost(
                name=f'{campaign.name}_{uuid.uuid4()}_default_feature_flag',
                description=f'Default feature flag for {campaign.name}',
                rotation_type=RotationType.KEEP,
                release_condition=ReleaseConditionPost(
                    project_id=project_id,
                    name=f'{campaign.name}_{uuid.uuid4()}_default_release_condition',
                    condition_sets=[],
                ),
                variants=[],
            ),
        )

    campaign_db: Campaign = Campaign(
        name=campaign.name,
        project_id=project_id,
        area_id=campaign.area_id,
        description=campaign.description,
        default=default,
        status=int(campaign.status.value),
        author_id=author_id,
        logo_id=default_campaign_logo.id,
        feature_flag_id=default_campaign_feature_flag.id,
    )

    db.add(campaign_db)
    db.commit()
    db.refresh(campaign_db)
    logger.debug(f"Created campaign {campaign_db.id}")

    return campaign_db


async def get_campaign_by_id_db(db: Session, campaign_id: int) -> Optional[Campaign]:
    logger.info(f"Getting campaign by id {campaign_id}")
    return db.query(Campaign).filter(Campaign.id == campaign_id).first()


async def delete_campaign_by_id_db(db: Session, campaign_db: Campaign) -> None:
    logger.info(f"Deleting campaign {campaign_db.id}")
    db.delete(campaign_db)
    db.commit()
    logger.debug(f"Deleted campaign {campaign_db.id}")


async def get_campaign_by_name_and_area_id_db(
    db: Session, area_id: int, name: str
) -> Optional[Campaign]:
    logger.info(f"Getting campaign by name {name} in area {area_id}")
    campaign = (
        db.query(Campaign).filter(Campaign.area_id == area_id).filter(Campaign.name == name).first()
    )
    if campaign:
        logger.debug(f"Found campaign {campaign.id}")
    else:
        logger.debug(f"Campaign {name} not found in area {area_id}")
    return campaign


async def get_campaigns_by_area_id_db(
    db: Session, area_id: int, campaign_status: Optional[CampaignStatus] = None
) -> List[Campaign]:
    logger.info(f"Getting campaigns for area {area_id} with status {campaign_status}")
    query = db.query(Campaign).filter(Campaign.area_id == area_id)
    if campaign_status is not None:
        query = query.filter(Campaign.status == int(campaign_status.value))
    campaigns = query.all()
    logger.debug(f"Found {len(campaigns)} campaigns")
    return campaigns


async def update_campaign_by_id_db(
    db: Session, campaign_db: Campaign, campaign: CampaignPatch
) -> Campaign:
    logger.info(f"Updating campaign {campaign_db.id}")
    if campaign.name is not None:
        logger.debug(f"Updating name to {campaign.name}")
        campaign_db.name = campaign.name
    if campaign.description is not None:
        logger.debug('Updating description')
        campaign_db.description = campaign.description
    if campaign.status is not None:
        logger.debug(f"Updating status to {campaign.status}")
        campaign_db.status = int(campaign.status.value)
    db.merge(campaign_db)
    db.commit()
    db.refresh(campaign_db)
    logger.debug(f"Updated campaign {campaign_db.id}")

    return campaign_db


async def add_campaign_logo_db(db: Session, campaign_db: Campaign, media: Media) -> Campaign:
    logger.info(f"Adding logo {media.id} to campaign {campaign_db.id}")
    campaign_db.logo_id = media.id
    db.merge(campaign_db)
    db.commit()
    db.refresh(campaign_db)
    logger.debug(f"Added logo {media.id} to campaign {campaign_db.id}")
    return campaign_db
