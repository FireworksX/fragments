from typing import List, Optional

import strawberry

from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.filesystem import ProjectDirectoryGet
from services.core.routes.schemas.user import UserGet, UserRoleGet


@strawberry.type
class ProjectKeyGet:
    id: int
    name: Optional[str]
    value: str

@strawberry.type
class ProjectGoalGet:
    id: int
    name: str
    target_action: str

@strawberry.input
class ProjectGoalPost:
    project_id: int
    name: str
    target_action: str

@strawberry.input
class ProjectGoalPatch:
    id: int
    name: Optional[str] = None
    target_action: Optional[str] = None

@strawberry.type
class ProjectGet:
    id: int
    name: str
    logo: Optional[str] = None
    owner: UserGet
    members: List[UserRoleGet]
    campaigns: List[CampaignGet]
    root_directory_id: int
    private_key: Optional[ProjectKeyGet]
    public_keys: List[ProjectKeyGet]
    goals: List[ProjectGoalGet]

@strawberry.input
class ProjectPost:
    name: str
    logo: Optional[str] = None


@strawberry.input
class ProjectPatch:
    id: int
    name: Optional[str] = None
