from typing import List, Optional, Union

import strawberry

from services.core.routes.schemas.filter import FilterOSTypePost, FilterPagePost, FilterPageGet, FilterTimeFrameGet, \
    FilterTimeFramePost, FilterDeviceTypePost, FilterOSTypeGet, FilterDeviceTypeGet, FilterGeoLocationGet, \
    FilterGeoLocationPost


@strawberry.type
class StreamGet:
    id: int
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    filters: List[
        Union[FilterOSTypeGet | FilterDeviceTypeGet | FilterPageGet | FilterGeoLocationGet | FilterTimeFrameGet]]
    weight: float

@strawberry.input
class FiltersPost:
    os_types: Optional[List[FilterOSTypePost]] = None
    device_types: Optional[List[FilterDeviceTypePost]] = None
    geolocations: Optional[List[FilterGeoLocationPost]] = None
    time_frames: Optional[List[FilterTimeFramePost]] = None
    pages: Optional[List[FilterPagePost]] = None

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
