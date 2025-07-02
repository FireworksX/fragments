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


@strawberry.type
class VariantGet:
    id: int
    name: str
    rollout_percentage: float
    fragment: Optional[FragmentVariantGet] = None


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
    name: str
    rollout_percentage: float
    fragment: FragmentVariantPost


@strawberry.input
class VariantPatch:
    id: int
    name: Optional[str] = None
    rollout_percentage: Optional[float] = None
    fragment: Optional[FragmentVariantPatch] = None


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
