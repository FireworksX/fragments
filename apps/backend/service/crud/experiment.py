from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from crud.feature_flag import create_feature_flag_db
from database.models import Experiment
from services.core.routes.schemas.feature_flag import FeatureFlagPost


async def create_experiment_db(
    db: Session,
    name: str,
    feature_flag: FeatureFlagPost,
    description: Optional[str] = None,
) -> Experiment:
    logger.info(f"Creating experiment with name {name}")
    experiment = Experiment(
        name=name,
        description=description,
        feature_flag_id=create_feature_flag_db(db, feature_flag).id,
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    logger.debug(f"Created experiment {experiment.id}")
    return experiment


async def get_experiment_by_id_db(db: Session, experiment_id: int) -> Optional[Experiment]:
    logger.info(f"Getting experiment by id {experiment_id}")
    experiment = db.query(Experiment).filter(Experiment.id == experiment_id).first()
    if experiment:
        logger.debug(f"Found experiment {experiment.id}")
    else:
        logger.debug(f"Experiment {experiment_id} not found")
    return experiment


async def get_experiment_by_name_db(db: Session, name: str) -> Optional[Experiment]:
    logger.info(f"Getting experiment by name {name}")
    experiment = db.query(Experiment).filter(Experiment.name == name).first()
    if experiment:
        logger.debug(f"Found experiment {experiment.id}")
    else:
        logger.debug(f"Experiment {name} not found")
    return experiment


async def get_experiments_db(db: Session) -> List[Experiment]:
    logger.info('Getting all experiments')
    experiments = db.query(Experiment).all()
    logger.debug(f"Found {len(experiments)} experiments")
    return experiments


async def update_experiment_db(db: Session, experiment_id: int, values: dict) -> Experiment:
    logger.info(f"Updating experiment {experiment_id}")
    experiment = await get_experiment_by_id_db(db, experiment_id)
    if values.get('name'):
        logger.debug(f"Updating name to {values['name']}")
        experiment.name = values['name']
    if values.get('description') is not None:
        logger.debug('Updating description')
        experiment.description = values['description']
    if values.get('feature_flag_id'):
        logger.debug(f"Updating feature flag to {values['feature_flag_id']}")
        experiment.feature_flag_id = values['feature_flag_id']
    db.commit()
    db.refresh(experiment)
    logger.debug(f"Updated experiment {experiment.id}")
    return experiment


async def delete_experiment_db(db: Session, experiment_id: int) -> None:
    logger.info(f"Deleting experiment {experiment_id}")
    experiment = await get_experiment_by_id_db(db, experiment_id)
    db.delete(experiment)
    db.commit()
    logger.debug(f"Deleted experiment {experiment_id}")
