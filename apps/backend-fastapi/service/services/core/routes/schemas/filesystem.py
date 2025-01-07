from typing import Optional, List

import strawberry

from services.core.routes.schemas.project import ProjectGet
from services.core.routes.schemas.user import UserGet
from enum import Enum

@strawberry.enum
class FileSystemItemType(Enum):
    FRAGMENT = 1
    DIRECTORY = 2

@strawberry.input
class ProjectItem:
    project_id: int
    parent_id: Optional[int] = None
    name: str
    item_type: FileSystemItemType

@strawberry.type
class ProjectItemPatch:
    id: int
    project_id: int
    name: Optional[str] = None

@strawberry.type
class ProjectItemGet:
    id: int
    project_id: int
    name: str
    item_type: FileSystemItemType
    items: Optional[List["ProjectItemGet"]]
