from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger
from database.models.models import Variant
from services.core.routes.schemas.variant import (
    FragmentVariantPatch,
    VariantPatch,
    VariantPost,
    VariantStatus,
)


def _update_variant_percentage(db: Session, variant: Variant, new_percentage: float) -> None:
    """Helper function to update variant percentage and log the change."""
    variant.rollout_percentage = round(new_percentage)
    logger.debug(
        f"Updating variant {variant.id} rollout percentage to {variant.rollout_percentage}"
    )
    db.merge(variant)


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
        .filter(Variant.status == int(VariantStatus.ACTIVE.value))
        .filter(Variant.id != variant_id)
        .all()
    )
    if len(variants) == 0:
        logger.debug('No variants found to recalculate')
        return

    if new_variant_percentage == old_variant_percentage:
        # adding a variant
        logger.debug(f"Adding new variant with percentage {new_variant_percentage}")
        scale_factor = new_variant_percentage / float(100)
        for variant in variants:
            new_percentage = variant.rollout_percentage - (
                variant.rollout_percentage * scale_factor
            )
            _update_variant_percentage(db, variant, new_percentage)
    elif new_variant_percentage > old_variant_percentage:
        # increasing the percentage of a variant
        logger.debug(
            f"Increasing variant percentage from {old_variant_percentage} to {new_variant_percentage}"
        )
        scale_factor = new_variant_percentage / float(100)
        for variant in variants:
            new_percentage = variant.rollout_percentage - (
                variant.rollout_percentage * scale_factor
            )
            _update_variant_percentage(db, variant, new_percentage)
    else:
        # decreasing the percentage of a variant
        logger.debug(
            f"Decreasing variant percentage from {old_variant_percentage} to {new_variant_percentage}"
        )
        percents_to_add = (old_variant_percentage - new_variant_percentage) / float(len(variants))
        for variant in variants:
            new_percentage = variant.rollout_percentage + percents_to_add
            _update_variant_percentage(db, variant, new_percentage)

    db.commit()
    logger.info('Successfully recalculated variant rollout percentages')


async def normalize_variants_rollout_percentage_db(db: Session, feature_flag_id: int) -> None:
    logger.info(f"Normalizing variant rollout percentages for feature flag {feature_flag_id}")
    variants: List[Variant] = (
        db.query(Variant)
        .filter(Variant.feature_flag_id == feature_flag_id)
        .filter(Variant.status == int(VariantStatus.ACTIVE.value))
        .all()
    )
    if len(variants) == 0:
        logger.debug('No variants found to normalize')
        return

    percent = 100 / float(len(variants))
    for variant in variants:
        variant.rollout_percentage = round(percent)
        logger.debug(
            f"Updating variant {variant.id} rollout percentage to {variant.rollout_percentage}"
        )
        db.merge(variant)

    db.commit()
    logger.info('Successfully normalized variant rollout percentages')


async def create_variant_db(db: Session, variant: VariantPost) -> Variant:
    logger.info(f"Creating new variant for feature flag {variant.feature_flag_id}")
    variants: List[Variant] = await get_variants_by_feature_flag_id_db(db, variant.feature_flag_id)
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
    return db.query(Variant).filter(Variant.id == variant_id).first()


async def get_variants_by_feature_flag_id_db(db: Session, feature_flag_id: int) -> List[Variant]:
    logger.debug(f"Fetching variants for feature flag {feature_flag_id}")
    return db.query(Variant).filter(Variant.feature_flag_id == feature_flag_id).all()


def _update_variant_name(variant: Variant, name: str) -> None:
    """Helper function to update variant name."""
    logger.debug(f"Updating variant name to {name}")
    variant.name = name


async def _update_variant_rollout_percentage(
    db: Session, variant: Variant, new_percentage: float
) -> None:
    """Helper function to update variant rollout percentage."""
    logger.debug(f"Updating variant rollout percentage to {new_percentage}")
    await recalculate_variants_rollout_percentage_db(
        db, variant.feature_flag_id, variant.id, variant.rollout_percentage, new_percentage
    )
    variant.rollout_percentage = new_percentage


def _update_variant_fragment(variant: Variant, fragment: FragmentVariantPatch) -> None:
    """Helper function to update variant fragment."""
    logger.debug(f"Updating variant fragment to {fragment.fragment_id}")
    if fragment.fragment_id is not None:
        variant.fragment_id = fragment.fragment_id
    if fragment.props is not None:
        variant.props = fragment.props


async def _update_variant_status(db: Session, variant: Variant, status: VariantStatus) -> None:
    """Helper function to update variant status."""
    logger.debug(f"Updating variant status to {status}")
    variant.status = int(status.value)
    if variant.status == int(VariantStatus.INACTIVE.value):
        await recalculate_variants_rollout_percentage_db(
            db, variant.feature_flag_id, variant.id, variant.rollout_percentage, 0
        )
        variant.rollout_percentage = 0


async def update_variant_db(db: Session, variant_db: Variant, v: VariantPatch) -> Variant:
    logger.info(f"Updating variant {variant_db.id}")

    if v.name is not None:
        _update_variant_name(variant_db, v.name)
    if v.rollout_percentage is not None:
        await _update_variant_rollout_percentage(db, variant_db, v.rollout_percentage)
    if v.fragment is not None:
        _update_variant_fragment(variant_db, v.fragment)
    if v.status is not None:
        await _update_variant_status(db, variant_db, v.status)

    db.commit()
    db.refresh(variant_db)
    logger.info(f"Successfully updated variant {variant_db.id}")
    return variant_db


async def delete_variant_db(db: Session, variant_db: Variant) -> None:
    logger.info(f"Deleting variant {variant_db.id}")
    await recalculate_variants_rollout_percentage_db(
        db, variant_db.feature_flag_id, variant_db.id, variant_db.rollout_percentage, 0
    )
    db.delete(variant_db)
    db.commit()
    logger.info(f"Successfully deleted variant {variant_db.id}")
