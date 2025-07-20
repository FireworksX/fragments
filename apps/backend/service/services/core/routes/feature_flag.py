from typing import List, Optional

import strawberry
from fastapi import HTTPException, status

from crud.feature_flag import (
    create_feature_flag_db,
    delete_feature_flag_db,
    get_feature_flag_by_id_db,
    get_feature_flags_db,
    update_feature_flag_db,
)
from database import FeatureFlag, Session

from .middleware import Context
from .release_condition import release_condition_db_to_release_condition
from .schemas.feature_flag import FeatureFlagGet, FeatureFlagPatch, FeatureFlagPost, RotationType
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project
from .variant import variant_db_to_variant


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def feature_flag_db_to_feature_flag(feature_flag: FeatureFlag) -> FeatureFlagGet:
    return FeatureFlagGet(
        id=feature_flag.id,
        name=feature_flag.name,
        description=feature_flag.description,
        release_condition=release_condition_db_to_release_condition(feature_flag.release_condition),
        rotation_type=RotationType(feature_flag.rotation_type),
        variants=[variant_db_to_variant(variant) for variant in feature_flag.variants if variant.deleted_at is None],
    )


async def feature_flags(
    info: strawberry.Info[Context],
    project_id: int,
) -> List[FeatureFlagGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view feature flags',
        )

    feature_flags: List[FeatureFlag] = await get_feature_flags_db(db)
    return [feature_flag_db_to_feature_flag(ff) for ff in feature_flags]


async def feature_flag_by_id(
    info: strawberry.Info[Context], feature_flag_id: int
) -> FeatureFlagGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view feature flags',
        )

    return feature_flag_db_to_feature_flag(feature_flag)


async def create_feature_flag_route(
    info: strawberry.Info[Context], project_id: int, ff: FeatureFlagPost
) -> FeatureFlagGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create feature flags',
        )

    feature_flag: FeatureFlag = await create_feature_flag_db(db, project_id, ff)

    return feature_flag_db_to_feature_flag(feature_flag)


async def update_feature_flag_route(
    info: strawberry.Info[Context], ff: FeatureFlagPatch
) -> FeatureFlagGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, ff.id)
    if not feature_flag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change feature flag',
        )

    feature_flag: FeatureFlag = await update_feature_flag_db(
        db, feature_flag_id=ff.id, values=ff.__dict__, variants=ff.variants
    )

    return feature_flag_db_to_feature_flag(feature_flag)


async def delete_feature_flag_route(info: strawberry.Info[Context], feature_flag_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete feature flag',
        )

    await delete_feature_flag_db(db, feature_flag_id)
