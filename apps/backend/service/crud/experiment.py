from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import DataCollection, Experiment, Metrics, StopLogical


async def create_experiment_db(
    db: Session,
    name: str,
    feature_flag_id: int,
    description: Optional[str] = None,
    status: int = 0,
    stop_logical_id: Optional[int] = None,
    metrics_id: Optional[int] = None,
    data_collection_id: Optional[int] = None,
) -> Experiment:
    experiment = Experiment(
        name=name,
        description=description,
        feature_flag_id=feature_flag_id,
        status=status,
        stop_logical_id=stop_logical_id,
        metrics_id=metrics_id,
        data_collection_id=data_collection_id,
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
    if values.get('status') is not None:
        experiment.status = values['status']
    if values.get('stop_logical_id') is not None:
        experiment.stop_logical_id = values['stop_logical_id']
    if values.get('metrics_id') is not None:
        experiment.metrics_id = values['metrics_id']
    if values.get('data_collection_id') is not None:
        experiment.data_collection_id = values['data_collection_id']
    db.commit()
    db.refresh(experiment)
    return experiment


async def delete_experiment_db(db: Session, experiment_id: int) -> None:
    experiment = await get_experiment_by_id_db(db, experiment_id)
    db.delete(experiment)
    db.commit()


async def create_stop_logical_db(db: Session, condition: str, threshold: float) -> StopLogical:
    stop_logical = StopLogical(condition=condition, threshold=threshold)
    db.add(stop_logical)
    db.commit()
    db.refresh(stop_logical)
    return stop_logical


async def create_metrics_db(
    db: Session, name: str, query: str, target_value: Optional[float] = None
) -> Metrics:
    metrics = Metrics(name=name, query=query, target_value=target_value)
    db.add(metrics)
    db.commit()
    db.refresh(metrics)
    return metrics


async def create_data_collection_db(
    db: Session, collection_type: str, parameters: dict
) -> DataCollection:
    data_collection = DataCollection(collection_type=collection_type, parameters=parameters)
    db.add(data_collection)
    db.commit()
    db.refresh(data_collection)
    return data_collection
