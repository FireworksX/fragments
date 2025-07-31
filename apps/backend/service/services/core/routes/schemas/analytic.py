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


@strawberry.type
class GoalStatsGet:
    graph: List[GraphPoint]


@strawberry.enum
class Trend(Enum):
    UP = 1
    DOWN = 2
    FLAT = 3


@strawberry.type
class AverageConversionGet:
    conversion: float
    trend: Trend
