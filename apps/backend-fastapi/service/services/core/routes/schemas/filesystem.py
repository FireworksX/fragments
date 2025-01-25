from typing import Optional, List, Union

import strawberry

from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.project import ProjectGet
from services.core.routes.schemas.user import UserGet
from enum import Enum


@strawberry.input
class ProjectDirectory:
    project_id: int
    parent_id: Optional[int] = None
    name: str


@strawberry.input
class ProjectDirectoryPatch:
    id: int
    name: Optional[str] = None
    parent_id: Optional[int] = None


@strawberry.type
class ProjectDirectoryGet:
    id: int
    name: str
    parent_id: Optional[int] = None
    project_id: int
    fragments: List[FragmentGet]
    directories: List["ProjectDirectoryGet"]
