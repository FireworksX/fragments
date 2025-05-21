from typing import List, Optional

import strawberry

from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.user import UserGet


@strawberry.type
class AreaGet:
    id: int
    area_code: str
    project_id: int
    name: str
    description: Optional[str] = None
    author: UserGet
    campaigns: List[CampaignGet]
    default_campaign: CampaignGet


@strawberry.input
class AreaPost:
    project_id: int
    area_code: str
    name: str
    description: Optional[str] = None


@strawberry.input
class AreaPatch:
    id: int
    area_code: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
