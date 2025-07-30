from enum import Enum
from typing import Optional

import strawberry

from services.core.routes.schemas.experiment import ExperimentGet
from services.core.routes.schemas.feature_flag import FeatureFlagGet
from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet


@strawberry.enum
class CampaignStatus(Enum):
    ACTIVE = 1
    INACTIVE = 2
    ARCHIVED = 3


@strawberry.type
class CampaignStatsGet:
    last_views: int
    total_views: int
    percentage: float


@strawberry.type
class CampaignGet:
    id: int
    area_id: int
    name: str
    logo: MediaGet
    author: UserGet
    description: Optional[str] = None
    status: CampaignStatus
    experiment: Optional[ExperimentGet] = None
    feature_flag: FeatureFlagGet
    stats: CampaignStatsGet


@strawberry.input
class CampaignPost:
    area_id: int
    name: str
    description: Optional[str] = None
    status: CampaignStatus
    experiment_id: Optional[int] = None


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[CampaignStatus] = None
    experiment_id: Optional[int] = None
