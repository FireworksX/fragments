from database.models import Campaign, Project, ProjectCampaign
from sqlalchemy.orm import Session
from typing import Optional, List

async def create_campaign_db(db: Session, name: str, project_id: int, description: str, logo_id: int,
                             active: bool, deleted: bool, author_id: int) -> Campaign:
    campaign: Campaign = Campaign(name=name, project_id=project_id, description=description, active=active,
                                  deleted=deleted, logo_id=logo_id, author_id=author_id)
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    project: Project = db.query(Project).filter(Project.id == project_id).first()
    relation: ProjectCampaign = ProjectCampaign(campaign_id=campaign.id, project_id=campaign.project_id)
    relation.project = project
    relation.campaign = campaign
    project.campaigns.append(relation)
    db.commit()
    return campaign


async def get_campaign_by_id_db(db: Session, campaign_id: int) -> Optional[Campaign]:
    return db.query(Campaign).filter(Campaign.id == campaign_id).first()


async def get_campaigns_by_project_id_db(db: Session, project_id: int, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[Campaign]:
    query = db.query(Campaign).filter(Campaign.project_id == project_id)
    if active is not None:
        query = query.filter(Campaign.active == active)
    if deleted is not None:
        query = query.filter(Campaign.deleted == deleted)
    return query.all()


async def update_campaign_by_id_db(db: Session, values: dict) -> Campaign:
    campaign: Campaign = await get_campaign_by_id_db(db, values['id'])
    if values.get('name') is not None:
        campaign.name = values['name']
    if values.get('logo_id') is not None:
        campaign.logo_id = values['logo_id']
    if values.get('description') is not None:
        campaign.description = values['description']
    if values.get('active') is not None:
        campaign.active = values['active']
    if values.get('deleted') is not None:
        campaign.deleted = values['deleted']
    db.merge(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign
