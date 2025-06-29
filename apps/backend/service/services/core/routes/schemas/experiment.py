from typing import Optional

import strawberry

from services.core.routes.schemas.feature_flag import FeatureFlagGet


@strawberry.type
class ExperimentGet:
    id: int
    name: str
    description: Optional[str] = None
    active: bool
    archived: bool
    feature_flag: FeatureFlagGet


@strawberry.input
class ExperimentPost:
    name: str
    description: Optional[str] = None
    active: bool = True
    archived: bool = False
    feature_flag_id: int


@strawberry.input
class ExperimentPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    archived: Optional[bool] = None
    feature_flag_id: Optional[int] = None
