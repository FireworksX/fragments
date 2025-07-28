from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from crud.campaign import create_campaign_db
from crud.media import generate_default_media
from database.models import Area
from services.core.routes.schemas.area import AreaPatch, AreaPost
from services.core.routes.schemas.campaign import CampaignStatus


async def create_area_db(
    db: Session,
    author_id: int,
    area: AreaPost,
) -> Area:
    logger.info(f"Creating area with code {area.area_code} in project {area.project_id}")
    existing_area = await get_area_by_code_and_project_id_db(db, area.project_id, area.area_code)
    if existing_area:
        logger.error(f"Area code {area.area_code} already exists in project {area.project_id}")
        raise ValueError(f"Area code {area.area_code} already exists in project")

    default_media = await generate_default_media(db, f"{area.area_code}.png")
    area_db = Area(
        project_id=area.project_id,
        author_id=author_id,
        description=area.description,
        area_code=area.area_code,
        logo_id=default_media.id,
        properties=area.properties,
    )
    db.add(area_db)
    db.commit()
    db.refresh(area_db)
    logger.debug(f"Created area {area_db.id}")

    default_campaign = await create_campaign_db(
        db,
        name=area.default_campaign_name,
        description=f'Default campaign for {area_db.area_code}',
        project_id=area_db.project_id,
        area_id=area_db.id,
        default=True,
        status=CampaignStatus.ACTIVE,
        author_id=author_id,
        experiment_id=None,
    )
    logger.debug(f"Created default campaign {default_campaign.id} for area {area_db.id}")

    return area_db


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


async def update_area_by_id_db(db: Session, area: AreaPatch) -> Area:
    logger.info(f"Updating area {area.id}")
    area_db: Area = await get_area_by_id_db(db, area.id)
    if area.description is not None:
        logger.debug(f"Updating description for area {area.id}")
        area_db.description = area.description
    if area.properties is not None:
        logger.debug(f"Updating properties for area {area.id}")
        area_db.properties = area.properties
    if area.area_code is not None:
        logger.debug(f"Updating area code for area {area.id} to {area.area_code}")
        # Check if area code already exists in project
        existing_area = await get_area_by_code_and_project_id_db(
            db, area.project_id, area.area_code
        )
        if existing_area and existing_area.id != area.id:
            logger.error(
                f"Area code {area.area_code} already exists in project {area.project_id}"
            )
            raise ValueError(f"Area code {area.area_code} already exists in project")
        area_db.area_code = area.area_code
    db.merge(area_db)
    db.commit()
    db.refresh(area_db)
    logger.debug(f"Updated area {area_db.id}")
    return area_db


async def delete_area_by_id_db(db: Session, area_id: int) -> None:
    logger.info(f"Deleting area {area_id}")
    area = await get_area_by_id_db(db, area_id)
    if area:
        area.deleted_at = datetime.now(timezone.utc)
        db.merge(area)
        db.commit()
        logger.debug(f"Deleted area {area_id}")
