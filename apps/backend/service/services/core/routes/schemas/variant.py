from enum import Enum
from typing import Optional

import strawberry
from strawberry.scalars import JSON

from services.core.routes.schemas.fragment import FragmentGet


@strawberry.type
class FragmentVariantGet:
    fragment: FragmentGet
    props: Optional[JSON] = None  # type: ignore[valid-type]


@strawberry.enum
class VariantStatus(Enum):
    ACTIVE = 1
    INACTIVE = 2


@strawberry.input
class FragmentVariantPost:
    fragment_id: int
    props: Optional[JSON] = None  # type: ignore[valid-type]


@strawberry.input
class FragmentVariantPatch:
    fragment_id: int
    props: Optional[JSON] = None  # type: ignore[valid-type]


@strawberry.type
class VariantGet:
    id: int
    name: str
    rollout_percentage: float
    fragment: Optional[FragmentVariantGet] = None
    status: VariantStatus


@strawberry.input
class VariantPost:
    feature_flag_id: int
    name: str
    rollout_percentage: float
    fragment: FragmentVariantPost
    status: VariantStatus


@strawberry.input
class VariantPatch:
    id: int
    name: Optional[str] = None
    rollout_percentage: Optional[float] = None
    fragment: Optional[FragmentVariantPatch] = None
    status: Optional[VariantStatus] = None
