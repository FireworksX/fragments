from typing import Optional

import strawberry

from services.core.routes.schemas.experiment import ExperimentGet
from services.core.routes.schemas.feature_flag import FeatureFlagGet, FeatureFlagPost
from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.media import MediaGet
from services.core.routes.schemas.release_condition import (
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)
from services.core.routes.schemas.user import UserGet


@strawberry.type
class CampaignGet:
    id: int
    area_id: int
    name: str
    logo: MediaGet
    author: UserGet
    description: Optional[str] = None
    active: bool
    default: bool
    archived: bool
    experiment: Optional[ExperimentGet] = None
    feature_flag: FeatureFlagGet


@strawberry.input
class CampaignPost:
    area_id: int
    name: str
    description: Optional[str] = None
    active: bool
    archived: bool
    experiment_id: Optional[int] = None


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    archived: Optional[bool] = None
    experiment_id: Optional[int] = None
