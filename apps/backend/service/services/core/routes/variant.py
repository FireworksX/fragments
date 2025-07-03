from typing import List

import strawberry
from fastapi import HTTPException, status

from crud.variant import (
    create_variant_db,
    delete_variant_db,
    get_variant_by_id_db,
    get_variants_by_feature_flag_id_db,
    update_variant_db,
)
from database import FeatureFlag, Session, Variant

from .feature_flag import get_feature_flag_by_id_db
from .fragment import fragment_db_to_fragment
from .middleware import Context
from .schemas.feature_flag import FragmentVariantGet, VariantGet, VariantPatch, VariantPost
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def variant_db_to_variant(variant: Variant) -> VariantGet:
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
        rotation_type=variant.rotation_type,
    )


async def variants_by_feature_flag_id(
    info: strawberry.Info[Context],
    feature_flag_id: int,
) -> List[VariantGet]:
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
            detail=f'User is not allowed to view variants',
        )

    variants: List[Variant] = await get_variants_by_feature_flag_id_db(db, feature_flag_id)
    return [variant_db_to_variant(v) for v in variants]


async def variant_by_id(info: strawberry.Info[Context], variant_id: int) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    variant: Variant = await get_variant_by_id_db(db, variant_id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view variants',
        )

    return variant_db_to_variant(variant)


async def create_variant_route(info: strawberry.Info[Context], v: VariantPost) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, v.feature_flag_id)
    if not feature_flag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag does not exist'
        )

    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create variants',
        )

    variant: Variant = await create_variant_db(db, v)

    return variant_db_to_variant(variant)


async def update_variant_route(info: strawberry.Info[Context], v: VariantPatch) -> VariantGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    variant: Variant = await get_variant_by_id_db(db, v.id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change variant',
        )

    variant: Variant = await update_variant_db(db, variant_id=v.id, values=v.__dict__)

    return variant_db_to_variant(variant)


async def delete_variant_route(info: strawberry.Info[Context], variant_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    variant: Variant = await get_variant_by_id_db(db, variant_id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant does not exist')

    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, variant.feature_flag_id)
    permission: bool = await write_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete variant',
        )

    await delete_variant_db(db, variant_id)
