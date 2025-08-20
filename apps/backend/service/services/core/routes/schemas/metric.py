from enum import Enum
from typing import Optional

import strawberry


@strawberry.enum
class ClientMetricType(Enum):
    REACH_PROJECT_GOAL = 3


@strawberry.input
class ClientMetricPost:
    metric_type: ClientMetricType
    metric_value: Optional[str] = None
