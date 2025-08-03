from datetime import datetime
from enum import Enum
from typing import List

import strawberry


@strawberry.type
class VariantStatsGet:
    last_views: int
    total_views: int
    percentage: float


@strawberry.type
class CampaignStatsGet:
    last_views: int
    total_views: int
    percentage: float


@strawberry.type
class Value:
    achieved: int
    conversion: float  # achieved / views


@strawberry.type
class GraphPoint:
    x: datetime
    y: Value


@strawberry.enum
class Trend(Enum):
    UP = 1
    DOWN = 2
    FLAT = 3


@strawberry.type
class GoalAverageConversionGet:
    goal_id: int
    conversion: float
    trend: Trend


@strawberry.type
class GoalStatsGet:
    graph: List[GraphPoint]
    average_conversion: float
    goal_achieved: int
    goal_views: int


@strawberry.type
class VariantAverageConversionGet:
    variant_id: int
    conversion: float
    trend: Trend
    goals: List[GoalAverageConversionGet]


@strawberry.type
class CampaignAverageConversionGet:
    campaign_id: int
    conversion: float
    trend: Trend
    variants: List[VariantAverageConversionGet]


@strawberry.type
class AreaAverageConversionGet:
    area_id: int
    conversion: float
    trend: Trend
    campaigns: List[CampaignAverageConversionGet]


@strawberry.type
class ProjectAverageConversionGet:
    project_id: int
    conversion: float
    trend: Trend
    areas: List[AreaAverageConversionGet]
