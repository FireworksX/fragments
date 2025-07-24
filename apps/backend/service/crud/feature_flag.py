from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from database.models import FeatureFlag, Variant
from services.core.routes.schemas.feature_flag import FeatureFlagPost, VariantPost

from .release_condition import create_release_condition_db
from .variant import create_variant_db


async def create_feature_flag_db(
    db: Session, project_id: int, feature_flag: FeatureFlagPost
) -> FeatureFlag:
    logger.info(f"Creating feature flag with name {feature_flag.name}")
    existing_feature_flag = await get_feature_flag_by_name_db(db, feature_flag.name)
    if existing_feature_flag:
        logger.error(f"Feature flag with name {feature_flag.name} already exists")
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
    logger.debug(f"Created feature flag {feature_flag_db.id}")
    return feature_flag_db


async def get_feature_flag_by_id_db(db: Session, feature_flag_id: int) -> Optional[FeatureFlag]:
    logger.info(f"Getting feature flag by id {feature_flag_id}")
    feature_flag = (
        db.query(FeatureFlag)
        .filter(FeatureFlag.id == feature_flag_id, FeatureFlag.deleted_at.is_(None))
        .first()
    )
    if feature_flag:
        logger.debug(f"Found feature flag {feature_flag.id}")
    else:
        logger.debug(f"Feature flag {feature_flag_id} not found")
    return feature_flag


async def get_feature_flag_by_name_db(db: Session, name: str) -> Optional[FeatureFlag]:
    logger.info(f"Getting feature flag by name {name}")
    feature_flag = (
        db.query(FeatureFlag)
        .filter(FeatureFlag.name == name, FeatureFlag.deleted_at.is_(None))
        .first()
    )
    if feature_flag:
        logger.debug(f"Found feature flag {feature_flag.id}")
    else:
        logger.debug(f"Feature flag {name} not found")
    return feature_flag


async def get_feature_flags_db(db: Session) -> List[FeatureFlag]:
    logger.info('Getting all feature flags')
    feature_flags = db.query(FeatureFlag).filter(FeatureFlag.deleted_at.is_(None)).all()
    logger.debug(f"Found {len(feature_flags)} feature flags")
    return feature_flags


async def update_feature_flag_db(
    db: Session, feature_flag_id: int, values: dict, variants: Optional[List[VariantPost]]
) -> FeatureFlag:
    logger.info(f"Updating feature flag {feature_flag_id}")
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if values.get('name'):
        logger.debug(f"Updating name to {values['name']}")
        existing_feature_flag = await get_feature_flag_by_name_db(db, values['name'])
        if existing_feature_flag:
            logger.error(f"Feature flag with name {values['name']} already exists")
            raise ValueError(f"Feature flag with name {values['name']} already exists")
        feature_flag.name = values['name']
    if values.get('description') is not None:
        logger.debug(f"Updating description")
        feature_flag.description = values['description']
    if values.get('release_condition_id'):
        logger.debug(f"Updating release condition to {values['release_condition_id']}")
        feature_flag.release_condition_id = values['release_condition_id']
    if values.get('rotation_type'):
        logger.debug(f"Updating rotation type to {values['rotation_type']}")
        feature_flag.rotation_type = int(values['rotation_type'].value)
    if variants is not None:
        logger.debug(f"Updating variants")
        feature_flag.variants.clear()
        for variant in variants:
            variant = await create_variant_db(db, variant)
    db.commit()
    db.refresh(feature_flag)
    logger.debug(f"Updated feature flag {feature_flag.id}")
    return feature_flag


async def delete_feature_flag_db(db: Session, feature_flag_id: int) -> None:
    logger.info(f"Deleting feature flag {feature_flag_id}")
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if feature_flag:
        feature_flag.deleted_at = datetime.now(timezone.utc)
        db.merge(feature_flag)
        db.commit()
        logger.debug(f"Deleted feature flag {feature_flag_id}")
