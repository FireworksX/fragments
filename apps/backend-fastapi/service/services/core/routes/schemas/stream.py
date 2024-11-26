from typing import List, Optional

import strawberry

from services.core.routes.schemas import OSTypFilterGet, DeviceTypeFilterGet, GeoLocationFilterGet, \
    TimeFrameFilterGet, TimeFrameFilterPost, GeoLocationFilterPost


@strawberry.type
class StreamGet:
    id: int
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    os_types: List[OSTypFilterGet]
    device_types: List[DeviceTypeFilterGet]
    pages: List[str]
    geo_locations: List[GeoLocationFilterGet]
    time_frames: List[TimeFrameFilterGet]
    weight: float


@strawberry.input
class StreamPost:
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    os_types: Optional[List[OSTypFilterGet]] = None
    device_types: Optional[List[DeviceTypeFilterGet]] = None
    pages: Optional[List[str]] = None
    geo_locations: Optional[List[GeoLocationFilterPost]] = None
    time_frames: Optional[List[TimeFrameFilterPost]] = None
    weight: float


@strawberry.input
class StreamPatch:
    id: int
    campaign_id: int
    active: Optional[bool] = None
    deleted: Optional[bool] = None
    name: Optional[str] = None
    os_types: Optional[List[OSTypFilterGet]] = None
    device_types: Optional[List[DeviceTypeFilterGet]] = None
    pages: Optional[List[str]] = None
    geo_locations: Optional[List[GeoLocationFilterPost]] = None
    time_frames: Optional[List[TimeFrameFilterPost]] = None
    weight: Optional[float] = None
