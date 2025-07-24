from typing import List, Optional

import strawberry

from services.core.routes.schemas.area import AreaGet
from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.client import ClientGet
from services.core.routes.schemas.filesystem import ProjectDirectoryGet
from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet, UserRoleGet


@strawberry.type
class ProjectKeyGet:
    id: int
    name: Optional[str]
    value: str


@strawberry.type
class ProjectAllowedHostGet:
    id: int
    name: str
    host: str


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
    logo: MediaGet
    owner: UserGet
    members: List[UserRoleGet]
    areas: List[AreaGet]
    root_directory_id: int
    private_key: Optional[ProjectKeyGet]
    public_keys: List[ProjectKeyGet]
    allowed_hosts: List[ProjectAllowedHostGet]


@strawberry.input
class ProjectPost:
    name: str
    logo: Optional[str] = None


@strawberry.input
class ProjectPatch:
    id: int
    name: Optional[str] = None


@strawberry.type
class ClientProjectGoalGet:
    id: int
    client: ClientGet
    project_goal: ProjectGoalGet
    project: ProjectGet
    created_at: str
