from typing import List, Optional

from sqlalchemy.orm import Session

from crud.feature_flag import create_feature_flag_db
from crud.media import generate_default_media
from crud.release_condition import create_release_condition_db
from database.models import Campaign
from services.core.routes.schemas.feature_flag import FeatureFlagPost
from services.core.routes.schemas.release_condition import ReleaseConditionPost


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
    experiment_id: Optional[int],
    feature_flag: Optional[FeatureFlagPost],
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
        default=default,
        logo_id=default_campaign_logo.id,
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)

    if experiment_id is not None:
        campaign.experiment_id = experiment_id
    if feature_flag is not None:
        campaign.feature_flag = await create_feature_flag_db(db, feature_flag)
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


async def update_campaign_by_id_db(db: Session, values: dict) -> Campaign:
    campaign: Campaign = await get_campaign_by_id_db(db, values['id'])
    if values.get('name') is not None:
        campaign.name = values['name']
    if values.get('description') is not None:
        campaign.description = values['description']
    if values.get('active') is not None:
        campaign.active = values['active']
    if values.get('archived') is not None:
        campaign.archived = values['archived']
    if values.get('experiment_id') is not None:
        campaign.experiment_id = values['experiment_id']
    db.merge(campaign)
    db.commit()
    db.refresh(campaign)

    return campaign
