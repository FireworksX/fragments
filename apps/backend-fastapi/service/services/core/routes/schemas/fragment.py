from typing import Optional, List

import strawberry

from services.core.routes.schemas.project import ProjectGet
from services.core.routes.schemas.user import UserGet


@strawberry.input
class FragmentPost:
    project_id: int
    name: str
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: Optional[int] = None


@strawberry.input
class FragmentPatch:
    id: int
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None
    props: Optional[strawberry.scalars.JSON] = None

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: Optional[int] = None


@strawberry.type
class FragmentGet:
    id: int
    project: ProjectGet
    name: str
    author: UserGet
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None
    assets: List[str]

    linked_fragments: Optional[List["FragmentGet"]] = None  # flat list of fragments

    directory_id: Optional[int] = None
