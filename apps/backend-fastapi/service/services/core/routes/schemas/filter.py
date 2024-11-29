import datetime
from enum import Enum
from typing import Optional

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

@strawberry.enum
class FilterType(Enum):
    OSType = 1
    DeviceType = 2
    PageType = 3
    TimeFrameType = 4
    GeoLocationType = 5


@strawberry.type
class FilterBaseGet:
    toggled: Optional[bool] = True
    type: FilterType

@strawberry.input
class FilterBasePost:
    toggled: Optional[bool] = True


@strawberry.type
class FilterOSTypeGet(FilterBaseGet):
    os_type: OSType

@strawberry.input
class FilterOSTypePost(FilterBasePost):
    os_type: OSType

@strawberry.type
class FilterDeviceTypeGet(FilterBaseGet):
    device_type: DeviceType

@strawberry.input
class FilterDeviceTypePost(FilterBasePost):
    device_type: DeviceType

@strawberry.type
class FilterPageGet(FilterBaseGet):
    page: str

@strawberry.input
class FilterPagePost(FilterBasePost):
    page: str

@strawberry.type
class FilterGeoLocationGet(FilterBaseGet):
    country: str
    region: Optional[str] = None
    city: Optional[str] = None

@strawberry.input
class FilterGeoLocationPost(FilterBasePost):
    country: str
    region: Optional[str] = None
    city: Optional[str] = None

@strawberry.type
class FilterTimeFrameGet(FilterBaseGet):
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.input
class FilterTimeFramePost(FilterBasePost):
    from_time: datetime.datetime
    to_time: datetime.datetime
