import datetime
from enum import Enum
from typing import Optional, List

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
class FilterGeoLocationsGet:
    geo_locations: List[FilterGeoLocationGet]


@strawberry.type
class FilterTimeFrameGet:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.type
class FilterTimeFramesGet:
    time_frames: List[FilterTimeFrameGet]


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
