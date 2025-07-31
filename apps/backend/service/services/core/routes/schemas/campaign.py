from enum import Enum
from typing import Optional

import strawberry

from services.core.routes.schemas.feature_flag import FeatureFlagGet
from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet


@strawberry.enum
class CampaignStatus(Enum):
    ACTIVE = 1
    INACTIVE = 2
    ARCHIVED = 3


@strawberry.type
class CampaignGet:
    id: int
    area_id: int
    name: str
    logo: MediaGet
    author: UserGet
    description: Optional[str] = None
    status: CampaignStatus
    feature_flag: FeatureFlagGet


@strawberry.input
class CampaignPost:
    area_id: int
    name: str
    description: Optional[str] = None
    status: CampaignStatus


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[CampaignStatus] = None
