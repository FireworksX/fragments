from enum import Enum
from typing import Optional

import strawberry

from services.core.routes.schemas.feature_flag import FeatureFlagGet


@strawberry.enum
class ExperimentStatus(Enum):
    ACTIVE = 1
    INACTIVE = 2
    ARCHIVED = 3


@strawberry.type
class ExperimentGet:
    id: int
    name: str
    description: Optional[str] = None
    status: ExperimentStatus
    feature_flag: FeatureFlagGet


@strawberry.input
class ExperimentPost:
    name: str
    description: Optional[str] = None
    status: ExperimentStatus
    feature_flag_id: int


@strawberry.input
class ExperimentPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ExperimentStatus] = None
    feature_flag_id: Optional[int] = None
