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
class GoalStatisticGet:
    goal_id: int
    conversion: float
    views: int
    achieved: int
    trend: Trend
    detalization: DetalizationGraph


@strawberry.type
class VariantStatisticGet:
    variant_id: int
    conversion: float
    views: int
    achieved: int
    trend: Trend
    goals: List[GoalStatisticGet]


@strawberry.type
class CampaignStatisticGet:
    campaign_id: int
    conversion: float
    views: int
    achieved: int
    trend: Trend
    variants: List[VariantStatisticGet]


@strawberry.type
class AreaStatisticGet:
    area_id: int
    conversion: float
    views: int
    achieved: int
    trend: Trend
    campaigns: List[CampaignStatisticGet]


@strawberry.type
class ProjectStatisticGet:
    project_id: int
    conversion: float
    views: int
    achieved: int
    trend: Trend
    areas: List[AreaStatisticGet]


@strawberry.input
class StatisticFilter:
    data_ids: List[int]
    from_ts: datetime
    to_ts: datetime
    prev_from_ts: datetime
    prev_to_ts: datetime
