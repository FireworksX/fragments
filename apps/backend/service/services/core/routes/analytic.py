from datetime import datetime
from typing import Optional

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.analytics import get_campaign_stats_db, get_goal_stats_db, get_variant_stats_db
from crud.campaign import get_campaign_by_id_db
from crud.feature_flag import get_feature_flag_by_id_db
from crud.project import get_project_goal_by_id_db
from database import Session
from database.models import Campaign, FeatureFlag, ProjectGoal

from .middleware import Context
from .schemas.analytic import CampaignStatsGet, GoalStatsGet, VariantStatsGet
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
    feature_flag_id: int,
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> VariantStatsGet:
    logger.info(
        f"Getting variant stats for feature flag {feature_flag_id} and variant {variant_id}"
    )
    db: Session = info.context.session()
    feature_flag: FeatureFlag = await get_feature_flag_by_id_db(db, feature_flag_id)
    if feature_flag is None:
        logger.error(f"Feature flag {feature_flag_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Feature flag not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view variant stats for feature flag {feature_flag_id} and variant {variant_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_variant_stats_db(db, feature_flag_id, variant_id, from_ts, to_ts)


async def get_campaign_stats_route(
    info: strawberry.Info[Context],
    area_id: int,
    campaign_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> CampaignStatsGet:
    logger.info(f"Getting campaign stats for area {area_id} and campaign {campaign_id}")
    db: Session = info.context.session()
    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view campaign stats for area {area_id} and campaign {campaign_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_campaign_stats_db(db, area_id, campaign_id, from_ts, to_ts)


async def get_goal_stats_route(
    info: strawberry.Info[Context],
    goal_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> GoalStatsGet:
    logger.info(f"Getting goal stats for goal {goal_id}")
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()
    goal: ProjectGoal = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        logger.error(f"Goal {goal_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal not found')

    permission: bool = await read_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view goal stats for goal {goal_id}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_goal_stats_db(db, goal_id, from_ts, to_ts)
