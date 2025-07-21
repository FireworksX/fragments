from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import (
    Condition,
    ConditionSet,
    DeviceTypeFilter,
    GeoLocationFilter,
    OSTypeFilter,
    PageFilter,
    ReleaseCondition,
    TimeFrameFilter,
)
from services.core.routes.schemas.release_condition import (
    ConditionPatch,
    ConditionPost,
    ConditionSetPatch,
    ConditionSetPost,
    FilterType,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)

from conf.settings import logger


async def create_release_condition_db(
    db: Session, release_condition: ReleaseConditionPost
) -> ReleaseCondition:
    logger.info(f"Creating release condition with name: {release_condition.name}")
    release_condition_db = ReleaseCondition(
        name=release_condition.name,
        project_id=release_condition.project_id,
    )
    db.add(release_condition_db)
    db.commit()
    db.refresh(release_condition_db)
    for condition_set in release_condition.condition_sets:
        condition_set = await create_condition_set_db(db, release_condition_db.id, condition_set)
    db.refresh(release_condition_db)
    logger.info(f"Created release condition with id: {release_condition_db.id}")
    return release_condition_db


async def get_release_condition_by_id_db(
    db: Session, release_condition_id: int
) -> Optional[ReleaseCondition]:
    logger.info(f"Getting release condition with id: {release_condition_id}")
    return db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).first()


async def get_release_conditions_db(db: Session) -> List[ReleaseCondition]:
    logger.info("Getting all release conditions")
    return db.query(ReleaseCondition).all()


async def create_condition_set_db(db: Session, release_condition_id: int, condition_set: ConditionSetPost) -> ConditionSet:
    logger.info(f"Creating condition set with name: {condition_set.name} for release condition: {release_condition_id}")
    condition_set_db = ConditionSet(
        name=condition_set.name,
        release_condition_id=release_condition_id,
    )
    db.add(condition_set_db)
    db.commit()
    db.refresh(condition_set_db)
    for condition in condition_set.conditions:
        condition = await create_condition_db(db, condition_set_db.id, condition)
    db.refresh(condition_set_db)
    logger.info(f"Created condition set with id: {condition_set_db.id}")
    return condition_set_db


async def update_release_condition_db(
    db: Session, release_condition_id: int, rc: ReleaseConditionPatch
) -> ReleaseCondition:
    logger.info(f"Updating release condition with id: {release_condition_id}")
    release_condition = (
        db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).first()
    )
    if rc.name is not None:
        release_condition.name = rc.name
    if rc.condition_sets is not None:
        release_condition.condition_sets.clear()
        for condition_set in rc.condition_sets:
            condition_set = await create_condition_set_db(db, release_condition.id, condition_set)
    db.commit()
    db.refresh(release_condition)
    logger.info(f"Updated release condition with id: {release_condition_id}")
    return release_condition


async def create_condition_db(db: Session, condition_set_id: int, condition: ConditionPost) -> Condition:
    logger.info(f"Creating condition with name: {condition.name} for condition set: {condition_set_id}")
    condition_db = Condition(
        name=condition.name,
        condition_set_id=condition_set_id
    )
    db.add(condition_db)
    db.commit()
    db.refresh(condition_db)
    if condition.filter_data.pages is not None:
        for page in condition.filter_data.pages:
            page_filter = PageFilter(
                page=page,
                condition_id=condition_db.id,
            )
            db.add(page_filter)
            db.commit()
            condition_db.page_filters.append(page_filter)
    elif condition.filter_data.device_types is not None:
        for device_type in condition.filter_data.device_types:
            device_type_filter = DeviceTypeFilter(
                device_type=int(device_type.value),
                condition_id=condition_db.id,
            )
            db.add(device_type_filter)
            db.commit()
            condition_db.device_type_filters.append(device_type_filter)
    elif condition.filter_data.os_types is not None:
        for os_type in condition.filter_data.os_types:
            os_type_filter = OSTypeFilter(
                os_type=int(os_type.value),
                condition_id=condition_db.id,
            )
            db.add(os_type_filter)
            db.commit()
            condition_db.os_type_filters.append(os_type_filter)
    elif condition.filter_data.time_frames is not None:
        for time_frame in condition.filter_data.time_frames:
            time_frame_filter = TimeFrameFilter(
                from_time=time_frame.from_time,
                to_time=time_frame.to_time,
                condition_id=condition_db.id,
            )
            db.add(time_frame_filter)
            db.commit()
            condition_db.time_frame_filters.append(time_frame_filter)
    elif condition.filter_data.geo_locations is not None:
        for geo_location in condition.filter_data.geo_locations:
            geo_location_filter = GeoLocationFilter(
                country=geo_location.country,
                region=geo_location.region,
                city=geo_location.city,
                condition_id=condition_db.id,
            )
            db.add(geo_location_filter)
            db.commit()
            condition_db.geo_location_filters.append(geo_location_filter)
    db.add(condition_db)
    db.commit()
    db.refresh(condition_db)
    logger.info(f"Created condition with id: {condition_db.id}")
    return condition_db


async def update_condition_set_db(
    db: Session, condition_set_id: int, condition_set: ConditionSetPatch
) -> ConditionSet:
    logger.info(f"Updating condition set with id: {condition_set_id}")
    condition_set = db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).first()
    if condition_set.name is not None:
        condition_set.name = condition_set.name
    if condition_set.conditions is not None:
        condition_set.conditions.clear()
        for condition in condition_set.conditions:
            condition = await create_condition_db(db, condition.id, condition)
    db.commit()
    db.refresh(condition_set)
    logger.info(f"Updated condition set with id: {condition_set_id}")
    return condition_set


async def update_condition_db(
    db: Session, condition_id: int, condition: ConditionPatch
) -> Condition:
    logger.info(f"Updating condition with id: {condition_id}")
    condition_db = db.query(Condition).filter(Condition.id == condition_id).first()
    if condition.name is not None:
        condition_db.name = condition.name
    if condition.filter_data.pages is not None:
        condition_db.page_filters.clear()
        condition_db.device_type_filters.clear()
        condition_db.os_type_filters.clear()
        condition_db.time_frame_filters.clear()
        condition_db.geo_location_filters.clear()
        for page in condition.filter_data.pages:
            page_filter = PageFilter(
                page=page,
                condition_id=condition_db.id,
            )
            db.add(page_filter)
            db.commit()
            condition_db.page_filters.append(page_filter)
    elif condition.filter_data.device_types is not None:
        condition_db.page_filters.clear()
        condition_db.device_type_filters.clear()
        condition_db.os_type_filters.clear()
        condition_db.time_frame_filters.clear()
        condition_db.geo_location_filters.clear()
        for device_type in condition.filter_data.device_types:
            device_type_filter = DeviceTypeFilter(
                device_type=int(device_type.value),
                condition_id=condition_db.id,
            )
            db.add(device_type_filter)
            db.commit()
            condition_db.device_type_filters.append(device_type_filter)
    elif condition.filter_data.os_types is not None:
        condition_db.page_filters.clear()
        condition_db.device_type_filters.clear()
        condition_db.os_type_filters.clear()
        condition_db.time_frame_filters.clear()
        condition_db.geo_location_filters.clear()
        for os_type in condition.filter_data.os_types:
            os_type_filter = OSTypeFilter(
                os_type=int(os_type.value),
                condition_id=condition_db.id,
            )
            db.add(os_type_filter)
            db.commit()
            condition_db.os_type_filters.append(os_type_filter)
    elif condition.filter_data.time_frames is not None:
        condition_db.page_filters.clear()
        condition_db.device_type_filters.clear()
        condition_db.os_type_filters.clear()
        condition_db.time_frame_filters.clear()
        condition_db.geo_location_filters.clear()
        for time_frame in condition.filter_data.time_frames:
            time_frame_filter = TimeFrameFilter(
                from_time=time_frame.from_time,
                to_time=time_frame.to_time,
                condition_id=condition_db.id,
            )
            db.add(time_frame_filter)
            db.commit()
            condition_db.time_frame_filters.append(time_frame_filter)
    elif condition.filter_data.geo_locations is not None:
        condition_db.page_filters.clear()
        condition_db.device_type_filters.clear()
        condition_db.os_type_filters.clear()
        condition_db.time_frame_filters.clear()
        condition_db.geo_location_filters.clear()
        for geo_location in condition.filter_data.geo_locations:
            geo_location_filter = GeoLocationFilter(
                country=geo_location.country,
                region=geo_location.region,
                city=geo_location.city,
                condition_id=condition_db.id,
            )
            db.add(geo_location_filter)
            db.commit()
            condition_db.geo_location_filters.append(geo_location_filter)
    db.commit()
    db.refresh(condition_db)
    logger.info(f"Updated condition with id: {condition_id}")
    return condition_db


async def delete_release_condition_db(db: Session, release_condition_id: int) -> None:
    logger.info(f"Deleting release condition with id: {release_condition_id}")
    db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).delete()
    db.commit()
    logger.info(f"Deleted release condition with id: {release_condition_id}")


async def delete_condition_set_db(db: Session, condition_set_id: int) -> None:
    logger.info(f"Deleting condition set with id: {condition_set_id}")
    db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).delete()
    db.commit()
    logger.info(f"Deleted condition set with id: {condition_set_id}")


async def delete_condition_db(db: Session, condition_id: int) -> None:
    logger.info(f"Deleting condition with id: {condition_id}")
    db.query(Condition).filter(Condition.id == condition_id).delete()
    db.commit()
    logger.info(f"Deleted condition with id: {condition_id}")


async def get_condition_by_id_db(db: Session, condition_id: int) -> Optional[Condition]:
    logger.info(f"Getting condition with id: {condition_id}")
    return db.query(Condition).filter(Condition.id == condition_id).first()


async def get_condition_set_by_id_db(db: Session, condition_set_id: int) -> Optional[ConditionSet]:
    logger.info(f"Getting condition set with id: {condition_set_id}")
    return db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).first()


async def get_condition_sets_by_release_condition_id_db(
    db: Session, release_condition_id: int
) -> List[ConditionSet]:
    logger.info(f"Getting condition sets for release condition with id: {release_condition_id}")
    return (
        db.query(ConditionSet)
        .filter(ConditionSet.release_condition_id == release_condition_id)
        .all()
    )


async def get_conditions_by_condition_set_id_db(
    db: Session, condition_set_id: int
) -> List[Condition]:
    logger.info(f"Getting conditions for condition set with id: {condition_set_id}")
    return db.query(Condition).filter(Condition.condition_set_id == condition_set_id).all()
