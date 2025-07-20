from typing import List, Optional
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from database.models import FeatureFlag, Variant
from services.core.routes.schemas.feature_flag import FeatureFlagPost, VariantPost

from .release_condition import create_release_condition_db
from .variant import create_variant_db


async def create_feature_flag_db(
    db: Session, project_id: int, feature_flag: FeatureFlagPost
) -> FeatureFlag:
    existing_feature_flag = await get_feature_flag_by_name_db(db, feature_flag.name)
    if existing_feature_flag:
        raise ValueError(f"Feature flag with name {feature_flag.name} already exists")
    release_condition = await create_release_condition_db(db, feature_flag.release_condition)
    feature_flag_db = FeatureFlag(
        name=feature_flag.name,
        description=feature_flag.description,
        release_condition_id=release_condition.id,
        project_id=project_id,
        rotation_type=int(feature_flag.rotation_type.value),
    )
    db.add(feature_flag_db)
    db.commit()
    for variant in feature_flag.variants:
        await create_variant_db(db, variant)
    db.refresh(feature_flag_db)
    return feature_flag_db


async def get_feature_flag_by_id_db(db: Session, feature_flag_id: int) -> Optional[FeatureFlag]:
    return db.query(FeatureFlag).filter(
        FeatureFlag.id == feature_flag_id,
        FeatureFlag.deleted_at.is_(None)
    ).first()


async def get_feature_flag_by_name_db(db: Session, name: str) -> Optional[FeatureFlag]:
    return db.query(FeatureFlag).filter(
        FeatureFlag.name == name,
        FeatureFlag.deleted_at.is_(None)
    ).first()


async def get_feature_flags_db(db: Session) -> List[FeatureFlag]:
    return db.query(FeatureFlag).filter(FeatureFlag.deleted_at.is_(None)).all()


async def update_feature_flag_db(
    db: Session, feature_flag_id: int, values: dict, variants: Optional[List[VariantPost]]
) -> FeatureFlag:
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if values.get('name'):
        existing_feature_flag = await get_feature_flag_by_name_db(db, values['name'])
        if existing_feature_flag:
            raise ValueError(f"Feature flag with name {values['name']} already exists")
        feature_flag.name = values['name']
    if values.get('description') is not None:
        feature_flag.description = values['description']
    if values.get('release_condition_id'):
        feature_flag.release_condition_id = values['release_condition_id']
    if values.get('rotation_type'):
        feature_flag.rotation_type = int(values['rotation_type'].value)
    if variants is not None:
        feature_flag.variants.clear()
        for variant in variants:
            variant = await create_variant_db(db, variant)
    db.commit()
    db.refresh(feature_flag)
    return feature_flag


async def delete_feature_flag_db(db: Session, feature_flag_id: int) -> None:
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if feature_flag:
        feature_flag.deleted_at = datetime.now(timezone.utc)
        db.merge(feature_flag)
        db.commit()
