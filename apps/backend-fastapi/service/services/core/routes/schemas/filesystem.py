from typing import Optional, List

import strawberry

from services.core.routes.schemas.fragment import FragmentGet


@strawberry.input
class ProjectDirectory:
    project_id: int
    parent_id: int
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
    fragments: List[FragmentGet] # flat list of all fragments
    directories: List["ProjectDirectoryGet"] #flat list of all directories

    has_subdirectories: bool = False
    has_fragments: bool = False
