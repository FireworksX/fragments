from datetime import UTC, datetime, timedelta
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.sql import case

from conf.settings import logger
from database.models import ClientHistory
from services.core.routes.schemas.analytic import (
    CampaignStatsGet,
    GoalStatsGet,
    GraphPoint,
    Value,
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
    for point in stats:
        conversion = point.achieved / point.views if point.views > 0 else 0.0
        graph_points.append(
            GraphPoint(x=point.ts, y=Value(achieved=point.achieved, conversion=conversion))
        )

    return GoalStatsGet(graph=graph_points)
