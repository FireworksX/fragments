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
class StreamPost:
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    filters: List[
        Union[FilterOSTypePost | FilterDeviceTypePost | FilterPagePost | FilterGeoLocationPost | FilterTimeFramePost]]
    weight: float


@strawberry.input
class StreamPatch:
    id: int
    campaign_id: int
    active: Optional[bool] = None
    deleted: Optional[bool] = None
    name: Optional[str] = None
    filters: Optional[List[
        Union[
            FilterOSTypePost | FilterDeviceTypePost | FilterPagePost | FilterGeoLocationPost | FilterTimeFramePost]]] = None
    weight: Optional[float] = None
