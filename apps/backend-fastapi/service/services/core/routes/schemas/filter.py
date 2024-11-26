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


@strawberry.type
class GeoLocation:
    country: str
    region: Optional[str] = None
    city: Optional[str] = None


@strawberry.type
class TimeFrame:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.enum
class FilterType(Enum):
    OSType = 1
    DeviceType = 2
    PageType = 3
    TimeFrameType = 4
    GeoLocationType = 5


@strawberry.type
class FilterBase:
    toggled: Optional[bool] = True
    type: FilterType


@strawberry.type
class FilterOSType(FilterBase):
    os_type: OSType


@strawberry.type
class FilterDeviceType(FilterBase):
    device_type: DeviceType


@strawberry.type
class FilterPage(FilterBase):
    page: str


@strawberry.type
class FilterGeoLocation(FilterBase):
    geo_location: GeoLocation


@strawberry.type
class FilterTimeFrame(FilterBase):
    time_frame: TimeFrame


@strawberry.enum
class OSTypFilterGet(Enum):
    ANDROID = 1
    IOS = 2
    WINDOWS = 3
    LINUX = 4
    MACOS = 5


@strawberry.enum
class DeviceTypeFilterGet(Enum):
    TABLET = 1
    DESKTOP = 2
    MOBILE = 3


@strawberry.type
class GeoLocationFilterGet:
    country: str
    region: str
    city: str


@strawberry.type
class TimeFrameFilterGet:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.input
class TimeFrameFilterPost:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.input
class GeoLocationFilterPost:
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
