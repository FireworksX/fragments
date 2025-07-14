from typing import List, Optional

from sqlalchemy.orm import Session

from crud.feature_flag import create_feature_flag_db
from crud.media import generate_default_media
from crud.release_condition import create_release_condition_db
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
    experiment_id: Optional[int],
) -> Campaign:
    default_campaign_logo = await generate_default_media(db, f"{name}_campaign.png")
    default_campaign_feature_flag = await create_feature_flag_db(
        db,
        project_id,
        FeatureFlagPost(
            name=f'{name}_default_feature_flag',
            description=f'Default feature flag for {name}',
            rotation_type=RotationType.KEEP,
            release_condition=ReleaseConditionPost(project_id=project_id,
                name=f'{name}_default_release_condition', condition_sets=[]
            ),
            variants=[],
        ),
    )
    db.add(default_campaign_feature_flag)
    db.commit()
    db.refresh(default_campaign_feature_flag)

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
        experiment_id=experiment_id,
    )

    db.add(campaign)
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
    db: Session, area_id: int, status: Optional[CampaignStatus] = None
) -> List[Campaign]:
    query = db.query(Campaign).filter(Campaign.area_id == area_id)
    if status is not None:
        query = query.filter(Campaign.status == int(status.value))
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
    if values.get('status') is not None:
        campaign.status = int(values['status'].value)
    if values.get('experiment_id') is not None:
        campaign.experiment_id = values['experiment_id']
    db.merge(campaign)
    db.commit()
    db.refresh(campaign)

    return campaign
