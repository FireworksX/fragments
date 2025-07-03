from typing import List, Optional

from sqlalchemy.orm import Session

from database.models.models import Variant
from services.core.routes.schemas.feature_flag import VariantPost


async def recalculate_variants_rollout_percentage_db(
    db: Session, feature_flag_id: int, variant: Variant, new_variant_percentage: float
) -> None:
    variants = await get_variants_by_feature_flag_id_db(db, feature_flag_id)
    variants.remove(variant)
    scale_factor = new_variant_percentage / 100

    for variant in variants:
        variant.rollout_percentage = variant.rollout_percentage - (variant.rollout_percentage * scale_factor)
        db.merge(variant)

    db.commit()


async def create_variant_db(db: Session, variant: VariantPost) -> Variant:
    variant = Variant(
        feature_flag_id=variant.feature_flag_id,
        name=variant.name,
        rollout_percentage=variant.rollout_percentage,
        fragment_id=variant.fragment.fragment_id,
        props=variant.fragment.props,
        status=int(variant.status.value),
        rotation_type=int(variant.rotation_type.value),
    )
    db.add(variant)
    db.commit()
    await recalculate_variants_rollout_percentage_db(
        db, variant.feature_flag_id, variant, variant.rollout_percentage
    )
    db.refresh(variant)
    return variant


async def get_variant_by_id_db(db: Session, variant_id: int) -> Optional[Variant]:
    return db.query(Variant).filter(Variant.id == variant_id).first()


async def get_variants_by_feature_flag_id_db(db: Session, feature_flag_id: int) -> List[Variant]:
    return db.query(Variant).filter(Variant.feature_flag_id == feature_flag_id).all()


async def update_variant_db(db: Session, variant_id: int, values: dict) -> Variant:
    variant = await get_variant_by_id_db(db, variant_id)
    if values.get('name'):
        variant.name = values['name']
    if values.get('rollout_percentage') is not None:
        variant.rollout_percentage = values['rollout_percentage']
        await recalculate_variants_rollout_percentage_db(
            db, variant.feature_flag_id, variant, values['rollout_percentage']
        )
    if values.get('fragment_id') is not None:
        variant.fragment_id = values['fragment_id']
    if values.get('props') is not None:
        variant.props = values['props']
    if values.get('status') is not None:
        variant.status = int(values['status'])
    if values.get('rotation_type') is not None:
        variant.rotation_type = int(values['rotation_type'])
    db.commit()
    db.refresh(variant)
    return variant


async def delete_variant_db(db: Session, variant_id: int) -> None:
    variant = await get_variant_by_id_db(db, variant_id)
    db.delete(variant)
    db.commit()
