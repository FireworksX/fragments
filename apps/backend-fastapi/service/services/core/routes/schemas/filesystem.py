from typing import Optional, List, Union

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
class ProjectDirectory:
    project_id: int
    parent_id: Optional[int] = None
    name: str


@strawberry.input
class ProjectDirectoryPatch:
    id: int
    name: Optional[str] = None


@strawberry.type
class ProjectDirectoryGet:
    id: int
    name: str
    nested_items: Optional[List[Union[FragmentGet,"ProjectDirectoryGet"]]]
