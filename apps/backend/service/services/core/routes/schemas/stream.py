from typing import List, Optional, Union

import strawberry

from services.core.routes.schemas.filter import (
    FilterPageGet,
    FilterOSTypeGet,
    FilterDeviceTypeGet,
    FilterGeoLocationsGet,
    FilterTimeFramesGet,
    OSType,
    DeviceType,
    FilterGeoLocationPost,
    FilterTimeFramePost,
)


@strawberry.type
class StreamGet:
    id: int
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    filters: List[
        Union[
            FilterOSTypeGet
            | FilterDeviceTypeGet
            | FilterPageGet
            | FilterGeoLocationsGet
            | FilterTimeFramesGet
        ]
    ]
    weight: float


@strawberry.input
class FiltersPost:
    os_types: List[OSType]
    device_types: List[DeviceType]
    geolocations: List[FilterGeoLocationPost]
    time_frames: List[FilterTimeFramePost]
    pages: List[str]


@strawberry.input
class StreamPost:
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    filters: Optional[FiltersPost] = None
    weight: float


@strawberry.input
class StreamPatch:
    id: int
    active: Optional[bool] = None
    deleted: Optional[bool] = None
    name: Optional[str] = None
    filters: Optional[FiltersPost] = None
    weight: Optional[float] = None
