from typing import Optional, List

import strawberry

from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.filesystem import ProjectDirectoryGet
from services.core.routes.schemas.user import UserGet, UserRoleGet

@strawberry.type
class ProjectGet:
    id: int
    name: str
    logo: Optional[str] = None
    owner: UserGet
    members: List[UserRoleGet]
    campaigns: List[CampaignGet]
    root_directory_id: int
    private_key: Optional[str]
    public_keys: List[str]


@strawberry.input
class ProjectPost:
    name: str
    logo: Optional[str] = None


@strawberry.input
class ProjectPatch:
    id: int
    name: Optional[str] = None
