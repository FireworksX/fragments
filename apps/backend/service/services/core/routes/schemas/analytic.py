from datetime import datetime
from enum import Enum
from typing import List

import strawberry


@strawberry.enum
class Trend(Enum):
    UP = 1
    DOWN = 2
    FLAT = 3


@strawberry.enum
class Detalization(Enum):
    MINUTE = 1
    HOUR = 2
    DAY = 3


@strawberry.type
class Value:
    achieved: int
    views: int
    conversion: float  # achieved / views


@strawberry.type
class DetalizationGraphPoint:
    time: datetime
    value: Value


@strawberry.type
class DetalizationGraph:
    detalization: Detalization
    points: List[DetalizationGraphPoint]


@strawberry.type
class StatisticGet:
    conversion: float
    views: int
    achieved: int


@strawberry.type
class GoalStatisticGet:
    goal_id: int
    goal_name: str
    trend: Trend
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    detalization: DetalizationGraph


@strawberry.type
class VariantStatisticGet:
    variant_id: int
    variant_name: str
    trend: Trend
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    goals: List[GoalStatisticGet]


@strawberry.type
class CampaignStatisticGet:
    campaign_id: int
    campaign_name: str
    trend: Trend
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    variants: List[VariantStatisticGet]


@strawberry.type
class AreaStatisticGet:
    area_id: int
    area_name: str
    area_code: str
    trend: Trend
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    campaigns: List[CampaignStatisticGet]


@strawberry.type
class ProjectStatisticGet:
    project_id: int
    project_name: str
    trend: Trend
    current_statistic: StatisticGet
    prev_statistic: StatisticGet
    areas: List[AreaStatisticGet]


@strawberry.input
class StatisticFilter:
    data_ids: List[int]
    from_ts: datetime
    to_ts: datetime
    prev_from_ts: datetime
    prev_to_ts: datetime
