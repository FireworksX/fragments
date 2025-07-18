import datetime
from enum import Enum
from typing import List, Optional, Union

import strawberry


@strawberry.enum
class OSType(Enum):
    ANDROID = 1
    IOS = 2
    WINDOWS = 3
    LINUX = 4
    MACOS = 5


@strawberry.enum
class DeviceType(Enum):
    TABLET = 1
    DESKTOP = 2
    MOBILE = 3


@strawberry.type
class FilterOSTypeGet:
    os_types: List[OSType]


@strawberry.type
class FilterDeviceTypeGet:
    device_types: List[DeviceType]


@strawberry.type
class FilterPageGet:
    pages: List[str]


@strawberry.type
class FilterGeoLocationGet:
    country: str
    region: Optional[str] = None
    city: Optional[str] = None


@strawberry.type
class FilterTimeFrameGet:
    from_time: datetime.datetime
    to_time: datetime.datetime
    
@strawberry.type
class FilterTimeFramesGet:
    time_frames: List[FilterTimeFrameGet]

@strawberry.type
class FilterGeoLocationsGet:
    geo_locations: List[FilterGeoLocationGet]

@strawberry.type
class RegionGet:
    region: str
    cities: List[str]


@strawberry.type
class CountryGet:
    country: str
    regions: List[RegionGet]


@strawberry.type
class AllFiltersGet:
    device_types: List[DeviceType]
    os_types: List[OSType]
    geo_locations: List[CountryGet]


@strawberry.input
class FilterTimeFramePost:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.input
class FilterGeoLocationPost:
    country: str
    region: Optional[str] = None
    city: Optional[str] = None


@strawberry.enum
class FilterType(Enum):
    PAGE = 1
    DEVICE_TYPE = 2
    OS_TYPE = 3
    TIME_FRAME = 4
    GEO_LOCATION = 5


@strawberry.type
class ConditionGet:
    id: int
    name: str
    filter_data: Union[None,FilterPageGet, FilterDeviceTypeGet, FilterOSTypeGet, FilterTimeFramesGet, FilterGeoLocationsGet]

@strawberry.type
class ConditionSetGet:
    id: int
    name: str
    conditions: List[ConditionGet]


@strawberry.type
class ReleaseConditionGet:
    id: int
    name: str
    condition_sets: List[ConditionSetGet]


@strawberry.input
class FilterPost:
    pages: List[str] = None
    device_types: List[DeviceType] = None
    os_types: List[OSType] = None
    time_frames: List[FilterTimeFramePost] = None
    geo_locations: List[FilterGeoLocationPost] = None

@strawberry.input
class ConditionPost:
    name: str
    filter_data: FilterPost


@strawberry.input
class ConditionSetPost:
    name: str
    conditions: List[ConditionPost]


@strawberry.input
class ReleaseConditionPost:
    name: str
    condition_sets: List[ConditionSetPost]
    project_id: int

@strawberry.input
class ReleaseConditionPatch:
    id: int
    name: Optional[str] = None
    condition_sets: Optional[List[ConditionSetPost]] = None


@strawberry.input
class ConditionSetPatch:
    id: int
    name: Optional[str] = None
    conditions: Optional[List[ConditionPost]] = None


@strawberry.input
class ConditionPatch:
    id: int
    name: Optional[str] = None
    filter_data: Optional[FilterPost] = None
