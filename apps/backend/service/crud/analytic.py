from datetime import datetime, timedelta
from typing import Dict, List, Optional

from sqlalchemy import distinct, func
from sqlalchemy.orm import Session
from sqlalchemy.sql import case

from conf.settings import logger
from database.models import Area, Campaign, ClientHistory, Project, ProjectGoal, Variant
from services.core.routes.schemas.analytic import (
    AreaStatisticGet,
    AreaStatisticRatingGet,
    BrowserAnalytic,
    CampaignStatisticGet,
    CountryAnalytic,
    Detalization,
    DetalizationGraph,
    DetalizationGraphPoint,
    DeviceTypeAnalytic,
    GoalStatisticGet,
    OSTypeAnalytic,
    PageAnalytic,
    PeriodAnalytics,
    ProjectStatisticGet,
    StatisticGet,
    StatisticRatingFilter,
    StatisticTrend,
    StatisticTrendGet,
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
    - 24 hours: by 10 minutes
    - 7 days: by hour
    - 28-31 days: by day
    """
    logger.info(f"Getting goal detalization graph for goal {goal_id} from {from_ts} to {to_ts}")

    time_diff = to_ts - from_ts
    detalization = Detalization.MINUTE_10
    # Determine granularity based on time range
    if time_diff <= timedelta(days=1):
        # By 10 minutes for 24 hours
        detalization = Detalization.MINUTE_10
        group_by = func.date_trunc('hour', ClientHistory.created_at) + func.make_interval(
            minutes=func.floor(func.date_part('minute', ClientHistory.created_at) / 10) * 10
        )
        logger.debug('Using 10 minute detalization')
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
            func.count(
                distinct(
                    case(
                        [
                            (
                                ClientHistory.event_type
                                == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
                                ClientHistory.user_id,
                            )
                        ]
                    )
                )
            ).label('unique_achieved'),
            func.count(
                distinct(
                    case(
                        [
                            (
                                ClientHistory.event_type
                                == int(ClientHistoryEventType.GOAL_VIEW.value),
                                func.date_trunc('hour', ClientHistory.created_at)
                                + func.make_interval(
                                    minutes=func.floor(
                                        func.date_part('minute', ClientHistory.created_at) / 30
                                    )
                                    * 30
                                ),
                            )
                        ]
                    )
                )
            ).label('sessions'),
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
    for point in stats:
        conversion = (
            round((point.unique_achieved / point.sessions) * 100, 2) if point.sessions > 0 else 0.0
        )
        graph_points.append(
            DetalizationGraphPoint(
                time=point.ts,
                value=Value(
                    achieved=point.achieved,
                    views=point.views,
                    conversion=conversion,
                    unique_achieved=point.unique_achieved,
                    sessions=point.sessions,
                ),
            )
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
) -> Optional[VariantStatisticGet]:
    """
    Get variant conversion rate by averaging conversions across all linked goals
    """
    logger.info(f"Getting variant statistics for variant {variant_id}")

    variant: Optional[Variant] = db.query(Variant).filter(Variant.id == variant_id).first()
    if not variant:
        logger.error(f"No variant found with id {variant_id}")
        raise ValueError(f"No variant found with id {variant_id}")

    if (
        not variant.fragment
        or not variant.fragment.linked_goals
        or len(variant.fragment.linked_goals) == 0
    ):
        logger.info(f"No fragment or linked goals found for variant {variant_id}")
        return None

    # Get statistics for each goal
    goals = []
    total_conversion = 0.0
    current_views = 0
    current_achieved = 0
    current_sessions = 0
    current_unique_achieved = 0
    prev_views = 0
    prev_achieved = 0
    prev_sessions = 0
    prev_unique_achieved = 0

    for goal in variant.fragment.linked_goals:
        goal_stat = await get_goal_statistic_db(
            db, goal.id, from_ts, to_ts, prev_from_ts, prev_to_ts, variant_id
        )
        goals.append(goal_stat)

        total_conversion += goal_stat.current_statistic.conversion
        current_views += goal_stat.current_statistic.views
        current_achieved += goal_stat.current_statistic.achieved
        current_sessions += goal_stat.current_statistic.sessions
        current_unique_achieved += goal_stat.current_statistic.unique_achieved
        prev_views += goal_stat.prev_statistic.views
        prev_achieved += goal_stat.prev_statistic.achieved
        prev_sessions += goal_stat.prev_statistic.sessions
        prev_unique_achieved += goal_stat.prev_statistic.unique_achieved

    current_conversion = round(total_conversion / len(variant.fragment.linked_goals), 2)
    prev_conversion = round((prev_achieved / prev_views * 100), 2) if prev_views > 0 else 0.0

    current_statistic = StatisticGet(
        conversion=current_conversion,
        views=current_views,
        achieved=current_achieved,
        sessions=current_sessions,
        unique_achieved=current_unique_achieved,
    )
    prev_statistic = StatisticGet(
        conversion=prev_conversion,
        views=prev_views,
        achieved=prev_achieved,
        sessions=prev_sessions,
        unique_achieved=prev_unique_achieved,
    )
    trend = await get_statistic_trend_db(current_statistic, prev_statistic)
    return VariantStatisticGet(
        variant_id=variant_id,
        variant_name=variant.name,
        current_statistic=current_statistic,
        prev_statistic=prev_statistic,
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
) -> Optional[CampaignStatisticGet]:
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
        return None

    total_conversion = 0.0
    current_views = 0
    current_achieved = 0
    current_sessions = 0
    current_unique_achieved = 0
    variants = []
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_statistic_db(
            db, variant.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        if not variant_conversion:
            continue
        total_conversion += variant_conversion.current_statistic.conversion * (
            variant.rollout_percentage / 100
        )
        current_views += variant_conversion.current_statistic.views
        current_achieved += variant_conversion.current_statistic.achieved
        current_sessions += variant_conversion.current_statistic.sessions
        current_unique_achieved += variant_conversion.current_statistic.unique_achieved
        variants.append(variant_conversion)
    current_conversion = round(total_conversion / len(campaign.feature_flag.variants), 2)
    logger.info(f"Current conversion for campaign {campaign_id}: {current_conversion}%")

    # Get previous
    prev_views = 0
    prev_achieved = 0
    prev_sessions = 0
    prev_unique_achieved = 0
    prev_total_conversion = 0.0
    for variant in campaign.feature_flag.variants:
        variant_conversion = await get_variant_statistic_db(
            db, variant.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        if not variant_conversion:
            continue
        prev_views += variant_conversion.current_statistic.views
        prev_achieved += variant_conversion.current_statistic.achieved
        prev_sessions += variant_conversion.current_statistic.sessions
        prev_unique_achieved += variant_conversion.current_statistic.unique_achieved
        prev_total_conversion += variant_conversion.current_statistic.conversion * (
            variant.rollout_percentage / 100
        )
    prev_conversion = round(prev_total_conversion / len(campaign.feature_flag.variants), 2)
    logger.info(f"Previous conversion for campaign {campaign_id}: {prev_conversion}%")

    current_statistic = StatisticGet(
        conversion=current_conversion,
        views=current_views,
        achieved=current_achieved,
        sessions=current_sessions,
        unique_achieved=current_unique_achieved,
    )

    prev_statistic = StatisticGet(
        conversion=prev_conversion,
        views=prev_views,
        achieved=prev_achieved,
        sessions=prev_sessions,
        unique_achieved=prev_unique_achieved,
    )

    trend = await get_statistic_trend_db(current_statistic, prev_statistic)
    return CampaignStatisticGet(
        campaign_id=campaign_id,
        campaign_name=campaign.name,
        current_statistic=current_statistic,
        prev_statistic=prev_statistic,
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
) -> Optional[AreaStatisticGet]:
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
        return None

    current_views = 0
    current_achieved = 0
    current_sessions = 0
    current_unique_achieved = 0
    # Get current period conversion
    campaigns = []
    total_conversion = 0.0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_statistic_db(
            db, campaign.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        if not campaign_conversion:
            continue
        current_views += campaign_conversion.current_statistic.views
        current_achieved += campaign_conversion.current_statistic.achieved
        current_sessions += campaign_conversion.current_statistic.sessions
        current_unique_achieved += campaign_conversion.current_statistic.unique_achieved
        campaigns.append(campaign_conversion)
        total_conversion += campaign_conversion.current_statistic.conversion
    current_conversion = round(total_conversion / len(area.campaigns), 2)
    logger.info(f"Current conversion for area {area_id}: {current_conversion}%")

    # Get previous day conversion
    prev_views = 0
    prev_achieved = 0
    prev_sessions = 0
    prev_unique_achieved = 0
    prev_total_conversion = 0.0
    for campaign in area.campaigns:
        campaign_conversion = await get_campaign_statistic_db(
            db, campaign.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        if not campaign_conversion:
            continue
        prev_views += campaign_conversion.current_statistic.views
        prev_achieved += campaign_conversion.current_statistic.achieved
        prev_sessions += campaign_conversion.current_statistic.sessions
        prev_unique_achieved += campaign_conversion.current_statistic.unique_achieved
        prev_total_conversion += campaign_conversion.current_statistic.conversion
    prev_conversion = round(prev_total_conversion / len(area.campaigns), 2)
    logger.info(f"Previous conversion for area {area_id}: {prev_conversion}%")

    current_statistic = StatisticGet(
        conversion=current_conversion,
        views=current_views,
        achieved=current_achieved,
        sessions=current_sessions,
        unique_achieved=current_unique_achieved,
    )

    prev_statistic = StatisticGet(
        conversion=prev_conversion,
        views=prev_views,
        achieved=prev_achieved,
        sessions=prev_sessions,
        unique_achieved=prev_unique_achieved,
    )

    trend = await get_statistic_trend_db(current_statistic, prev_statistic)

    return AreaStatisticGet(
        area_id=area_id,
        area_code=area.area_code,
        current_statistic=current_statistic,
        prev_statistic=prev_statistic,
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
) -> Optional[ProjectStatisticGet]:
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
        return None

    current_views = 0
    current_achieved = 0
    current_sessions = 0
    current_unique_achieved = 0
    # Get current period conversion
    areas = []
    total_conversion = 0.0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(
            db, area.id, from_ts, to_ts, prev_from_ts, prev_to_ts
        )
        if not area_conversion:
            continue
        current_views += area_conversion.current_statistic.views
        current_achieved += area_conversion.current_statistic.achieved
        current_sessions += area_conversion.current_statistic.sessions
        current_unique_achieved += area_conversion.current_statistic.unique_achieved
        areas.append(area_conversion)
        total_conversion += area_conversion.current_statistic.conversion
    current_conversion = round(total_conversion / len(project.areas), 2)
    logger.info(f"Current conversion for project {project_id}: {current_conversion}%")

    # Get previous period conversion
    prev_views = 0
    prev_achieved = 0
    prev_sessions = 0
    prev_unique_achieved = 0
    prev_total_conversion = 0.0
    for area in project.areas:
        area_conversion = await get_area_average_conversion_db(
            db, area.id, prev_from_ts, prev_to_ts, prev_from_ts, prev_to_ts
        )
        if not area_conversion:
            continue
        prev_views += area_conversion.current_statistic.views
        prev_achieved += area_conversion.current_statistic.achieved
        prev_sessions += area_conversion.current_statistic.sessions
        prev_unique_achieved += area_conversion.current_statistic.unique_achieved
        prev_total_conversion += area_conversion.current_statistic.conversion
    prev_conversion = round(prev_total_conversion / len(project.areas), 2)
    logger.info(f"Previous conversion for project {project_id}: {prev_conversion}%")

    current_statistic = StatisticGet(
        conversion=current_conversion,
        views=current_views,
        achieved=current_achieved,
        sessions=current_sessions,
        unique_achieved=current_unique_achieved,
    )

    prev_statistic = StatisticGet(
        conversion=prev_conversion,
        views=prev_views,
        achieved=prev_achieved,
        sessions=prev_sessions,
        unique_achieved=prev_unique_achieved,
    )

    trend = await get_statistic_trend_db(current_statistic, prev_statistic)

    return ProjectStatisticGet(
        project_id=project_id,
        project_name=project.name,
        current_statistic=current_statistic,
        prev_statistic=prev_statistic,
        trend=trend,
        areas=areas,
    )


async def goal_statistic_db(
    db: Session,
    goal: ProjectGoal,
    from_ts: datetime,
    to_ts: datetime,
    variant_id: Optional[int] = None,
) -> StatisticGet:
    views_query = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.goal_id == goal.id,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_VIEW.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .order_by(ClientHistory.user_id, ClientHistory.created_at)
        .all()
    )

    views = len(views_query)

    # Calculate unique sessions (30 min gap between views)
    sessions = 0
    current_user = None
    last_view_time = None
    SESSION_GAP = timedelta(minutes=30)

    for view in views_query:
        if view.user_id != current_user:
            sessions += 1
            current_user = view.user_id
            last_view_time = view.created_at
        else:
            if view.created_at - last_view_time > SESSION_GAP:
                sessions += 1
            last_view_time = view.created_at

    # Count unique achievements per session
    achievements_query = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.goal_id == goal.id,
            ClientHistory.variant_id == variant_id if variant_id else True,
            ClientHistory.event_type == int(ClientHistoryEventType.GOAL_CONTRIBUTE.value),
            ClientHistory.created_at >= from_ts,
            ClientHistory.created_at <= to_ts,
        )
        .order_by(ClientHistory.user_id, ClientHistory.created_at)
        .all()
    )

    achievements = len(achievements_query)

    unique_achievements = 0
    current_user = None
    last_achievement_time = None

    for achievement in achievements_query:
        if achievement.user_id != current_user:
            unique_achievements += 1
            current_user = achievement.user_id
            last_achievement_time = achievement.created_at
        else:
            if achievement.created_at - last_achievement_time > SESSION_GAP:
                unique_achievements += 1
            last_achievement_time = achievement.created_at

    conversion = round((unique_achievements / sessions) * 100, 2) if sessions > 0 else 0.0
    logger.info(f"Current conversion for goal {goal.id}: {conversion}%")

    return StatisticGet(
        conversion=conversion,
        views=views,
        achieved=achievements,
        sessions=sessions,
        unique_achieved=unique_achievements,
    )


async def get_statistic_trend_db(
    current_statistic: StatisticGet, prev_statistic: StatisticGet
) -> Optional[StatisticTrend]:
    trend: Optional[StatisticTrend] = None
    if current_statistic and prev_statistic:
        # Calculate trends by comparing current and previous statistics
        trend = StatisticTrend(
            conversion_trend=StatisticTrendGet(
                trend=(
                    Trend.UP
                    if current_statistic.conversion > prev_statistic.conversion
                    else (
                        Trend.DOWN
                        if current_statistic.conversion < prev_statistic.conversion
                        else Trend.FLAT
                    )
                ),
                difference=current_statistic.conversion - prev_statistic.conversion,
                percentage=(
                    round(
                        (
                            (current_statistic.conversion - prev_statistic.conversion)
                            / prev_statistic.conversion
                            * 100
                        ),
                        2,
                    )
                    if prev_statistic.conversion > 0
                    else 0.0
                ),
            ),
            views_trend=StatisticTrendGet(
                trend=(
                    Trend.UP
                    if current_statistic.views > prev_statistic.views
                    else (
                        Trend.DOWN if current_statistic.views < prev_statistic.views else Trend.FLAT
                    )
                ),
                difference=current_statistic.views - prev_statistic.views,
                percentage=(
                    round(
                        (
                            (current_statistic.views - prev_statistic.views)
                            / prev_statistic.views
                            * 100
                        ),
                        2,
                    )
                    if prev_statistic.views > 0
                    else 0.0
                ),
            ),
            achieved_trend=StatisticTrendGet(
                trend=(
                    Trend.UP
                    if current_statistic.achieved > prev_statistic.achieved
                    else (
                        Trend.DOWN
                        if current_statistic.achieved < prev_statistic.achieved
                        else Trend.FLAT
                    )
                ),
                difference=current_statistic.achieved - prev_statistic.achieved,
                percentage=(
                    round(
                        (
                            (current_statistic.achieved - prev_statistic.achieved)
                            / prev_statistic.achieved
                            * 100
                        ),
                        2,
                    )
                    if prev_statistic.achieved > 0
                    else 0.0
                ),
            ),
            sessions_trend=StatisticTrendGet(
                trend=(
                    Trend.UP
                    if current_statistic.sessions > prev_statistic.sessions
                    else (
                        Trend.DOWN
                        if current_statistic.sessions < prev_statistic.sessions
                        else Trend.FLAT
                    )
                ),
                difference=current_statistic.sessions - prev_statistic.sessions,
                percentage=(
                    round(
                        (
                            (current_statistic.sessions - prev_statistic.sessions)
                            / prev_statistic.sessions
                            * 100
                        ),
                        2,
                    )
                    if prev_statistic.sessions > 0
                    else 0.0
                ),
            ),
            unique_achieved_trend=StatisticTrendGet(
                trend=(
                    Trend.UP
                    if current_statistic.unique_achieved > prev_statistic.unique_achieved
                    else (
                        Trend.DOWN
                        if current_statistic.unique_achieved < prev_statistic.unique_achieved
                        else Trend.FLAT
                    )
                ),
                difference=current_statistic.unique_achieved - prev_statistic.unique_achieved,
                percentage=(
                    round(
                        (
                            (current_statistic.unique_achieved - prev_statistic.unique_achieved)
                            / prev_statistic.unique_achieved
                            * 100
                        ),
                        2,
                    )
                    if prev_statistic.unique_achieved > 0
                    else 0.0
                ),
            ),
        )
    return trend


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
    Get goal conversion rate by calculating unique sessions and achievements
    A session is considered ended after 30 minutes of inactivity
    """
    logger.info(f"Getting goal statistics for goal {goal_id}")

    goal: Optional[ProjectGoal] = db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).first()
    if not goal:
        logger.error(f"No goal found with id {goal_id}")
        raise ValueError(f"No goal found with id {goal_id}")

    current_statistic = await goal_statistic_db(db, goal, from_ts, to_ts, variant_id)
    prev_statistic = await goal_statistic_db(db, goal, prev_from_ts, prev_to_ts, variant_id)
    trend = await get_statistic_trend_db(current_statistic, prev_statistic)

    current_group_by_date = await get_goal_detalization_graph_db(
        db, goal_id, from_ts, to_ts, variant_id
    )
    prev_group_by_date = await get_goal_detalization_graph_db(
        db, goal_id, prev_from_ts, prev_to_ts, variant_id
    )

    return GoalStatisticGet(
        goal_id=goal_id,
        goal_name=goal.name,
        current_statistic=current_statistic,
        prev_statistic=prev_statistic,
        trend=trend,
        current_group_by_date=current_group_by_date,
        prev_group_by_date=prev_group_by_date,
    )


async def get_area_statistic_rating_db(
    db: Session,
    area: Area,
    statistic_rating_filter: StatisticRatingFilter,
) -> AreaStatisticRatingGet:
    logger.info(f"Getting area statistic rating for area {area.id}")

    # Get all client history records for this area in the time period
    history: List[ClientHistory] = (
        db.query(ClientHistory)
        .filter(
            ClientHistory.area_id == area.id,
            ClientHistory.created_at >= statistic_rating_filter.from_ts,
            ClientHistory.created_at <= statistic_rating_filter.to_ts,
        )
        .all()
    )

    total_views = len(history)

    # Group by page
    pages_dict: Dict[str, int] = {}
    for record in history:
        if record.page:
            pages_dict[record.page] = pages_dict.get(record.page, 0) + 1

    pages = [
        PageAnalytic(
            page=page,
            percentage=round((count / total_views * 100), 2) if total_views > 0 else 0.0,
            views=count,
        )
        for page, count in pages_dict.items()
    ]

    # Group by country
    countries_dict: Dict[str, int] = {}
    for record in history:
        if record.country:
            countries_dict[record.country] = countries_dict.get(record.country, 0) + 1

    countries = [
        CountryAnalytic(
            name=country,
            isocode=country,  # Would need mapping to ISO codes
            percentage=round((count / total_views * 100), 2) if total_views > 0 else 0.0,
            views=count,
        )
        for country, count in countries_dict.items()
    ]

    # Group by OS type
    os_types_dict: Dict[int, int] = {}
    for record in history:
        if record.os_type:
            os_types_dict[record.os_type] = os_types_dict.get(record.os_type, 0) + 1

    os_types = [
        OSTypeAnalytic(
            name=str(os_type),
            percentage=round((count / total_views * 100), 2) if total_views > 0 else 0.0,
            views=count,
        )
        for os_type, count in os_types_dict.items()
    ]

    # Group by device type
    device_types_dict: Dict[int, int] = {}
    for record in history:
        if record.device_type:
            device_types_dict[record.device_type] = device_types_dict.get(record.device_type, 0) + 1

    device_types = [
        DeviceTypeAnalytic(
            name=str(device_type),
            percentage=round((count / total_views * 100), 2) if total_views > 0 else 0.0,
            views=count,
        )
        for device_type, count in device_types_dict.items()
    ]

    # Group by browser
    browsers_dict: Dict[str, int] = {}
    for record in history:
        if record.browser:
            browsers_dict[record.browser] = browsers_dict.get(record.browser, 0) + 1

    browsers = [
        BrowserAnalytic(
            name=browser,
            slug=browser.lower(),
            percentage=round((count / total_views * 100), 2) if total_views > 0 else 0.0,
            views=count,
        )
        for browser, count in browsers_dict.items()
    ]

    return AreaStatisticRatingGet(
        area_id=area.id,
        area_code=area.area_code,
        current_period=PeriodAnalytics(
            pages=pages,
            countries=countries,
            os_types=os_types,
            device_types=device_types,
            browsers=browsers,
        ),
    )
