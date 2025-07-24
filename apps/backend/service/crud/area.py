from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from crud.campaign import create_campaign_db
from crud.media import generate_default_media
from database.models import Area
from services.core.routes.schemas.campaign import CampaignStatus


async def create_area_db(
    db: Session,
    default_campaign_name: str,
    project_id: int,
    author_id: int,
    area_code: str,
    description: Optional[str] = None,
) -> Area:
    logger.info(f"Creating area with code {area_code} in project {project_id}")
    existing_area = await get_area_by_code_and_project_id_db(db, project_id, area_code)
    if existing_area:
        logger.error(f"Area code {area_code} already exists in project {project_id}")
        raise ValueError(f"Area code {area_code} already exists in project")

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
    logger.debug(f"Created area {area.id}")

    default_campaign = await create_campaign_db(
        db,
        name=default_campaign_name,
        description=f'Default campaign for {area_code}',
        project_id=project_id,
        area_id=area.id,
        default=True,
        status=CampaignStatus.ACTIVE,
        author_id=author_id,
        experiment_id=None,
    )
    logger.debug(f"Created default campaign {default_campaign.id} for area {area.id}")

    return area


async def get_area_by_id_db(db: Session, area_id: int) -> Optional[Area]:
    logger.info(f"Getting area by id {area_id}")
    area = db.query(Area).filter(Area.id == area_id, Area.deleted_at.is_(None)).first()
    if area:
        logger.debug(f"Found area {area.id}")
    else:
        logger.debug(f"Area {area_id} not found")
    return area


async def get_area_by_code_db(db: Session, area_code: str) -> Optional[Area]:
    logger.info(f"Getting area by code {area_code}")
    area = db.query(Area).filter(Area.area_code == area_code, Area.deleted_at.is_(None)).first()
    if area:
        logger.debug(f"Found area {area.id}")
    else:
        logger.debug(f"Area with code {area_code} not found")
    return area


async def get_area_by_code_and_project_id_db(
    db: Session, project_id: int, area_code: str
) -> Optional[Area]:
    logger.info(f"Getting area by code {area_code} in project {project_id}")
    area = (
        db.query(Area)
        .filter(
            Area.project_id == project_id, Area.area_code == area_code, Area.deleted_at.is_(None)
        )
        .first()
    )
    if area:
        logger.debug(f"Found area {area.id}")
    else:
        logger.debug(f"Area with code {area_code} not found in project {project_id}")
    return area


async def get_areas_by_project_id_db(db: Session, project_id: int) -> List[Area]:
    logger.info(f"Getting areas for project {project_id}")
    areas = db.query(Area).filter(Area.project_id == project_id, Area.deleted_at.is_(None)).all()
    logger.debug(f"Found {len(areas)} areas")
    return areas


async def update_area_by_id_db(db: Session, values: dict) -> Area:
    logger.info(f"Updating area {values['id']}")
    area: Area = await get_area_by_id_db(db, values['id'])
    if values.get('description') is not None:
        logger.debug(f"Updating description for area {area.id}")
        area.description = values['description']
    if values.get('area_code') is not None:
        logger.debug(f"Updating area code for area {area.id} to {values['area_code']}")
        # Check if area code already exists in project
        existing_area = await get_area_by_code_and_project_id_db(
            db, area.project_id, values['area_code']
        )
        if existing_area and existing_area.id != area.id:
            logger.error(
                f"Area code {values['area_code']} already exists in project {area.project_id}"
            )
            raise ValueError(f"Area code {values['area_code']} already exists in project")
        area.area_code = values['area_code']
    db.merge(area)
    db.commit()
    db.refresh(area)
    logger.debug(f"Updated area {area.id}")
    return area


async def delete_area_by_id_db(db: Session, area_id: int) -> None:
    logger.info(f"Deleting area {area_id}")
    area = await get_area_by_id_db(db, area_id)
    if area:
        area.deleted_at = datetime.now(timezone.utc)
        db.merge(area)
        db.commit()
        logger.debug(f"Deleted area {area_id}")
