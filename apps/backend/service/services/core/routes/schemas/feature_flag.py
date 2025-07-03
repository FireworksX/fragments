from enum import Enum
from typing import List, Optional

import strawberry

from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.release_condition import (
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)


@strawberry.type
class FragmentVariantGet:
    fragment: FragmentGet
    props: Optional[strawberry.scalars.JSON] = None


@strawberry.enum
class VariantStatus(Enum):
    ACTIVE = 1
    INACTIVE = 2


@strawberry.enum
class VariantRotationType(Enum):
    KEEP = 1
    ROTATE = 2


@strawberry.type
class VariantGet:
    id: int
    name: str
    rollout_percentage: float
    fragment: Optional[FragmentVariantGet] = None
    status: VariantStatus
    rotation_type: VariantRotationType


@strawberry.input
class FragmentVariantPost:
    fragment_id: int
    props: Optional[strawberry.scalars.JSON] = None


@strawberry.input
class FragmentVariantPatch:
    id: int
    props: Optional[strawberry.scalars.JSON] = None


@strawberry.input
class VariantPost:
    feature_flag_id: int
    name: str
    rollout_percentage: float
    fragment: FragmentVariantPost
    status: VariantStatus
    rotation_type: VariantRotationType


@strawberry.input
class VariantPatch:
    id: int
    name: Optional[str] = None
    rollout_percentage: Optional[float] = None
    fragment: Optional[FragmentVariantPatch] = None
    status: Optional[VariantStatus] = None
    rotation_type: Optional[VariantRotationType] = None


@strawberry.type
class FeatureFlagGet:
    id: int
    name: str
    description: Optional[str] = None
    release_condition: ReleaseConditionGet
    variants: List[VariantGet]


@strawberry.input
class FeatureFlagPost:
    name: str
    description: Optional[str] = None
    release_condition: ReleaseConditionPost
    variants: List[VariantPost]


@strawberry.input
class FeatureFlagPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    release_condition: Optional[ReleaseConditionPatch] = None
    variants: Optional[List[VariantPatch]] = None
