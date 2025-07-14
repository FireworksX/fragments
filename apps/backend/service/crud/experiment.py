from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import Experiment
from services.core.routes.schemas.feature_flag import FeatureFlagPost
from crud.feature_flag import create_feature_flag_db


async def create_experiment_db(
    db: Session,
    name: str,
    feature_flag: FeatureFlagPost,
    description: Optional[str] = None,
) -> Experiment:
    experiment = Experiment(
        name=name,
        description=description,
        feature_flag_id=create_feature_flag_db(db, feature_flag).id
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    return experiment


async def get_experiment_by_id_db(db: Session, experiment_id: int) -> Optional[Experiment]:
    return db.query(Experiment).filter(Experiment.id == experiment_id).first()


async def get_experiment_by_name_db(db: Session, name: str) -> Optional[Experiment]:
    return db.query(Experiment).filter(Experiment.name == name).first()


async def get_experiments_db(db: Session) -> List[Experiment]:
    return db.query(Experiment).all()


async def update_experiment_db(db: Session, experiment_id: int, values: dict) -> Experiment:
    experiment = await get_experiment_by_id_db(db, experiment_id)
    if values.get('name'):
        experiment.name = values['name']
    if values.get('description') is not None:
        experiment.description = values['description']
    if values.get('feature_flag_id'):
        experiment.feature_flag_id = values['feature_flag_id']
    db.commit()
    db.refresh(experiment)
    return experiment


async def delete_experiment_db(db: Session, experiment_id: int) -> None:
    experiment = await get_experiment_by_id_db(db, experiment_id)
    db.delete(experiment)
    db.commit()

