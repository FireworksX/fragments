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


@strawberry.input
class FragmentPatch:
    id: int
    project_id: int
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None
    props: Optional[strawberry.scalars.JSON] = None


@strawberry.type
class FragmentGet:
    id: int
    project: ProjectGet
    name: str
    author: UserGet
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None
    assets: List[str]
