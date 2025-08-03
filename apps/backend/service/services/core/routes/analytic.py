from datetime import datetime
from typing import Optional

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.analytic import (
    get_area_average_conversion_db,
    get_campaign_average_conversion_db,
    get_campaign_stats_db,
    get_goal_average_conversion_db,
    get_goal_stats_db,
    get_project_average_conversion_db,
    get_variant_average_conversion_db,
    get_variant_stats_db,
)
from crud.area import get_area_by_id_db
from crud.campaign import get_campaign_by_id_db
from crud.feature_flag import get_feature_flag_by_id_db
from crud.project import get_project_by_id_db, get_project_goal_by_id_db
from crud.variant import get_variant_by_id_db
from database import Session
from database.models import Area, Campaign, FeatureFlag, Project, ProjectGoal, Variant

from .middleware import Context
from .schemas.analytic import (
    AreaAverageConversionGet,
    CampaignAverageConversionGet,
    CampaignStatsGet,
    GoalAverageConversionGet,
    GoalStatsGet,
    ProjectAverageConversionGet,
    VariantAverageConversionGet,
    VariantStatsGet,
)
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


async def get_variant_stats_route(
    info: strawberry.Info[Context],
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> VariantStatsGet:
    logger.info(f"Getting variant stats for variant {variant_id}")
    db: Session = info.context.session()
    variant: Optional[Variant] = await get_variant_by_id_db(db, variant_id)
    if variant is None:
        logger.error(f"Variant {variant_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant not found')

    feature_flag: Optional[FeatureFlag] = await get_feature_flag_by_id_db(
        db, variant.feature_flag_id
    )
    if feature_flag is None:
        logger.error(f"Feature flag {variant.feature_flag_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, variant.feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view variant stats for variant {variant_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_variant_stats_db(db, variant.feature_flag_id, variant_id, from_ts, to_ts)


async def get_campaign_stats_route(
    info: strawberry.Info[Context],
    campaign_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> CampaignStatsGet:
    logger.info(f"Getting campaign stats for campaign {campaign_id}")
    db: Session = info.context.session()
    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view campaign stats for campaign {campaign_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_campaign_stats_db(db, campaign.area_id, campaign_id, from_ts, to_ts)


async def get_goal_stats_route(
    info: strawberry.Info[Context],
    goal_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> GoalStatsGet:
    logger.info(f"Getting goal stats for goal {goal_id}")
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()
    goal: Optional[ProjectGoal] = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        logger.error(f"Goal {goal_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal not found')

    permission: bool = await read_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view goal stats for goal {goal_id}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_goal_stats_db(db, goal_id, from_ts, to_ts)


async def get_variant_average_conversion_route(
    info: strawberry.Info[Context],
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> VariantAverageConversionGet:
    logger.info(f"Getting average variant conversion for variant {variant_id}")
    db: Session = info.context.session()

    variant: Optional[Variant] = await get_variant_by_id_db(db, variant_id)
    if variant is None:
        logger.error(f"Variant {variant_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, variant.feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view average variant conversion for variant {variant_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_variant_average_conversion_db(db, variant_id, from_ts, to_ts)


async def get_campaign_average_conversion_route(
    info: strawberry.Info[Context],
    campaign_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> CampaignAverageConversionGet:
    logger.info(f"Getting average campaign conversion for campaign {campaign_id}")
    db: Session = info.context.session()
    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view average campaign conversion for campaign {campaign_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_campaign_average_conversion_db(db, campaign_id, from_ts, to_ts)


async def get_area_average_conversion_route(
    info: strawberry.Info[Context],
    area_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> AreaAverageConversionGet:
    logger.info(f"Getting average area conversion for area {area_id}")
    db: Session = info.context.session()
    area: Optional[Area] = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view average area conversion for area {area_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_area_average_conversion_db(db, area_id, from_ts, to_ts)


async def get_project_average_conversion_route(
    info: strawberry.Info[Context],
    project_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> ProjectAverageConversionGet:
    logger.info(f"Getting average project conversion for project {project_id}")
    db: Session = info.context.session()
    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view average project conversion for project {project_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_project_average_conversion_db(db, project_id, from_ts, to_ts)


async def get_goal_average_conversion_route(
    info: strawberry.Info[Context],
    goal_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> GoalAverageConversionGet:
    logger.info(f"Getting average goal conversion for goal {goal_id}")
    db: Session = info.context.session()
    goal: Optional[ProjectGoal] = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        logger.error(f"Goal {goal_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view average goal conversion for goal {goal_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_goal_average_conversion_db(db, goal_id, from_ts, to_ts)
