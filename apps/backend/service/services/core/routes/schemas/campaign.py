from typing import Optional

import strawberry

from services.core.routes.schemas.user import UserGet


@strawberry.type
class CampaignGet:
    id: int
    project_id: int
    name: str
    logo: Optional[str] = None
    author: UserGet
    description: Optional[str] = None
    active: bool
    deleted: bool


@strawberry.input
class CampaignPost:
    project_id: int
    name: str
    description: Optional[str] = None
    active: bool
    deleted: bool


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    deleted: Optional[bool] = None
