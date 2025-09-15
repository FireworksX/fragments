from datetime import datetime
from enum import Enum
from typing import List, Optional

import strawberry


@strawberry.enum
class Trend(Enum):
    UP = 1
    DOWN = 2
    FLAT = 3


@strawberry.enum
class Detalization(Enum):
    MINUTE = 1
    MINUTE_10 = 2
    HOUR = 3
    DAY = 4


@strawberry.type
class Value:
    achieved: int
    unique_achieved: int
    views: int
    unique_views: int
    conversion: float  # unique achieved / unique views


@strawberry.type
class DetalizationGraphPoint:
    time: datetime
    value: Value


@strawberry.type
class DetalizationGraph:
    detalization: Detalization
    points: List[DetalizationGraphPoint]


@strawberry.type
class StatisticTrendGet:
    trend: Trend
    difference: float
    percentage: float


@strawberry.type
class StatisticGet:
    conversion: float
    views: int
    achieved: int
    unique_views: int
    unique_achieved: int


@strawberry.type
class StatisticTrend:
    conversion_trend: StatisticTrendGet
    views_trend: StatisticTrendGet
    achieved_trend: StatisticTrendGet
    unique_views_trend: StatisticTrendGet
    unique_achieved_trend: StatisticTrendGet


@strawberry.type
class GoalStatisticGet:
    goal_id: int
    goal_name: str
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    trend: Optional[StatisticTrend]
    current_group_by_date: DetalizationGraph
    prev_group_by_date: DetalizationGraph


@strawberry.type
class VariantStatisticGet:
    variant_id: int
    variant_name: str
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    trend: Optional[StatisticTrend]
    goals: List[GoalStatisticGet]


@strawberry.type
class CampaignStatisticGet:
    campaign_id: int
    campaign_name: str
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    trend: Optional[StatisticTrend]
    variants: List[VariantStatisticGet]


@strawberry.type
class AreaStatisticGet:
    area_id: int
    area_code: str
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    trend: Optional[StatisticTrend]
    campaigns: List[CampaignStatisticGet]


@strawberry.type
class ProjectStatisticGet:
    project_id: int
    project_name: str
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    trend: Optional[StatisticTrend]
    areas: List[AreaStatisticGet]


@strawberry.input
class StatisticFilter:
    data_ids: List[int]
    from_ts: datetime
    to_ts: datetime
    prev_from_ts: datetime
    prev_to_ts: datetime


@strawberry.input
class StatisticRatingFilter:
    data_ids: List[int]
    from_ts: datetime
    to_ts: datetime


@strawberry.type
class PageAnalytic:
    page: str
    percentage: float
    views: int


@strawberry.type
class CountryAnalytic:
    name: str
    isocode: str
    percentage: float
    views: int


@strawberry.type
class OSTypeAnalytic:
    name: str
    percentage: float
    views: int


@strawberry.type
class DeviceTypeAnalytic:
    name: str
    percentage: float
    views: int


@strawberry.type
class BrowserAnalytic:
    name: str
    slug: str
    percentage: float
    views: int


@strawberry.type
class PeriodAnalytics:
    pages: List[PageAnalytic]
    countries: List[CountryAnalytic]
    os_types: List[OSTypeAnalytic]
    device_types: List[DeviceTypeAnalytic]
    browsers: List[BrowserAnalytic]


@strawberry.type
class AreaStatisticRatingGet:
    area_id: int
    area_code: str
    current_period: PeriodAnalytics
