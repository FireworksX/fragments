from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import FeatureFlag, Variant
from services.core.routes.schemas.feature_flag import FeatureFlagPost, VariantPost


async def create_feature_flag_db(db: Session, feature_flag: FeatureFlagPost) -> FeatureFlag:
    feature_flag = FeatureFlag(
        name=feature_flag.name,
        description=feature_flag.description,
        release_condition_id=feature_flag.release_condition.id,
    )
    db.add(feature_flag)
    db.commit()
    db.refresh(feature_flag)
    for variant in feature_flag.variants:
        variant = Variant(
            name=variant.name,
            rollout_percentage=variant.rollout_percentage,
            fragment_id=variant.fragment_id,
        )
        db.add(variant)
        db.commit()
        db.refresh(variant)
    return feature_flag


async def get_feature_flag_by_id_db(db: Session, feature_flag_id: int) -> Optional[FeatureFlag]:
    return db.query(FeatureFlag).filter(FeatureFlag.id == feature_flag_id).first()


async def get_feature_flag_by_name_db(db: Session, name: str) -> Optional[FeatureFlag]:
    return db.query(FeatureFlag).filter(FeatureFlag.name == name).first()


async def get_feature_flags_db(db: Session) -> List[FeatureFlag]:
    return db.query(FeatureFlag).all()


async def update_feature_flag_db(
    db: Session, feature_flag_id: int, values: dict, variants: Optional[List[VariantPost]]
) -> FeatureFlag:
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if values.get('name'):
        feature_flag.name = values['name']
    if values.get('description') is not None:
        feature_flag.description = values['description']
    if values.get('release_condition_id'):
        feature_flag.release_condition_id = values['release_condition_id']
    if variants is not None:
        feature_flag.variants.clear()
        for variant in variants:
            variant = await create_variant_db(db, feature_flag_id, variant)
            db.add(variant)
        db.commit()
    db.commit()
    db.refresh(feature_flag)
    return feature_flag


async def delete_feature_flag_db(db: Session, feature_flag_id: int) -> None:
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    db.delete(feature_flag)
    db.commit()


async def create_variant_db(db: Session, feature_flag_id: int, variant: VariantPost) -> Variant:
    variant = Variant(
        feature_flag_id=feature_flag_id,
        name=variant.name,
        rollout_percentage=variant.rollout_percentage,
        fragment_id=variant.fragment_id,
    )
    db.add(variant)
    db.commit()
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
    if values.get('fragment_id') is not None:
        variant.fragment_id = values['fragment_id']
    db.commit()
    db.refresh(variant)
    return variant


async def delete_variant_db(db: Session, variant_id: int) -> None:
    variant = await get_variant_by_id_db(db, variant_id)
    db.delete(variant)
    db.commit()
