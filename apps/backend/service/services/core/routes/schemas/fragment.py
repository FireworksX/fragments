from typing import List, Optional

import strawberry
from strawberry.scalars import JSON

from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.user import UserGet


@strawberry.input
class FragmentPost:
    project_id: int
    name: str
    document: JSON  # type: ignore[valid-type]
    props: Optional[JSON] = None  # type: ignore[valid-type]

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: int
    linked_goals: Optional[List[int]] = None  # ids of goals

    favorite: Optional[bool] = None


@strawberry.input
class FragmentPatch:
    id: int
    name: Optional[str] = None
    document: Optional[JSON] = None  # type: ignore[valid-type]
    props: Optional[JSON] = None  # type: ignore[valid-type]

    linked_fragments: Optional[List[int]] = None  # ids of fragments

    directory_id: Optional[int] = None
    linked_goals: Optional[List[int]] = None  # ids of goals

    favorite: Optional[bool] = None


@strawberry.type
class FragmentGet:
    id: int
    name: str
    author: UserGet
    document: JSON  # type: ignore[valid-type]
    props: Optional[JSON] = None  # type: ignore[valid-type]
    assets: List[MediaGet]
    favorite: bool
    linked_fragments: Optional[List['FragmentGet']] = None  # flat list of fragments

    directory_id: int
    linked_goals: Optional[List[int]] = None  # ids of goals


@strawberry.input
class FragmentClonePost:
    fragment_id: int
    name: Optional[str] = None
    project_id: Optional[int] = None
    directory_id: Optional[int] = None
