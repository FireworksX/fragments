import uuid
from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from crud.feature_flag import create_feature_flag_db
from crud.media import generate_default_media
from database.models import Campaign
from services.core.routes.schemas.campaign import CampaignStatus
from services.core.routes.schemas.feature_flag import FeatureFlagPost, RotationType
from services.core.routes.schemas.release_condition import ReleaseConditionPost


async def create_campaign_db(
    db: Session,
    name: str,
    project_id: int,
    area_id: int,
    description: str,
    default: bool,
    status: CampaignStatus,
    author_id: int,
) -> Campaign:
    logger.info(f"Creating campaign {name} in area {area_id}")
    default_campaign_logo = await generate_default_media(db, f"{name}_campaign.png")
    try:
        logger.debug(f"Creating default feature flag for campaign {name}")
        default_campaign_feature_flag = await create_feature_flag_db(
            db,
            project_id,
            FeatureFlagPost(
                name=f'{name}_default_feature_flag',
                description=f'Default feature flag for {name}',
                rotation_type=RotationType.KEEP,
                release_condition=ReleaseConditionPost(
                    project_id=project_id,
                    name=f'{name}_default_release_condition',
                    condition_sets=[],
                ),
                variants=[],
            ),
        )
    except ValueError:
        logger.warning(f"Feature flag name conflict for {name}, adding UUID")
        default_campaign_feature_flag = await create_feature_flag_db(
            db,
            project_id,
            FeatureFlagPost(
                name=f'{name}_{uuid.uuid4()}_default_feature_flag',
                description=f'Default feature flag for {name}',
                rotation_type=RotationType.KEEP,
                release_condition=ReleaseConditionPost(
                    project_id=project_id,
                    name=f'{name}_{uuid.uuid4()}_default_release_condition',
                    condition_sets=[],
                ),
                variants=[],
            ),
        )

    campaign: Campaign = Campaign(
        name=name,
        project_id=project_id,
        area_id=area_id,
        description=description,
        default=default,
        status=int(status.value),
        author_id=author_id,
        logo_id=default_campaign_logo.id,
        feature_flag_id=default_campaign_feature_flag.id,
    )

    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    logger.debug(f"Created campaign {campaign.id}")

    return campaign


async def get_campaign_by_id_db(db: Session, campaign_id: int) -> Optional[Campaign]:
    logger.info(f"Getting campaign by id {campaign_id}")
    campaign = (
        db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.deleted_at.is_(None)).first()
    )
    if campaign:
        logger.debug(f"Found campaign {campaign.id}")
    else:
        logger.debug(f"Campaign {campaign_id} not found")
    return campaign


async def delete_campaign_by_id_db(db: Session, campaign_id: int) -> None:
    logger.info(f"Deleting campaign {campaign_id}")
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if campaign.default:
        logger.error(f"Cannot delete default campaign {campaign_id}")
        raise ValueError('Cannot delete default campaign')
    campaign.deleted_at = datetime.now(timezone.utc)
    campaign.status = int(CampaignStatus.INACTIVE.value)
    db.merge(campaign)
    db.commit()
    logger.debug(f"Deleted campaign {campaign_id}")


async def get_campaign_by_name_and_area_id_db(
    db: Session, area_id: int, name: str
) -> Optional[Campaign]:
    logger.info(f"Getting campaign by name {name} in area {area_id}")
    campaign = (
        db.query(Campaign)
        .filter(Campaign.area_id == area_id)
        .filter(Campaign.name == name)
        .filter(Campaign.deleted_at.is_(None))
        .first()
    )
    if campaign:
        logger.debug(f"Found campaign {campaign.id}")
    else:
        logger.debug(f"Campaign {name} not found in area {area_id}")
    return campaign


async def get_campaigns_by_area_id_db(
    db: Session, area_id: int, status: Optional[CampaignStatus] = None
) -> List[Campaign]:
    logger.info(f"Getting campaigns for area {area_id} with status {status}")
    query = db.query(Campaign).filter(Campaign.area_id == area_id, Campaign.deleted_at.is_(None))
    if status is not None:
        query = query.filter(Campaign.status == int(status.value))
    campaigns = query.all()
    logger.debug(f"Found {len(campaigns)} campaigns")
    return campaigns


async def get_default_campaign_by_project_id_db(db: Session, project_id: int) -> Optional[Campaign]:
    logger.info(f"Getting default campaign for project {project_id}")
    campaign = (
        db.query(Campaign)
        .filter(
            Campaign.project_id == project_id,
            Campaign.default == True,
            Campaign.deleted_at.is_(None),
        )
        .first()
    )
    if campaign:
        logger.debug(f"Found default campaign {campaign.id}")
    else:
        logger.debug(f"No default campaign found for project {project_id}")
    return campaign


async def update_campaign_by_id_db(db: Session, values: dict) -> Campaign:
    logger.info(f"Updating campaign {values['id']}")
    campaign: Campaign = await get_campaign_by_id_db(db, values['id'])
    if values.get('name') is not None:
        logger.debug(f"Updating name to {values['name']}")
        campaign.name = values['name']
    if values.get('description') is not None:
        logger.debug('Updating description')
        campaign.description = values['description']
    if values.get('status') is not None:
        logger.debug(f"Updating status to {values['status']}")
        campaign.status = int(values['status'].value)
    db.merge(campaign)
    db.commit()
    db.refresh(campaign)
    logger.debug(f"Updated campaign {campaign.id}")

    return campaign
