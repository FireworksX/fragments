from typing import List, Union

import strawberry

from database import Session
from .schemas.filter import FilterOSType, FilterDeviceType, OSType, FilterType, DeviceType, FilterGeoLocation, GeoLocation
from services.core.routes.middleware import Context
from .schemas.user import AuthPayload
from crud.geolocation import get_geo_locations


async def get_all_filters(info: strawberry.Info[Context]) -> List[
    Union[FilterOSType, FilterDeviceType | FilterGeoLocation]]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    res: List[Union[FilterOSType, FilterDeviceType | FilterGeoLocation]] = []
    for v in OSType:
        res.append(FilterOSType(os_type=v, type=FilterType.OSType))
    for v in DeviceType:
        res.append(FilterDeviceType(device_type=v, type=FilterType.DeviceType))
    locations = get_geo_locations(db)
    for v in locations:
        res.append(FilterGeoLocation(type=FilterType.GeoLocationType, geo_location=GeoLocation(country=v.country, city=v.city, region=v.region)))
    return res
