from typing import List, Optional

import strawberry

from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet


@strawberry.type
class AreaGet:
    id: int
    area_code: str
    project_id: int
    description: Optional[str] = None
    author: UserGet
    campaigns: List[CampaignGet]
    default_campaign: CampaignGet
    logo: MediaGet
    properties: Optional[List[strawberry.scalars.JSON]] = None


@strawberry.input
class AreaPost:
    project_id: int
    area_code: str
    default_campaign_name: str
    description: Optional[str] = None
    properties: Optional[List[strawberry.scalars.JSON]] = None


@strawberry.input
class AreaPatch:
    id: int
    area_code: Optional[str] = None
    description: Optional[str] = None
    properties: Optional[List[strawberry.scalars.JSON]] = None
