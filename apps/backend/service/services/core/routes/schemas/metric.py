import datetime
from enum import Enum
from typing import Optional

import strawberry

from services.core.routes.schemas.release_condition import DeviceType, OSType


@strawberry.enum
class ClientMetricType(Enum):
    INIT_SESSION = 1
    RELEASE_SESSION = 2
    REACH_PROJECT_GOAL = 3


@strawberry.input
class ClientMetricPost:
    metric_type: ClientMetricType
    metric_value: Optional[str] = None
