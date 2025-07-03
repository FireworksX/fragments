from typing import List, Optional

from sqlalchemy.orm import Session

from database.models import FeatureFlag, Variant
from services.core.routes.schemas.feature_flag import FeatureFlagPost, VariantPost

from .variant import create_variant_db
from .release_condition import create_release_condition_db


async def create_feature_flag_db(db: Session, project_id: int, feature_flag: FeatureFlagPost) -> FeatureFlag:
    release_condition = await create_release_condition_db(db, feature_flag.release_condition)
    feature_flag_db = FeatureFlag(
        name=feature_flag.name,
        description=feature_flag.description,
        release_condition_id=release_condition.id,
        project_id=project_id,
    )
    db.add(feature_flag_db)
    db.commit()
    for variant in feature_flag.variants:
        await create_variant_db(db, variant)
    db.refresh(feature_flag_db)
    return feature_flag_db


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
            variant = await create_variant_db(db, variant)
    db.commit()
    db.refresh(feature_flag)
    return feature_flag


async def delete_feature_flag_db(db: Session, feature_flag_id: int) -> None:
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    db.delete(feature_flag)
    db.commit()
