from typing import List, Optional

import strawberry

from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.release_condition import (
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)


@strawberry.type
class VariantGet:
    id: int
    name: str
    rollout_percentage: float
    fragment: FragmentGet


@strawberry.input
class VariantPost:
    name: str
    rollout_percentage: float
    fragment_id: int


@strawberry.input
class VariantPatch:
    id: int
    name: Optional[str] = None
    rollout_percentage: Optional[float] = None
    fragment_id: Optional[int] = None


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
