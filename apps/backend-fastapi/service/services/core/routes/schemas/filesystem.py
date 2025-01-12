from typing import Optional, List

import strawberry

from services.core.routes.schemas.fragment import FragmentGet
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
    fragment_id: Optional[int] = None

@strawberry.input
class ProjectItemPatch:
    id: int
    name: Optional[str] = None
    nested_items: Optional[List[int]] = None

@strawberry.type
class ProjectItemGet:
    id: int
    name: str
    item_type: FileSystemItemType
    nested_items: Optional[List["ProjectItemGet"]]
    fragment: Optional[FragmentGet] = None
