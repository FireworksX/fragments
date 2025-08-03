from datetime import UTC, datetime, timedelta
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.sql import case

from conf.settings import logger
from database.models import Area, Campaign, ClientHistory, Project, ProjectGoal, Variant
from services.core.routes.schemas.analytic import (
    AreaAverageConversionGet,
    CampaignAverageConversionGet,
    CampaignStatsGet,
    GoalAverageConversionGet,
    GoalStatsGet,
    GraphPoint,
    ProjectAverageConversionGet,
    Trend,
    Value,
    VariantAverageConversionGet,
    VariantStatsGet,
)
from services.core.routes.schemas.client import ClientHistoryEventType


async def get_variant_stats_db(
    db: Session,
    feature_flag_id: int,
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> VariantStatsGet:
    """
    Get view statistics for a variant in an area between timestamps
    Returns VariantStatsGet

    Args:
        from_ts: Start timestamp, defaults to 24h ago
        to_ts: End timestamp, defaults to now
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    logger.debug(
        f"Getting stats for variant {variant_id} in feature flag {feature_flag_id} "
        f"from {from_ts} to {to_ts}"
    )

    # Get total views for all variants in this area
    total_views = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.feature_flag_id == feature_flag_id,
            ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    if total_views == 0:
        return VariantStatsGet(last_views=0, total_views=0, percentage=0.0)

    # Get views for this variant in the period
    views_period = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.feature_flag_id == feature_flag_id,
            ClientHistory.variant_id == variant_id,
            ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    percentage = (views_period / total_views) * 100

    logger.debug(
        f"Variant {variant_id} stats: views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return VariantStatsGet(last_views=views_period, total_views=total_views, percentage=percentage)


async def get_campaign_stats_db(
    db: Session,
    area_id: int,
    campaign_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> CampaignStatsGet:
    """
    Get view statistics for a campaign in an area
    Returns CampaignStatsGet
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    logger.debug(
        f"Getting stats for campaign {campaign_id} in area {area_id} " f"from {from_ts} to {to_ts}"
    )

    total_views = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.area_id == area_id,
            ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    if total_views == 0:
        return CampaignStatsGet(last_views=0, total_views=0, percentage=0.0)

    views_period = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.area_id == area_id,
            ClientHistory.campaign_id == campaign_id,
            ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    percentage = (views_period / total_views) * 100

    logger.debug(
        f"Campaign {campaign_id} stats: views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return CampaignStatsGet(last_views=views_period, total_views=total_views, percentage=percentage)


async def get_goal_stats_db(
    db: Session,
    goal_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> GoalStatsGet:
    """
    Get goal achievement statistics with granularity based on time range:
    - 24 hours: by minute
    - 7 days: by hour
    - 28-31 days: by day
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    time_diff = to_ts - from_ts

    # Determine granularity based on time range
    if time_diff <= timedelta(days=1):
        # By minute for 24 hours
        group_by = func.date_trunc('minute', ClientHistory.created_at)
    elif time_diff <= timedelta(days=7):
        # By hour for 7 days
        group_by = func.date_trunc('hour', ClientHistory.created_at)
    elif timedelta(days=28) <= time_diff <= timedelta(days=31):
        # By day for month
        group_by = func.date_trunc('day', ClientHistory.created_at)
    else:
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
            GraphPoint(x=point.ts, y=Value(achieved=point.achieved, conversion=conversion))
        )
        all_views += point.views
        all_achieved += point.achieved

    return GoalStatsGet(
        graph=graph_points,
        average_conversion=float(all_achieved) / all_views if all_views > 0 else 0.0,
        goal_achieved=all_achieved,
        goal_views=all_views,
    )


async def get_variant_average_conversion_db(
    db: Session,
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> VariantAverageConversionGet:
    """
    Get variant conversion rate by averaging conversions across all linked goals
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    # Get variant and its linked goals
    variant = db.query(Variant).filter(Variant.id == variant_id).first()
    if not variant or not variant.fragment.linked_goals:
        return VariantAverageConversionGet(
            variant_id=variant_id, conversion=0.0, trend=Trend.FLAT, goals=[]
        )

    total_conversion = 0.0
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

        if views == 0:
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
        total_conversion += goal_conversion

    current_conversion = (
        total_conversion / len(variant.fragment.linked_goals)
        if variant.fragment.linked_goals
        else 0.0
    )

    # Get previous day conversion
    prev_to = from_ts
    prev_from = prev_to - timedelta(hours=24)
    prev_total = 0.0
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
        prev_total += prev_goal_conversion

    prev_conversion = (
        prev_total / len(variant.fragment.linked_goals) if variant.fragment.linked_goals else 0.0
    )

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN

    goals = []
    for goal in variant.fragment.linked_goals:
        goals.append(await get_goal_average_conversion_db(db, goal.id, from_ts, to_ts))
    return VariantAverageConversionGet(
        variant_id=variant_id, conversion=current_conversion, trend=trend, goals=goals
    )


async def get_campaign_average_conversion_db(
    db: Session,
    campaign_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> CampaignAverageConversionGet:
    """
    Get campaign conversion rate by averaging conversions across all variants
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign or not campaign.feature_flag or not campaign.feature_flag.variants:
        return CampaignAverageConversionGet(
            campaign_id=campaign_id, conversion=0.0, trend=Trend.FLAT, variants=[]
        )

    total_conversion = 0.0
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_average_conversion_db(db, variant.id, from_ts, to_ts)
        total_conversion += variant_conversion.conversion
    current_conversion = (
        total_conversion / len(campaign.feature_flag.variants)
        if campaign.feature_flag.variants
        else 0.0
    )
    # Get previous day conversion
    prev_to = from_ts
    prev_from = prev_to - timedelta(hours=24)
    prev_total = 0.0
    variants = []
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_average_conversion_db(
            db, variant.id, prev_from, prev_to
        )
        variants.append(variant_conversion)
        prev_total += variant_conversion.conversion
    prev_conversion = (
        prev_total / len(campaign.feature_flag.variants) if campaign.feature_flag.variants else 0.0
    )
    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN

    # Return average conversion across all variants
    return CampaignAverageConversionGet(
        campaign_id=campaign_id, conversion=current_conversion, trend=trend, variants=variants
    )


async def get_area_average_conversion_db(
    db: Session,
    area_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> AreaAverageConversionGet:
    """
    Get area conversion rate by averaging conversions across all campaigns
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    area = db.query(Area).filter(Area.id == area_id).first()
    if not area or not area.campaigns:
        return AreaAverageConversionGet(
            area_id=area_id, conversion=0.0, trend=Trend.FLAT, campaigns=[]
        )

    # Get current period conversion
    campaigns = []
    total_conversion = 0.0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_average_conversion_db(
            db, campaign.id, from_ts, to_ts
        )
        campaigns.append(campaign_conversion)
        total_conversion += campaign_conversion.conversion
    current_conversion = total_conversion / len(area.campaigns) if area.campaigns else 0.0

    # Get previous day conversion
    prev_to = from_ts
    prev_from = prev_to - timedelta(hours=24)
    prev_total = 0.0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_average_conversion_db(
            db, campaign.id, prev_from, prev_to
        )
        prev_total += campaign_conversion.conversion
    prev_conversion = prev_total / len(area.campaigns) if area.campaigns else 0.0

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN

    return AreaAverageConversionGet(
        area_id=area_id, conversion=current_conversion, trend=trend, campaigns=campaigns
    )


async def get_project_average_conversion_db(
    db: Session,
    project_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> ProjectAverageConversionGet:
    """
    Get project conversion rate by averaging conversions across all areas
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project or not project.areas:
        return ProjectAverageConversionGet(
            project_id=project_id, conversion=0.0, trend=Trend.FLAT, areas=[]
        )

    # Get current period conversion
    areas = []
    total_conversion = 0.0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(db, area.id, from_ts, to_ts)
        areas.append(area_conversion)
        total_conversion += area_conversion.conversion
    current_conversion = total_conversion / len(project.areas) if project.areas else 0.0

    # Get previous day conversion
    prev_to = from_ts
    prev_from = prev_to - timedelta(hours=24)
    prev_total = 0.0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(db, area.id, prev_from, prev_to)
        prev_total += area_conversion.conversion
    prev_conversion = prev_total / len(project.areas) if project.areas else 0.0

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN

    return ProjectAverageConversionGet(
        project_id=project_id, conversion=current_conversion, trend=trend, areas=areas
    )


async def get_goal_average_conversion_db(
    db: Session,
    goal_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None,
) -> GoalAverageConversionGet:
    """
    Get goal conversion rate by averaging conversions across all variants
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    goal = db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).first()
    if not goal:
        return GoalAverageConversionGet(goal_id=goal_id, conversion=0.0, trend=Trend.FLAT)

    # Get current period stats
    views = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    if views == 0:
        return GoalAverageConversionGet(goal_id=goal_id, conversion=0.0, trend=Trend.FLAT)

    achievements = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .count()
    )

    current_conversion = (achievements / views) * 100 if views > 0 else 0.0

    # Get previous day stats
    prev_to = from_ts
    prev_from = prev_to - timedelta(hours=24)

    prev_views = (
        db.query(ClientHistory)
        .filter(
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
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
            ClientHistory.created_at >= prev_from,
            ClientHistory.created_at <= prev_to,
        )
        .count()
    )

    prev_conversion = (prev_achievements / prev_views) * 100 if prev_views > 0 else 0.0

    # Determine trend
    trend = Trend.FLAT
    if current_conversion > prev_conversion:
        trend = Trend.UP
    elif current_conversion < prev_conversion:
        trend = Trend.DOWN

    return GoalAverageConversionGet(goal_id=goal_id, conversion=current_conversion, trend=trend)
