from datetime import datetime
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


@strawberry.input
class GoalStatsIn:
    goal_id: int
    from_ts: datetime
    to_ts: datetime
