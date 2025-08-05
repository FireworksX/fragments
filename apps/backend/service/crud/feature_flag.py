from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from database.models import FeatureFlag
from services.core.routes.schemas.feature_flag import FeatureFlagPatch, FeatureFlagPost, VariantPost

from .release_condition import create_release_condition_db
from .variant import create_variant_db


async def _update_feature_flag_fields(
    db: Session, feature_flag: FeatureFlag, patch: FeatureFlagPatch
) -> None:
    """Update individual fields of a feature flag."""
    if patch.name:
        logger.debug(f"Updating name to {patch.name}")
        existing_feature_flag = await get_feature_flag_by_name_db(db, patch.name)
        if existing_feature_flag:
            logger.error(f"Feature flag with name {patch.name} already exists")
            raise ValueError(f"Feature flag with name {patch.name} already exists")
        feature_flag.name = patch.name

    if patch.description:
        logger.debug('Updating description')
        feature_flag.description = patch.description

    if patch.release_condition:
        logger.debug(f"Updating release condition to {patch.release_condition}")
        feature_flag.release_condition_id = patch.release_condition.id

    if patch.rotation_type:
        logger.debug(f"Updating rotation type to {patch.rotation_type}")
        feature_flag.rotation_type = int(patch.rotation_type.value)


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
    feature_flag = db.query(FeatureFlag).filter(FeatureFlag.id == feature_flag_id).first()
    if feature_flag:
        logger.debug(f"Found feature flag {feature_flag.id}")
    else:
        logger.debug(f"Feature flag {feature_flag_id} not found")
    return feature_flag


async def get_feature_flag_by_name_db(db: Session, name: str) -> Optional[FeatureFlag]:
    logger.info(f"Getting feature flag by name {name}")
    feature_flag = db.query(FeatureFlag).filter(FeatureFlag.name == name).first()
    if feature_flag:
        logger.debug(f"Found feature flag {feature_flag.id}")
    else:
        logger.debug(f"Feature flag {name} not found")
    return feature_flag


async def get_feature_flags_db(db: Session) -> List[FeatureFlag]:
    logger.info('Getting all feature flags')
    feature_flags = db.query(FeatureFlag).all()
    logger.debug(f"Found {len(feature_flags)} feature flags")
    return feature_flags


async def update_feature_flag_db(
    db: Session,
    feature_flag_db: FeatureFlag,
    patch: FeatureFlagPatch,
    variants: Optional[List[VariantPost]],
) -> FeatureFlag:
    logger.info(f"Updating feature flag {feature_flag_db.id}")
    await _update_feature_flag_fields(db, feature_flag_db, patch)

    if variants is not None:
        logger.debug('Updating variants')
        feature_flag_db.variants.clear()
        for variant in variants:
            await create_variant_db(db, variant)

    db.commit()
    db.refresh(feature_flag_db)
    logger.debug(f"Updated feature flag {feature_flag_db.id}")
    return feature_flag_db


async def delete_feature_flag_db(db: Session, feature_flag_id: int) -> None:
    logger.info(f"Deleting feature flag {feature_flag_id}")
    feature_flag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if feature_flag:
        db.delete(feature_flag)
        db.commit()
        logger.debug(f"Deleted feature flag {feature_flag_id}")
