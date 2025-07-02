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


async def create_release_condition_db(
    db: Session, release_condition: ReleaseConditionPost
) -> ReleaseCondition:
    release_condition_db = ReleaseCondition(
        name=release_condition.name,
        description=release_condition.description,
        active=release_condition.active,
        archived=release_condition.archived,
        default=release_condition.default,
        created_at=release_condition.created_at,
        updated_at=release_condition.updated_at,
    )
    db.add(release_condition_db)
    db.commit()
    db.refresh(release_condition_db)
    for condition_set in release_condition.condition_sets:
        condition_set = await create_condition_set_db(db, condition_set)
    return release_condition_db


async def get_release_condition_by_id_db(
    db: Session, release_condition_id: int
) -> Optional[ReleaseCondition]:
    return db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).first()


async def get_release_conditions_db(db: Session) -> List[ReleaseCondition]:
    return db.query(ReleaseCondition).all()


async def create_condition_set_db(db: Session, condition_set: ConditionSetPost) -> ConditionSet:
    condition_set_db = ConditionSet(
        name=condition_set.name,
        release_condition_id=condition_set.release_condition_id,
    )
    for condition in condition_set.conditions:
        condition = await create_condition_db(db, condition)
    db.add(condition_set_db)
    db.commit()
    db.refresh(condition_set_db)
    return condition_set_db


async def update_release_condition_db(
    db: Session, release_condition_id: int, rc: ReleaseConditionPatch
) -> ReleaseCondition:
    release_condition = (
        db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).first()
    )
    if rc.name is not None:
        release_condition.name = rc.name
    if rc.condition_sets is not None:
        release_condition.condition_sets.clear()
        for condition_set in release_condition.condition_sets:
            condition_set = ConditionSet(
                name=condition_set.name,
                release_condition_id=release_condition.id,
            )
            db.add(condition_set)
            db.commit()
            for condition in condition_set.conditions:
                condition = await create_condition_db(db, condition)
    db.commit()
    db.refresh(release_condition)
    return release_condition


async def create_condition_db(db: Session, condition: ConditionPost) -> Condition:
    condition_db = Condition(
        name=condition.name,
        condition_set_id=condition.condition_set_id,
        filter_type=condition.filter_type,
    )
    if condition.filter_type == FilterType.PAGE:
        page_filter = PageFilter(
            page=condition.page,
        )
        db.add(page_filter)
        db.commit()
        condition_db.page_filter_id = page_filter.id
    elif condition.filter_type == FilterType.DEVICE_TYPE:
        device_type_filter = DeviceTypeFilter(
            device_type=condition.device_type,
        )
        db.add(device_type_filter)
        db.commit()
        condition_db.device_type_filter_id = device_type_filter.id
    elif condition.filter_type == FilterType.OS_TYPE:
        os_type_filter = OSTypeFilter(
            os_type=condition.os_type,
        )
        db.add(os_type_filter)
        db.commit()
        condition_db.os_type_filter_id = os_type_filter.id
    elif condition.filter_type == FilterType.TIME_FRAME:
        time_frame_filter = TimeFrameFilter(
            from_time=condition.time_frame.from_time,
            to_time=condition.time_frame.to_time,
        )
        db.add(time_frame_filter)
        db.commit()
        condition_db.time_frame_filter_id = time_frame_filter.id
    elif condition.filter_type == FilterType.GEO_LOCATION:
        geo_location_filter = GeoLocationFilter(
            country=condition.geo_location.country,
            region=condition.geo_location.region,
            city=condition.geo_location.city,
        )
        db.add(geo_location_filter)
        db.commit()
        condition_db.geo_location_filter_id = geo_location_filter.id
    db.add(condition_db)
    db.commit()
    db.refresh(condition_db)
    return condition_db


async def update_condition_set_db(
    db: Session, condition_set_id: int, condition_set: ConditionSetPatch
) -> ConditionSet:
    condition_set = db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).first()
    if condition_set.name is not None:
        condition_set.name = condition_set.name
    if condition_set.conditions is not None:
        condition_set.conditions.clear()
        for condition in condition_set.conditions:
            condition = await create_condition_db(db, condition.id, condition)
    db.commit()
    db.refresh(condition_set)
    return condition_set


async def update_condition_db(
    db: Session, condition_id: int, condition: ConditionPatch
) -> Condition:
    condition = db.query(Condition).filter(Condition.id == condition_id).first()
    if condition.name is not None:
        condition.name = condition.name
    if condition.filter_type is not None:
        if condition.filter_type == FilterType.PAGE:
            page_filter = PageFilter(
                page=condition.page,
            )
            db.add(page_filter)
            db.commit()
            condition.page_filter_id = page_filter.id
        elif condition.filter_type == FilterType.DEVICE_TYPE:
            device_type_filter = DeviceTypeFilter(
                device_type=condition.device_type,
            )
            db.add(device_type_filter)
            db.commit()
            condition.device_type_filter_id = device_type_filter.id
        elif condition.filter_type == FilterType.OS_TYPE:
            os_type_filter = OSTypeFilter(
                os_type=condition.os_type,
            )
            db.add(os_type_filter)
            db.commit()
            condition.os_type_filter_id = os_type_filter.id
        elif condition.filter_type == FilterType.TIME_FRAME:
            time_frame_filter = TimeFrameFilter(
                from_time=condition.time_frame.from_time,
                to_time=condition.time_frame.to_time,
            )
            db.add(time_frame_filter)
            db.commit()
            condition.time_frame_filter_id = time_frame_filter.id
        elif condition.filter_type == FilterType.GEO_LOCATION:
            geo_location_filter = GeoLocationFilter(
                country=condition.geo_location.country,
                region=condition.geo_location.region,
                city=condition.geo_location.city,
            )
            db.add(geo_location_filter)
            db.commit()
            condition.geo_location_filter_id = geo_location_filter.id
    db.commit()
    db.refresh(condition)
    return condition


async def delete_release_condition_db(db: Session, release_condition_id: int) -> None:
    db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).delete()
    db.commit()


async def delete_condition_set_db(db: Session, condition_set_id: int) -> None:
    db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).delete()
    db.commit()


async def delete_condition_db(db: Session, condition_id: int) -> None:
    db.query(Condition).filter(Condition.id == condition_id).delete()
    db.commit()


async def get_condition_by_id_db(db: Session, condition_id: int) -> Optional[Condition]:
    return db.query(Condition).filter(Condition.id == condition_id).first()


async def get_condition_set_by_id_db(db: Session, condition_set_id: int) -> Optional[ConditionSet]:
    return db.query(ConditionSet).filter(ConditionSet.id == condition_set_id).first()


async def get_condition_sets_by_release_condition_id_db(
    db: Session, release_condition_id: int
) -> List[ConditionSet]:
    return (
        db.query(ConditionSet)
        .filter(ConditionSet.release_condition_id == release_condition_id)
        .all()
    )


async def get_conditions_by_condition_set_id_db(
    db: Session, condition_set_id: int
) -> List[Condition]:
    return db.query(Condition).filter(Condition.condition_set_id == condition_set_id).all()
