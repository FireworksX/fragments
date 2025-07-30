from typing import List

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.analytics import get_variant_stats_db
from crud.variant import (
    create_variant_db,
    delete_variant_db,
    get_variant_by_id_db,
    get_variants_by_feature_flag_id_db,
    normalize_variants_rollout_percentage_db,
    update_variant_db,
)
from database import FeatureFlag, Session, Variant

from .feature_flag import get_feature_flag_by_id_db
from .fragment import fragment_db_to_fragment
from .middleware import Context
from .schemas.variant import FragmentVariantGet, VariantGet, VariantPatch, VariantPost
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


async def variant_db_to_variant(db: Session, variant: Variant) -> VariantGet:
    return VariantGet(
        id=variant.id,
        name=variant.name,
        rollout_percentage=variant.rollout_percentage,
        fragment=(
            FragmentVariantGet(
                fragment=fragment_db_to_fragment(variant.fragment), props=variant.props
            )
            if variant.fragment
            else None
        ),
        status=variant.status,
        stats=await get_variant_stats_db(db, variant.area_id, variant.id)
    )


async def variants_by_feature_flag_id(
    info: strawberry.Info[Context],
    feature_flag_id: int,
) -> List[VariantGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Getting variants for feature flag {feature_flag_id}")

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        logger.error(f"Feature flag {feature_flag_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view variants for feature flag {feature_flag_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view variants',
        )

    variants: List[Variant] = await get_variants_by_feature_flag_id_db(db, feature_flag_id)
    logger.info(f"Retrieved {len(variants)} variants for feature flag {feature_flag_id}")
    return [await variant_db_to_variant(db, v) for v in variants]


async def variant_by_id(info: strawberry.Info[Context], variant_id: int) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Getting variant {variant_id}")

    variant: Variant = await get_variant_by_id_db(db, variant_id)
    if not variant:
        logger.error(f"Variant {variant_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view variant {variant_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view variants',
        )

    return await variant_db_to_variant(db, variant)


async def create_variant_route(info: strawberry.Info[Context], v: VariantPost) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Creating new variant for feature flag {v.feature_flag_id}")

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, v.feature_flag_id)
    if not feature_flag:
        logger.error(f"Feature flag {v.feature_flag_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create variant for feature flag {v.feature_flag_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create variants',
        )

    variant: Variant = await create_variant_db(db, v)
    logger.info(f"Created variant {variant.id}")

    return await variant_db_to_variant(db, variant)


async def update_variant_route(info: strawberry.Info[Context], v: VariantPatch) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Updating variant {v.id}")

    variant: Variant = await get_variant_by_id_db(db, v.id)
    if not variant:
        logger.error(f"Variant {v.id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update variant {v.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change variant',
        )

    variant: Variant = await update_variant_db(db, v)
    logger.info(f"Updated variant {variant.id}")

    return await variant_db_to_variant(db, variant)


async def delete_variant_route(info: strawberry.Info[Context], variant_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Deleting variant {variant_id}")

    variant: Variant = await get_variant_by_id_db(db, variant_id)
    if not variant:
        logger.error(f"Variant {variant_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete variant {variant_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete variant',
        )

    await delete_variant_db(db, variant_id)
    logger.info(f"Deleted variant {variant_id}")


async def normalize_variants_rollout_percentage_route(
    info: strawberry.Info[Context], feature_flag_id: int
) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    logger.info(f"Normalizing variants rollout percentage for feature flag {feature_flag_id}")

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if not feature_flag:
        logger.error(f"Feature flag {feature_flag_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to normalize variants for feature flag {feature_flag_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to normalize variants rollout percentage',
        )

    await normalize_variants_rollout_percentage_db(db, feature_flag_id)
    logger.info(f"Normalized variants rollout percentage for feature flag {feature_flag_id}")
