from enum import Enum
from typing import List, Optional

import strawberry

from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.release_condition import (
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)
from services.core.routes.schemas.variant import VariantGet, VariantPost, VariantPatch


@strawberry.enum
class RotationType(Enum):
    KEEP = 1
    ROTATE = 2


@strawberry.type
class FeatureFlagGet:
    id: int
    name: str
    description: Optional[str] = None
    release_condition: ReleaseConditionGet
    rotation_type: RotationType
    variants: List[VariantGet]


@strawberry.input
class FeatureFlagPost:
    name: str
    description: Optional[str] = None
    rotation_type: RotationType
    release_condition: ReleaseConditionPost
    variants: List[VariantPost]


@strawberry.input
class FeatureFlagPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    rotation_type: Optional[RotationType] = None
    release_condition: Optional[ReleaseConditionPatch] = None
    variants: Optional[List[VariantPatch]] = None
