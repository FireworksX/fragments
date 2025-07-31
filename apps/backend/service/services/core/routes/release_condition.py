from typing import List, Optional

import strawberry
from fastapi import HTTPException, status

from crud.release_condition import (
    create_condition_db,
    create_condition_set_db,
    create_release_condition_db,
    delete_condition_db,
    delete_condition_set_db,
    delete_release_condition_db,
    get_condition_by_id_db,
    get_condition_set_by_id_db,
    get_condition_sets_by_release_condition_id_db,
    get_conditions_by_condition_set_id_db,
    get_release_condition_by_id_db,
    update_condition_db,
    update_condition_set_db,
    update_release_condition_db,
)
from database import Condition, ConditionSet, ReleaseCondition, Session
from services.core.routes.middleware import Context
from services.core.routes.schemas.release_condition import (
    ConditionGet,
    ConditionPatch,
    ConditionPost,
    ConditionSetGet,
    ConditionSetPatch,
    ConditionSetPost,
    FilterDeviceTypeGet,
    FilterGeoLocationGet,
    FilterGeoLocationsGet,
    FilterOSTypeGet,
    FilterPageGet,
    FilterTimeFrameGet,
    FilterTimeFramesGet,
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)
from services.core.routes.schemas.user import AuthPayload, RoleGet
from services.core.routes.utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def condition_db_to_condition(condition: Condition) -> ConditionGet:
    return ConditionGet(
        id=condition.id,
        name=condition.name,
        filter_data=(
            FilterPageGet(pages=[page.page for page in condition.page_filters])
            if condition.page_filters
            else (
                FilterDeviceTypeGet(
                    device_types=[dt.device_type for dt in condition.device_type_filters]
                )
                if condition.device_type_filters
                else (
                    FilterOSTypeGet(os_types=[os.os_type for os in condition.os_type_filters])
                    if condition.os_type_filters
                    else (
                        FilterTimeFramesGet(
                            time_frames=[
                                FilterTimeFrameGet(from_time=tf.from_time, to_time=tf.to_time)
                                for tf in condition.time_frame_filters
                            ]
                        )
                        if condition.time_frame_filters
                        else (
                            FilterGeoLocationsGet(
                                geo_locations=[
                                    FilterGeoLocationGet(
                                        country=gl.country, region=gl.region, city=gl.city
                                    )
                                    for gl in condition.geo_location_filters
                                ]
                            )
                            if condition.geo_location_filters
                            else None
                        )
                    )
                )
            )
        ),
    )


def condition_set_db_to_condition_set(condition_set: ConditionSet) -> ConditionSetGet:
    return ConditionSetGet(
        id=condition_set.id,
        name=condition_set.name,
        conditions=[condition_db_to_condition(c) for c in condition_set.conditions],
    )


def release_condition_db_to_release_condition(
    release_condition: ReleaseCondition,
) -> ReleaseConditionGet:
    return ReleaseConditionGet(
        id=release_condition.id,
        name=release_condition.name,
        condition_sets=[
            condition_set_db_to_condition_set(condition_set)
            for condition_set in release_condition.condition_sets
        ],
    )


async def release_condition_by_id(
    info: strawberry.Info[Context], release_condition_id: int
) -> ReleaseConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    release_condition: ReleaseCondition = await get_release_condition_by_id_db(
        db, release_condition_id
    )
    if not release_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Release condition does not exist'
        )

    permission: bool = await read_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view release conditions',
        )

    return release_condition_db_to_release_condition(release_condition)


async def create_release_condition_route(
    info: strawberry.Info[Context], rc: ReleaseConditionPost
) -> ReleaseConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    permission: bool = await write_permission(db, user.user.id, rc.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to create release conditions',
        )

    release_condition: ReleaseCondition = await create_release_condition_db(db, rc)

    return release_condition_db_to_release_condition(release_condition)


async def update_release_condition_route(
    info: strawberry.Info[Context], rc: ReleaseConditionPatch
) -> ReleaseConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    release_condition: ReleaseCondition = await get_release_condition_by_id_db(db, rc.id)
    if not release_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Release condition does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change release condition',
        )

    release_condition = await update_release_condition_db(db, release_condition_id=rc.id, rc=rc)

    return release_condition_db_to_release_condition(release_condition)


async def delete_release_condition_route(
    info: strawberry.Info[Context], release_condition_id: int
) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    release_condition: ReleaseCondition = await get_release_condition_by_id_db(
        db, release_condition_id
    )
    if not release_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Release condition does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete release condition',
        )

    await delete_release_condition_db(db, release_condition_id)


async def get_condition_sets_route(
    info: strawberry.Info[Context], release_condition_id: int
) -> List[ConditionSetGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    release_condition: ReleaseCondition = await get_release_condition_by_id_db(
        db, release_condition_id
    )
    if not release_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Release condition does not exist'
        )

    permission: bool = await read_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view condition sets',
        )

    condition_sets: List[ConditionSet] = await get_condition_sets_by_release_condition_id_db(
        db, release_condition_id
    )
    return [condition_set_db_to_condition_set(cs) for cs in condition_sets]


async def get_condition_set_route(
    info: strawberry.Info[Context], condition_set_id: int
) -> ConditionSetGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition_set: ConditionSet = await get_condition_set_by_id_db(db, condition_set_id)
    if not condition_set:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition set does not exist'
        )

    permission: bool = await read_permission(
        db, user.user.id, condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view condition set',
        )

    return condition_set_db_to_condition_set(condition_set)


async def create_condition_set_route(
    info: strawberry.Info[Context], release_condition_id: int, cs: ConditionSetPost
) -> ConditionSetGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    release_condition: ReleaseCondition = await get_release_condition_by_id_db(
        db, release_condition_id
    )
    if not release_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Release condition does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to create condition set',
        )

    condition_set: ConditionSet = await create_condition_set_db(db, release_condition_id, cs)

    return condition_set_db_to_condition_set(condition_set)


async def update_condition_set_route(
    info: strawberry.Info[Context], cs: ConditionSetPatch
) -> ConditionSetGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition_set: ConditionSet = await get_condition_set_by_id_db(db, cs.id)
    if not condition_set:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition set does not exist'
        )

    release_condition = condition_set.release_condition
    permission: bool = await write_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to update condition set',
        )

    condition_set = await update_condition_set_db(db, condition_set_id=cs.id, condition_set=cs)

    return condition_set_db_to_condition_set(condition_set)


async def delete_condition_set_route(info: strawberry.Info[Context], condition_set_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition_set: ConditionSet = await get_condition_set_by_id_db(db, condition_set_id)
    if not condition_set:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition set does not exist'
        )

    permission: bool = await write_permission(
        db, user.user.id, condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete condition set',
        )

    await delete_condition_set_db(db, condition_set_id)


async def get_conditions_route(
    info: strawberry.Info[Context], condition_set_id: int
) -> List[ConditionGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition_set: ConditionSet = await get_condition_set_by_id_db(db, condition_set_id)
    if not condition_set:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition set does not exist'
        )

    permission: bool = await read_permission(
        db, user.user.id, condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view conditions',
        )

    conditions: List[Condition] = await get_conditions_by_condition_set_id_db(db, condition_set_id)
    return [condition_db_to_condition(c) for c in conditions]


async def create_condition_route(
    info: strawberry.Info[Context], condition_set_id: int, condition: ConditionPost
) -> ConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition_set: ConditionSet = await get_condition_set_by_id_db(db, condition_set_id)
    if not condition_set:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition set does not exist'
        )

    permission: bool = await write_permission(
        db, user.user.id, condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to create condition',
        )

    return await create_condition_db(db, condition_set_id, condition)


async def get_condition_route(info: strawberry.Info[Context], condition_id: int) -> ConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition: Condition = await get_condition_by_id_db(db, condition_id)
    if not condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition does not exist'
        )

    permission: bool = await read_permission(
        db, user.user.id, condition.condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view condition',
        )

    return condition_db_to_condition(condition)


async def update_condition_route(info: strawberry.Info[Context], c: ConditionPatch) -> ConditionGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition: Condition = await get_condition_by_id_db(db, c.id)
    if not condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition does not exist'
        )

    release_condition = condition.condition_set.release_condition
    permission: bool = await write_permission(db, user.user.id, release_condition.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to update condition',
        )

    condition = await update_condition_db(db, condition_id=c.id, condition=c)

    return condition_db_to_condition(condition)


async def delete_condition_route(info: strawberry.Info[Context], condition_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    condition: Condition = await get_condition_by_id_db(db, condition_id)
    if not condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Condition does not exist'
        )

    permission: bool = await write_permission(
        db, user.user.id, condition.condition_set.release_condition.project_id
    )
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete condition',
        )

    await delete_condition_db(db, condition_id)
