from datetime import datetime
from typing import Optional

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.analytic import (
    get_area_average_conversion_db,
    get_campaign_statistic_db,
    get_goal_statistic_db,
    get_project_statistic_db,
    get_variant_statistic_db,
)
from crud.area import get_area_by_id_db
from crud.campaign import get_campaign_by_id_db
from crud.feature_flag import get_feature_flag_by_id_db
from crud.project import get_project_by_id_db, get_project_goal_by_id_db
from crud.variant import get_variant_by_id_db
from database import Session
from database.models import Area, Campaign, Project, ProjectGoal, Variant

from .middleware import Context
from .schemas.analytic import (
    AreaStatisticGet,
    CampaignStatisticGet,
    GoalStatisticGet,
    ProjectStatisticGet,
    VariantStatisticGet,
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


async def get_variant_statistic_route(
    info: strawberry.Info[Context],
    variant_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> VariantStatisticGet:
    logger.info(f"Getting statistic for variant {variant_id}")
    db: Session = info.context.session()

    variant: Optional[Variant] = await get_variant_by_id_db(db, variant_id)
    if variant is None:
        logger.error(f"Variant {variant_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Variant not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, variant.feature_flag.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view statistic for variant {variant_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_variant_statistic_db(db, variant_id, from_ts, to_ts, prev_from_ts, prev_to_ts)


async def get_campaign_statistic_route(
    info: strawberry.Info[Context],
    campaign_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> CampaignStatisticGet:
    logger.info(f"Getting statistic for campaign {campaign_id}")
    db: Session = info.context.session()
    campaign: Optional[Campaign] = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        logger.error(f"Campaign {campaign_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, campaign.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view statistic for campaign {campaign_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_campaign_statistic_db(
        db, campaign_id, from_ts, to_ts, prev_from_ts, prev_to_ts
    )


async def get_area_statistic_route(
    info: strawberry.Info[Context],
    area_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> AreaStatisticGet:
    logger.info(f"Getting statistic for area {area_id}")
    db: Session = info.context.session()
    area: Optional[Area] = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view statistic for area {area_id}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_area_average_conversion_db(
        db, area_id, from_ts, to_ts, prev_from_ts, prev_to_ts
    )


async def get_project_statistic_route(
    info: strawberry.Info[Context],
    project_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> ProjectStatisticGet:
    logger.info(f"Getting statistic for project {project_id}")
    db: Session = info.context.session()
    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to view statistic for project {project_id}"
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_project_statistic_db(db, project_id, from_ts, to_ts, prev_from_ts, prev_to_ts)


async def get_goal_statistic_route(
    info: strawberry.Info[Context],
    goal_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> GoalStatisticGet:
    logger.info(f"Getting statistic for goal {goal_id}")
    db: Session = info.context.session()
    goal: Optional[ProjectGoal] = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        logger.error(f"Goal {goal_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal not found')

    user: AuthPayload = await info.context.user()
    permission: bool = await read_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view statistic for goal {goal_id}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized')

    return await get_goal_statistic_db(db, goal_id, from_ts, to_ts, prev_from_ts, prev_to_ts)
