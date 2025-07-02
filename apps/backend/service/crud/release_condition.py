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
from services.core.routes.schemas.release_condition import FilterType, ReleaseConditionPost


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
        condition_set = ConditionSet(
            name=condition_set.name,
            release_condition_id=release_condition_db.id,
        )
        db.add(condition_set)
        db.commit()
        for condition in condition_set.conditions:
            condition = Condition(
                name=condition.name,
                condition_set_id=condition_set.id,
                filter_type=condition.filter_type,
            )
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
            db.add(condition)
            db.commit()
    return release_condition_db


async def get_release_condition_by_id_db(
    db: Session, release_condition_id: int
) -> Optional[ReleaseCondition]:
    return db.query(ReleaseCondition).filter(ReleaseCondition.id == release_condition_id).first()


async def get_release_conditions_db(db: Session) -> List[ReleaseCondition]:
    return db.query(ReleaseCondition).all()
