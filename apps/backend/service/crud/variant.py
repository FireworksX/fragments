from typing import List, Optional
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from database.models.models import Variant
from services.core.routes.schemas.feature_flag import VariantPatch, VariantPost, VariantStatus

from conf.settings import logger

async def recalculate_variants_rollout_percentage_db(
    db: Session,
    feature_flag_id: int,
    variant_id: int,
    old_variant_percentage: float,
    new_variant_percentage: float,
) -> None:
    logger.info(f"Recalculating variant rollout percentages for feature flag {feature_flag_id}")
    variants: List[Variant] = (
        db.query(Variant)
        .filter(Variant.feature_flag_id == feature_flag_id)
        .filter(Variant.id != variant_id)
        .filter(Variant.deleted_at.is_(None))
        .all()
    )
    if len(variants) == 0:
        logger.debug("No variants found to recalculate")
        return

    if new_variant_percentage == old_variant_percentage:
        # adding a variant
        logger.debug(f"Adding new variant with percentage {new_variant_percentage}")
        scale_factor = new_variant_percentage / float(100)
        for variant in variants:
            variant.rollout_percentage -= variant.rollout_percentage * scale_factor
            variant.rollout_percentage = round(variant.rollout_percentage)
            db.merge(variant)
    elif new_variant_percentage > old_variant_percentage:
        # increasing the percentage of a variant
        logger.debug(f"Increasing variant percentage from {old_variant_percentage} to {new_variant_percentage}")
        scale_factor = new_variant_percentage / float(100)
        for variant in variants:
            variant.rollout_percentage -= variant.rollout_percentage * scale_factor
            variant.rollout_percentage = round(variant.rollout_percentage)
            db.merge(variant)
    else:
        # decreasing the percentage of a variant
        logger.debug(f"Decreasing variant percentage from {old_variant_percentage} to {new_variant_percentage}")
        percents_to_add = (old_variant_percentage - new_variant_percentage) / float(len(variants))
        for variant in variants:
            variant.rollout_percentage += percents_to_add
            variant.rollout_percentage = round(variant.rollout_percentage)
            db.merge(variant)

    db.commit()
    logger.info("Successfully recalculated variant rollout percentages")


async def normalize_variants_rollout_percentage_db(db: Session, feature_flag_id: int) -> None:
    logger.info(f"Normalizing variant rollout percentages for feature flag {feature_flag_id}")
    variants = await get_variants_by_feature_flag_id_db(db, feature_flag_id)
    if len(variants) == 0:
        logger.debug("No variants found to normalize")
        return

    procent = 100 / float(len(variants))
    for variant in variants:
        variant.rollout_percentage = procent
        db.merge(variant)

    db.commit()
    logger.info("Successfully normalized variant rollout percentages")


async def create_variant_db(db: Session, variant: VariantPost) -> Variant:
    logger.info(f"Creating new variant for feature flag {variant.feature_flag_id}")
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

    logger.info(f"Successfully created variant {variant_db.id}")
    return variant_db


async def get_variant_by_id_db(db: Session, variant_id: int) -> Optional[Variant]:
    logger.debug(f"Fetching variant with id {variant_id}")
    return db.query(Variant).filter(Variant.id == variant_id, Variant.deleted_at.is_(None)).first()


async def get_variants_by_feature_flag_id_db(db: Session, feature_flag_id: int) -> List[Variant]:
    logger.debug(f"Fetching variants for feature flag {feature_flag_id}")
    return db.query(Variant).filter(
        Variant.feature_flag_id == feature_flag_id,
        Variant.deleted_at.is_(None)
    ).all()


async def update_variant_db(db: Session, v: VariantPatch) -> Variant:
    logger.info(f"Updating variant {v.id}")
    variant = await get_variant_by_id_db(db, v.id)
    if v.name is not None:
        logger.debug(f"Updating variant name to {v.name}")
        variant.name = v.name
    if v.rollout_percentage is not None:
        logger.debug(f"Updating variant rollout percentage to {v.rollout_percentage}")
        await recalculate_variants_rollout_percentage_db(
            db,
            variant.feature_flag_id,
            variant.id,
            variant.rollout_percentage,
            v.rollout_percentage,
        )
        variant.rollout_percentage = v.rollout_percentage
    if v.fragment is not None:
        logger.debug(f"Updating variant fragment to {v.fragment.fragment_id}")
        variant.fragment_id = v.fragment.fragment_id
        variant.props = v.fragment.props
    if v.status is not None:
        logger.debug(f"Updating variant status to {v.status}")
        variant.status = int(v.status.value)
        if variant.status == int(VariantStatus.INACTIVE.value):
            await recalculate_variants_rollout_percentage_db(
                db, variant.feature_flag_id, variant.id, variant.rollout_percentage, 0
            )

            variant.rollout_percentage = 0
    db.commit()
    db.refresh(variant)
    logger.info(f"Successfully updated variant {v.id}")
    return variant


async def delete_variant_db(db: Session, variant_id: int) -> None:
    logger.info(f"Deleting variant {variant_id}")
    variant = await get_variant_by_id_db(db, variant_id)
    await recalculate_variants_rollout_percentage_db(
        db, variant.feature_flag_id, variant.id, variant.rollout_percentage, 0
    )
    variant.deleted_at = datetime.now(timezone.utc)
    variant.status = int(VariantStatus.INACTIVE.value)
    db.merge(variant)
    db.commit()
    logger.info(f"Successfully deleted variant {variant_id}")
