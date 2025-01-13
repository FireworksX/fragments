from database.models import Landing
from sqlalchemy.orm import Session
from typing import Optional, List


async def create_landing_db(db: Session, name: str, project_id: int, stream_id: int, fragment_id: Optional[int] = None,
                            props: Optional[str] = None, weight: Optional[float] = None, active: Optional[bool] = True,
                            deleted: Optional[bool] = False) -> Landing:
    landing: Landing = Landing(name=name, project_id=project_id, stream_id=stream_id,
                               fragment_id=fragment_id, props=props, weight=weight, active=active, deleted=deleted)

    db.add(landing)
    db.commit()
    db.refresh(landing)
    return landing


async def get_landing_by_id_db(db: Session, landing_id: int) -> Optional[Landing]:
    return db.query(Landing).filter(Landing.id == landing_id).first()


async def get_landings_by_stream_id_db(db: Session, stream_id: int) -> List[Landing]:
    return db.query(Landing).filter(Landing.stream_id == stream_id).all()


async def update_landing_by_id_db(db: Session, values: dict) -> Landing:
    landing: Landing = await get_landing_by_id_db(db, values['id'])
    if values.get('name') is not None:
        landing.name = values['name']
    if values.get('weight') is not None:
        landing.weight = values['weight']
    if values.get('props') is not None:
        landing.props = values['props']
    if values.get('active') is not None:
        landing.active = values['active']
    if values.get('deleted') is not None:
        landing.deleted = values['deleted']
    if values.get('fragment_id') is not None:
        landing.fragment_id = values['fragment_id']
    db.merge(landing)
    db.commit()
    db.refresh(landing)
    return landing
