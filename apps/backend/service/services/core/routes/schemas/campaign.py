from typing import List, Optional, Union

import strawberry

from services.core.routes.schemas.filter import (
    DeviceType,
    FilterDeviceTypeGet,
    FilterGeoLocationPost,
    FilterGeoLocationsGet,
    FilterOSTypeGet,
    FilterPageGet,
    FilterTimeFramePost,
    FilterTimeFramesGet,
    OSType,
)
from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.media import MediaGet
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
    filters: List[
        Union[
            FilterOSTypeGet
            | FilterDeviceTypeGet
            | FilterPageGet
            | FilterGeoLocationsGet
            | FilterTimeFramesGet
        ]
    ]
    fragment: Optional[FragmentGet] = None


@strawberry.input
class FiltersPost:
    os_types: List[OSType]
    device_types: List[DeviceType]
    geolocations: List[FilterGeoLocationPost]
    time_frames: List[FilterTimeFramePost]
    pages: List[str]


@strawberry.input
class CampaignPost:
    area_id: int
    name: str
    description: Optional[str] = None
    active: bool
    archived: bool
    filters: Optional[FiltersPost] = None
    fragment_id: Optional[int] = None


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    archived: Optional[bool] = None
    filters: Optional[FiltersPost] = None
    fragment_id: Optional[int] = None
