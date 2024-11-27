from typing import List, Union

import strawberry

from database import Session
from .schemas.filter import FilterOSTypeGet, FilterDeviceTypeGet, OSType, FilterType, DeviceType, FilterGeoLocationGet
from services.core.routes.middleware import Context
from .schemas.user import AuthPayload
from crud.geolocation import get_geo_locations


async def get_all_filters(info: strawberry.Info[Context]) -> List[
    Union[FilterOSTypeGet, FilterDeviceTypeGet | FilterGeoLocationGet]]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    res: List[Union[FilterOSTypeGet, FilterDeviceTypeGet | FilterGeoLocationGet]] = []
    for v in OSType:
        res.append(FilterOSTypeGet(os_type=v, type=FilterType.OSType))
    for v in DeviceType:
        res.append(FilterDeviceTypeGet(device_type=v, type=FilterType.DeviceType))
    locations = get_geo_locations(db)
    for v in locations:
        res.append(FilterGeoLocationGet(type=FilterType.GeoLocationType, country=v.country, city=v.city, region=v.region))
    return res
