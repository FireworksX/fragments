from typing import List, Optional

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
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
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def feature_flag_db_to_feature_flag(feature_flag: FeatureFlag) -> FeatureFlagGet:
    logger.debug(f"Converting feature flag {feature_flag.id} to schema")
    return FeatureFlagGet(
        id=feature_flag.id,
        name=feature_flag.name,
        description=feature_flag.description,
        release_condition=release_condition_db_to_release_condition(feature_flag.release_condition),
        rotation_type=RotationType(feature_flag.rotation_type),
        variants=[
            variant_db_to_variant(variant)
            for variant in sorted(feature_flag.variants, key=lambda x: x.id)
            if variant.deleted_at is None
        ],
    )


async def feature_flags(
    info: strawberry.Info[Context],
    project_id: int,
) -> List[FeatureFlagGet]:
    logger.info(f"Getting all feature flags for project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view feature flags in project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view feature flags',
        )

    feature_flags_db: List[FeatureFlag] = await get_feature_flags_db(db)
    logger.debug(f"Found {len(feature_flags_db)} feature flags")
    return [feature_flag_db_to_feature_flag(ff) for ff in feature_flags_db]


async def feature_flag_by_id(
    info: strawberry.Info[Context], feature_flag_id: int
) -> FeatureFlagGet:
    logger.info(f"Getting feature flag {feature_flag_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        logger.error(f"Feature flag {feature_flag_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view feature flag {feature_flag_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view feature flags',
        )

    return feature_flag_db_to_feature_flag(feature_flag)


async def create_feature_flag_route(
    info: strawberry.Info[Context], project_id: int, ff: FeatureFlagPost
) -> FeatureFlagGet:
    logger.info(f"Creating new feature flag in project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create feature flags in project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to create feature flags',
        )

    feature_flag: FeatureFlag = await create_feature_flag_db(db, project_id, ff)
    logger.info(f"Successfully created feature flag {feature_flag.id}")
    return feature_flag_db_to_feature_flag(feature_flag)


async def update_feature_flag_route(
    info: strawberry.Info[Context], ff: FeatureFlagPatch
) -> FeatureFlagGet:
    logger.info(f"Updating feature flag {ff.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, ff.id)
    if not feature_flag:
        logger.error(f"Feature flag {ff.id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update feature flag {ff.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change feature flag',
        )

    feature_flag = await update_feature_flag_db(
        db, feature_flag_id=ff.id, values=ff.__dict__, variants=ff.variants
    )
    logger.info(f"Successfully updated feature flag {feature_flag.id}")
    return feature_flag_db_to_feature_flag(feature_flag)


async def delete_feature_flag_route(info: strawberry.Info[Context], feature_flag_id: int) -> None:
    logger.info(f"Deleting feature flag {feature_flag_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        logger.error(f"Feature flag {feature_flag_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete feature flag {feature_flag_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete feature flag',
        )

    await delete_feature_flag_db(db, feature_flag_id)
    logger.info(f"Successfully deleted feature flag {feature_flag_id}")
