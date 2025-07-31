from typing import List, Optional

import strawberry

from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet


@strawberry.input
class FragmentPost:
    project_id: int
    name: str
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: int
    linked_goals: Optional[List[int]] = None  # ids of goals


@strawberry.input
class FragmentPatch:
    id: int
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None
    props: Optional[strawberry.scalars.JSON] = None

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: Optional[int] = None
    linked_goals: Optional[List[int]] = None  # ids of goals


@strawberry.type
class FragmentGet:
    id: int
    name: str
    author: UserGet
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None
    assets: List[MediaGet]

    linked_fragments: Optional[List['FragmentGet']] = None  # flat list of fragments

    directory_id: int
    linked_goals: Optional[List[int]] = None  # ids of goals
