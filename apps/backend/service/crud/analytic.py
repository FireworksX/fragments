from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.sql import case

from conf.settings import logger
from database.models import Area, Campaign, ClientHistory, Project, ProjectGoal, Variant
from services.core.routes.schemas.analytic import (
    AreaStatisticGet,
    CampaignStatisticGet,
    Detalization,
    DetalizationGraph,
    DetalizationGraphPoint,
    GoalStatisticGet,
    ProjectStatisticGet,
    StatisticGet,
    Trend,
    Value,
    VariantStatisticGet,
)
from services.core.routes.schemas.client import ClientHistoryEventType


async def get_goal_detalization_graph_db(
    db: Session,
    goal_id: int,
    from_ts: datetime,
    to_ts: datetime,
    variant_id: Optional[int] = None,
) -> DetalizationGraph:
    """
    Get goal achievement statistics with granularity based on time range:
    - 24 hours: by minute
    - 7 days: by hour
    - 28-31 days: by day
    """
    logger.info(f"Getting goal detalization graph for goal {goal_id} from {from_ts} to {to_ts}")

    time_diff = to_ts - from_ts
    detalization = Detalization.MINUTE
    # Determine granularity based on time range
    if time_diff <= timedelta(days=1):
        # By minute for 24 hours
        detalization = Detalization.MINUTE
        group_by = func.date_trunc('minute', ClientHistory.created_at)
        logger.debug('Using minute detalization')
    elif time_diff <= timedelta(days=7):
        # By hour for 7 days
        detalization = Detalization.HOUR
        group_by = func.date_trunc('hour', ClientHistory.created_at)
        logger.debug('Using hour detalization')
    elif timedelta(days=28) <= time_diff <= timedelta(days=31):
        # By day for month
        detalization = Detalization.DAY
        group_by = func.date_trunc('day', ClientHistory.created_at)
        logger.debug('Using day detalization')
    else:
        logger.error(f"Invalid time range {time_diff}. Must be 24h, 7d or 28-31d")
        raise ValueError('Invalid time range. Must be 24h, 7d or 28-31d')

    # Get total views and achievements per time bucket
    stats = (
        db.query(
            group_by.label('ts'),
            func.sum(
                case(
                    [(ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value), 1)],
                    else_=0,
                )
            ).label('views'),
            func.sum(
                case(
                    [
                        (
                            ClientHistory.event_type
                            == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
                            1,
                        )
                    ],
                    else_=0,
                )
            ).label('achieved'),
        )
        .filter(
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.goal_id == goal_id,
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .group_by('ts')
        .order_by('ts')
        .all()
    )

    graph_points = []
    all_views: int = 0
    all_achieved: int = 0
    for point in stats:
        conversion = point.achieved / point.views if point.views > 0 else 0.0
        graph_points.append(
            DetalizationGraphPoint(
                time=point.ts,
                value=Value(achieved=point.achieved, views=point.views, conversion=conversion),
            )
        )
        all_views += point.views
        all_achieved += point.achieved

    logger.info(
        f"Got {len(graph_points)} data points with {all_views} total views and {all_achieved} achievements"
    )

    return DetalizationGraph(
        detalization=detalization,
        points=graph_points,
    )


async def get_variant_statistic_db(
    db: Session,
    variant_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> VariantStatisticGet:
    """
    Get variant conversion rate by averaging conversions across all linked goals
    """
    logger.info(f"Getting variant statistics for variant {variant_id}")

    # Get variant and its linked goals
    variant: Optional[Variant] = db.query(Variant).filter(Variant.id == variant_id).first()
    if not variant:
        logger.error(f"No variant found with id {variant_id}")
        raise ValueError(f"No variant found with id {variant_id}")

    if not variant.fragment or not variant.fragment.linked_goals:
        logger.info(f"No fragment or linked goals found for variant {variant_id}")
        return VariantStatisticGet(
            variant_id=variant_id,
            variant_name=variant.name,
            current_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            prev_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            trend=Trend.FLAT,
            goals=[],
        )

    total_conversion = 0.0
    views = 0
    achieved = 0
    for goal in variant.fragment.linked_goals:
        # Get views for this goal
        views = (
            db.query(ClientHistory)
            .filter(
                ClientHistory.variant_id == variant_id,
                ClientHistory.goal_id == goal.id,
                ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
                ClientHistory.created_at >= from_ts,
                ClientHistory.created_at <= to_ts,
            )
            .count()
        )
        views += views
        if views == 0:
            logger.debug(f"No views for goal {goal.id}")
            continue

        # Get achievements for this goal
        achievements = (
            db.query(ClientHistory)
            .filter(
                ClientHistory.variant_id == variant_id,
                ClientHistory.goal_id == goal.id,
                ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
                ClientHistory.created_at >= from_ts,
                ClientHistory.created_at <= to_ts,
            )
            .count()
        )

        # Calculate conversion rate for this goal
        goal_conversion = (achievements / views) * 100 if views > 0 else 0.0
        logger.debug(f"Goal {goal.id} conversion: {goal_conversion}%")
        total_conversion += goal_conversion

    current_conversion = (
        total_conversion / len(variant.fragment.linked_goals)
        if variant.fragment.linked_goals
        else 0.0
    )
    logger.info(f"Current conversion for variant {variant_id}: {current_conversion}%")

    # Get previous day conversion
    prev_to = prev_to_ts
    prev_from = prev_from_ts
    prev_views_total = 0
    prev_achieved_total = 0
    for goal in variant.fragment.linked_goals:
        prev_views = (
            db.query(ClientHistory)
            .filter(
                ClientHistory.variant_id == variant_id,
                ClientHistory.goal_id == goal.id,
                ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
                ClientHistory.created_at >= prev_from,
                ClientHistory.created_at <= prev_to,
            )
            .count()
        )

        if prev_views == 0:
            logger.debug(f"No previous views for goal {goal.id}")
            continue

        prev_achievements = (
            db.query(ClientHistory)
            .filter(
                ClientHistory.variant_id == variant_id,
                ClientHistory.goal_id == goal.id,
                ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
                ClientHistory.created_at >= prev_from,
                ClientHistory.created_at <= prev_to,
            )
            .count()
        )

        prev_goal_conversion = (prev_achievements / prev_views) * 100 if prev_views > 0 else 0.0
        logger.debug(f"Previous goal {goal.id} conversion: {prev_goal_conversion}%")
        prev_views_total += prev_views
        prev_achieved_total += prev_achievements

    prev_conversion = prev_achieved_total / prev_views_total if prev_views_total > 0 else 0.0
    logger.info(f"Previous conversion for variant {variant_id}: {prev_conversion}%")

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN
    logger.info(f"Trend for variant {variant_id}: {trend}")

    goals = []
    for goal in variant.fragment.linked_goals:
        goals.append(
            await get_goal_statistic_db(
                db, goal.id, from_ts, to_ts, prev_from_ts, prev_to_ts, variant_id
            )
        )
    return VariantStatisticGet(
        variant_id=variant_id,
        variant_name=variant.name,
        current_statistic=StatisticGet(
            conversion=current_conversion,
            views=views,
            achieved=achieved,
        ),
        prev_statistic=StatisticGet(
            conversion=prev_conversion,
            views=prev_views_total,
            achieved=prev_achieved_total,
        ),
        trend=trend,
        goals=goals,
    )


async def get_campaign_statistic_db(
    db: Session,
    campaign_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> CampaignStatisticGet:
    """
    Get campaign conversion rate by averaging conversions across all variants
    """
    logger.info(f"Getting campaign statistics for campaign {campaign_id}")

    campaign: Optional[Campaign] = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        logger.error(f"No campaign found with id {campaign_id}")
        raise ValueError(f"No campaign found with id {campaign_id}")

    if not campaign.feature_flag or not campaign.feature_flag.variants:
        logger.info(f"No feature flag or variants found with id {campaign_id}")
        return CampaignStatisticGet(
            campaign_id=campaign_id,
            campaign_name=campaign.name,
            current_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            prev_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            trend=Trend.FLAT,
            variants=[],
        )

    total_conversion = 0.0
    current_views = 0
    current_achieved = 0
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_statistic_db(
            db, variant.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        total_conversion += variant_conversion.current_statistic.conversion * (
            variant.rollout_percentage / 100
        )
        current_views += variant_conversion.current_statistic.views
        current_achieved += variant_conversion.current_statistic.achieved

    current_conversion = (
        total_conversion / len(campaign.feature_flag.variants)
        if campaign.feature_flag.variants
        else 0.0
    )
    logger.info(f"Current conversion for campaign {campaign_id}: {current_conversion}%")

    # Get previous day conversion
    prev_views = 0
    prev_achieved = 0
    variants = []
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_statistic_db(
            db, variant.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        variants.append(variant_conversion)
        prev_views += variant_conversion.current_statistic.views
        prev_achieved += variant_conversion.current_statistic.achieved
    prev_conversion = prev_achieved / prev_views if prev_views > 0 else 0.0
    logger.info(f"Previous conversion for campaign {campaign_id}: {prev_conversion}%")

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN
    logger.info(f"Trend for campaign {campaign_id}: {trend}")

    # Return average conversion across all variants
    return CampaignStatisticGet(
        campaign_id=campaign_id,
        campaign_name=campaign.name,
        current_statistic=StatisticGet(
            conversion=current_conversion,
            views=current_views,
            achieved=current_achieved,
        ),
        prev_statistic=StatisticGet(
            conversion=prev_conversion,
            views=prev_views,
            achieved=prev_achieved,
        ),
        trend=trend,
        variants=variants,
    )


async def get_area_average_conversion_db(
    db: Session,
    area_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> AreaStatisticGet:
    """
    Get area conversion rate by averaging conversions across all campaigns
    """
    logger.info(f"Getting area statistics for area {area_id}")

    area: Optional[Area] = db.query(Area).filter(Area.id == area_id).first()
    if not area:
        logger.error(f"No area found with id {area_id}")
        raise ValueError(f"No area found with id {area_id}")

    if not area.campaigns:
        logger.info(f"No campaigns found for area {area_id}")
        return AreaStatisticGet(
            area_id=area_id,
            area_name=area.name,
            area_code=area.code,
            current_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            prev_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            trend=Trend.FLAT,
            campaigns=[],
        )

    current_views = 0
    current_achieved = 0
    # Get current period conversion
    campaigns = []
    total_conversion = 0.0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_statistic_db(
            db, campaign.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        current_views += campaign_conversion.current_statistic.views
        current_achieved += campaign_conversion.current_statistic.achieved
        campaigns.append(campaign_conversion)
        total_conversion += campaign_conversion.current_statistic.conversion
    current_conversion = total_conversion / len(area.campaigns) if area.campaigns else 0.0
    logger.info(f"Current conversion for area {area_id}: {current_conversion}%")

    # Get previous day conversion
    prev_views = 0
    prev_achieved = 0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_statistic_db(
            db, campaign.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        prev_views += campaign_conversion.current_statistic.views
        prev_achieved += campaign_conversion.current_statistic.achieved
    prev_conversion = prev_achieved / prev_views if prev_views > 0 else 0.0
    logger.info(f"Previous conversion for area {area_id}: {prev_conversion}%")

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN
    logger.info(f"Trend for area {area_id}: {trend}")

    return AreaStatisticGet(
        area_id=area_id,
        area_name=area.name,
        area_code=area.code,
        current_statistic=StatisticGet(
            conversion=current_conversion,
            views=current_views,
            achieved=current_achieved,
        ),
        prev_statistic=StatisticGet(
            conversion=prev_conversion,
            views=prev_views,
            achieved=prev_achieved,
        ),
        trend=trend,
        campaigns=campaigns,
    )


async def get_project_statistic_db(
    db: Session,
    project_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
) -> ProjectStatisticGet:
    """
    Get project conversion rate by averaging conversions across all areas
    """
    logger.info(f"Getting project statistics for project {project_id}")

    project: Optional[Project] = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        logger.error(f"No project found with id {project_id}")
        raise ValueError(f"No project found with id {project_id}")

    if not project.areas:
        logger.info(f"No areas found for project {project_id}")
        return ProjectStatisticGet(
            project_id=project_id,
            project_name=project.name,
            current_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            prev_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            trend=Trend.FLAT,
            areas=[],
        )

    current_views = 0
    current_achieved = 0
    # Get current period conversion
    areas = []
    total_conversion = 0.0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(
            db, area.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        current_views += area_conversion.current_statistic.views
        current_achieved += area_conversion.current_statistic.achieved
        areas.append(area_conversion)
        total_conversion += area_conversion.current_statistic.conversion
    current_conversion = total_conversion / len(project.areas) if project.areas else 0.0
    logger.info(f"Current conversion for project {project_id}: {current_conversion}%")

    # Get previous period conversion
    prev_views = 0
    prev_achieved = 0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(
            db, area.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        prev_views += area_conversion.current_statistic.views
        prev_achieved += area_conversion.current_statistic.achieved
    prev_conversion = prev_achieved / prev_views if prev_views > 0 else 0.0
    logger.info(f"Previous conversion for project {project_id}: {prev_conversion}%")

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN
    logger.info(f"Trend for project {project_id}: {trend}")

    return ProjectStatisticGet(
        project_id=project_id,
        project_name=project.name,
        current_statistic=StatisticGet(
            conversion=current_conversion,
            views=current_views,
            achieved=current_achieved,
        ),
        prev_statistic=StatisticGet(
            conversion=prev_conversion,
            views=prev_views,
            achieved=prev_achieved,
        ),
        trend=trend,
        areas=areas,
    )


async def get_goal_statistic_db(
    db: Session,
    goal_id: int,
    from_ts: datetime,
    to_ts: datetime,
    prev_from_ts: datetime,
    prev_to_ts: datetime,
    variant_id: Optional[int] = None,
) -> GoalStatisticGet:
    """
    Get goal conversion rate by averaging conversions across all variants
    """
    logger.info(f"Getting goal statistics for goal {goal_id}")

    goal: Optional[ProjectGoal] = db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).first()
    if not goal:
        logger.error(f"No goal found with id {goal_id}")
        raise ValueError(f"No goal found with id {goal_id}")

    # Get current period stats
    views = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    if views == 0:
        logger.info(f"No views found for goal {goal_id}")
        return GoalStatisticGet(
            goal_id=goal_id,
            goal_name=goal.name,
            current_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            prev_statistic=StatisticGet(
                conversion=0.0,
                views=0,
                achieved=0,
            ),
            trend=Trend.FLAT,
            detalization=DetalizationGraph(detalization=Detalization.MINUTE, points=[]),
        )

    achievements = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.goal_id == goal.id,
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    current_conversion = (achievements / views) * 100 if views > 0 else 0.0
    logger.info(f"Current conversion for goal {goal_id}: {current_conversion}%")

    # Get previous day stats
    prev_to = prev_to_ts
    prev_from = prev_from_ts

    prev_views = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
            ClientHistory.created_at >= prev_from,
            ClientHistory.created_at <= prev_to,
        )
        .count()
    )

    prev_achievements = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
            ClientHistory.created_at >= prev_from,
            ClientHistory.created_at <= prev_to,
        )
        .count()
    )

    prev_conversion = (prev_achievements / prev_views) * 100 if prev_views > 0 else 0.0
    logger.info(f"Previous conversion for goal {goal_id}: {prev_conversion}%")

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN
    logger.info(f"Trend for goal {goal_id}: {trend}")

    return GoalStatisticGet(
        goal_id=goal_id,
        goal_name=goal.name,
        current_statistic=StatisticGet(
            conversion=current_conversion,
            views=views,
            achieved=achievements,
        ),
        prev_statistic=StatisticGet(
            conversion=prev_conversion,
            views=prev_views,
            achieved=prev_achievements,
        ),
        trend=trend,
        detalization=await get_goal_detalization_graph_db(db, goal_id, from_ts, to_ts, variant_id),
    )
