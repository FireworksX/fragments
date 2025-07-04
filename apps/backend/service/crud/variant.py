from typing import List, Optional

from sqlalchemy.orm import Session

from database.models.models import Variant
from services.core.routes.schemas.feature_flag import VariantPost


async def recalculate_variants_rollout_percentage_db(
    db: Session,
    feature_flag_id: int,
    variant_id: int,
    old_variant_percentage: float,
    new_variant_percentage: float,
) -> None:
    variants: List[Variant] = (
        db.query(Variant)
        .filter(Variant.feature_flag_id == feature_flag_id)
        .filter(Variant.id != variant_id)
        .all()
    )
    if len(variants) == 0:
        print('No variants to recalculate')
        return

    if new_variant_percentage == old_variant_percentage:
        # adding a variant
        print('Adding a variant')
        scale_factor = new_variant_percentage / float(100)
        print(f"Scale factor: {scale_factor}")
        for variant in variants:
            variant.rollout_percentage -= variant.rollout_percentage * scale_factor
            print(f"Variant: {variant.id} - {variant.rollout_percentage}")
            db.merge(variant)
    elif new_variant_percentage > old_variant_percentage:
        # increasing the percentage of a variant
        scale_factor = new_variant_percentage / float(100)
        for variant in variants:
            variant.rollout_percentage -= variant.rollout_percentage * scale_factor
            db.merge(variant)
    else:
        # decreasing the percentage of a variant
        percents_to_add = (old_variant_percentage - new_variant_percentage) / float(len(variants))
        for variant in variants:
            variant.rollout_percentage += percents_to_add
            db.merge(variant)

    db.commit()


async def normalize_variants_rollout_percentage_db(db: Session, feature_flag_id: int) -> None:
    variants = await get_variants_by_feature_flag_id_db(db, feature_flag_id)
    if len(variants) == 0:
        return

    procent = 100 / float(len(variants))
    for variant in variants:
        variant.rollout_percentage = procent
        db.merge(variant)

    db.commit()


async def create_variant_db(db: Session, variant: VariantPost) -> Variant:
    variants = await get_variants_by_feature_flag_id_db(db, variant.feature_flag_id)
    if len(variants) == 0:
        variant.rollout_percentage = 100

    variant_db = Variant(
        feature_flag_id=variant.feature_flag_id,
        name=variant.name,
        rollout_percentage=variant.rollout_percentage,
        fragment_id=variant.fragment.fragment_id,
        props=variant.fragment.props,
        status=int(variant.status.value),
    )
    db.add(variant_db)
    db.commit()
    db.refresh(variant_db)
    await recalculate_variants_rollout_percentage_db(
        db,
        variant.feature_flag_id,
        variant_db.id,
        variant_db.rollout_percentage,
        variant_db.rollout_percentage,
    )

    return variant_db


async def get_variant_by_id_db(db: Session, variant_id: int) -> Optional[Variant]:
    return db.query(Variant).filter(Variant.id == variant_id).first()


async def get_variants_by_feature_flag_id_db(db: Session, feature_flag_id: int) -> List[Variant]:
    return db.query(Variant).filter(Variant.feature_flag_id == feature_flag_id).all()


async def update_variant_db(db: Session, variant_id: int, values: dict) -> Variant:
    variant = await get_variant_by_id_db(db, variant_id)
    if values.get('name'):
        variant.name = values['name']
    if values.get('rollout_percentage') is not None:
        await recalculate_variants_rollout_percentage_db(
            db,
            variant.feature_flag_id,
            variant.id,
            variant.rollout_percentage,
            values['rollout_percentage'],
        )
        variant.rollout_percentage = values['rollout_percentage']
    if values.get('fragment_id') is not None:
        variant.fragment_id = values['fragment_id']
    if values.get('props') is not None:
        variant.props = values['props']
    if values.get('status') is not None:
        variant.status = int(values['status'])
    db.commit()
    db.refresh(variant)
    return variant


async def delete_variant_db(db: Session, variant_id: int) -> None:
    variant = await get_variant_by_id_db(db, variant_id)
    await recalculate_variants_rollout_percentage_db(
        db, variant.feature_flag_id, variant.id, variant.rollout_percentage, 0
    )
    db.delete(variant)
    db.commit()
