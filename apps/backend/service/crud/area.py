from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import Area, Campaign


async def create_area_db(
    db: Session, name: str, project_id: int, author_id: int, description: Optional[str] = None
) -> Area:
    area = Area(name=name, project_id=project_id, author_id=author_id, description=description)
    db.add(area)
    db.commit()
    db.refresh(area)

    # Create default campaign for the area
    default_campaign = Campaign(
        name='Default',
        description='Default campaign',
        project_id=project_id,
        area_id=area.id,
        weight=1.0,
        default=True,
        active=True,
        archived=False,
        author_id=author_id,
        fragment_id=None,
    )
    db.add(default_campaign)
    db.commit()
    db.refresh(default_campaign)

    return area


async def get_area_by_id_db(db: Session, area_id: int) -> Optional[Area]:
    return db.query(Area).filter(Area.id == area_id).first()


async def get_area_by_name_and_project_id_db(
    db: Session, project_id: int, name: str
) -> Optional[Area]:
    return db.query(Area).filter(Area.project_id == project_id, Area.name == name).first()


async def get_areas_by_project_id_db(db: Session, project_id: int) -> List[Area]:
    return db.query(Area).filter(Area.project_id == project_id).all()


async def update_area_by_id_db(db: Session, values: dict) -> Area:
    area: Area = await get_area_by_id_db(db, values['id'])
    if values.get('name') is not None:
        area.name = values['name']
    if values.get('description') is not None:
        area.description = values['description']
    db.merge(area)
    db.commit()
    db.refresh(area)
    return area


async def delete_area_by_id_db(db: Session, area_id: int) -> None:
    db.query(Area).filter(Area.id == area_id).delete()
    db.commit()
