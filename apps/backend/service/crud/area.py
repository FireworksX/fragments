from typing import List, Optional

from sqlalchemy.orm import Session

from crud.feature_flag import create_feature_flag_db
from crud.media import generate_default_media
from database.models import Area, Campaign
from services.core.routes.schemas.feature_flag import FeatureFlagPost
from crud.campaign import create_campaign_db

async def create_area_db(
    db: Session,
    name: str,
    project_id: int,
    author_id: int,
    area_code: str,
    description: Optional[str] = None,
) -> Area:
    default_media = await generate_default_media(db, f"{area_code}.png")
    area = Area(
        project_id=project_id,
        author_id=author_id,
        description=description,
        area_code=area_code,
        logo_id=default_media.id,
    )
    db.add(area)
    db.commit()
    db.refresh(area)

    default_campaign = await create_campaign_db(db,
        name=name,
        description=f'Default campaign for {area_code}',
        project_id=project_id,
        area_id=area.id,
        default=True,
        active=True,
        archived=False,
        author_id=author_id,
        experiment_id=None
    )

    return area


async def get_area_by_id_db(db: Session, area_id: int) -> Optional[Area]:
    return db.query(Area).filter(Area.id == area_id).first()


async def get_area_by_code_and_project_id_db(
    db: Session, project_id: int, area_code: str
) -> Optional[Area]:
    return db.query(Area).filter(Area.project_id == project_id, Area.area_code == area_code).first()


async def get_areas_by_project_id_db(db: Session, project_id: int) -> List[Area]:
    return db.query(Area).filter(Area.project_id == project_id).all()


async def update_area_by_id_db(db: Session, values: dict) -> Area:
    area: Area = await get_area_by_id_db(db, values['id'])
    if values.get('description') is not None:
        area.description = values['description']
    if values.get('area_code') is not None:
        # Check if area code already exists in project
        existing_area = await get_area_by_code_and_project_id_db(
            db, area.project_id, values['area_code']
        )
        if existing_area and existing_area.id != area.id:
            raise ValueError(f"Area code {values['area_code']} already exists in project")
        area.area_code = values['area_code']
    db.merge(area)
    db.commit()
    db.refresh(area)
    return area


async def delete_area_by_id_db(db: Session, area_id: int) -> None:
    db.query(Area).filter(Area.id == area_id).delete()
    db.commit()
