from typing import List, Dict, Optional

import strawberry

from database import Session
from .schemas.filter import OSType, DeviceType, AllFiltersGet, RegionGet, CountryGet
from services.core.routes.middleware import Context
from .schemas.user import AuthPayload
from crud.geolocation import get_geo_locations


async def get_all_filters(
    info: strawberry.Info[Context],
    countries_filter: Optional[List[str]] = None,
    regions_filter: Optional[List[str]] = None,
) -> AllFiltersGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    os_types: List[OSType] = [v for v in OSType]
    device_types: List[DeviceType] = [v for v in DeviceType]
    locations = get_geo_locations(db, countries_filter, regions_filter)

    country_dict: Dict[str, Dict[str, List[str]]] = {}
    for location in locations:
        if location.country not in country_dict and location.country is not None:
            country_dict[location.country] = {}
        if location.region not in country_dict[location.country] and location.region is not None:
            country_dict[location.country][location.region] = []
        if location.country is not None and location.region is not None:
            country_dict[location.country][location.region].append(location.city)

    countries: List[CountryGet] = []
    for country, regions in country_dict.items():
        regions_list = [
            RegionGet(region=region, cities=list(set(cities)))  # Remove duplicate cities
            for region, cities in regions.items()
        ]
        countries.append(CountryGet(country=country, regions=regions_list))
    return AllFiltersGet(device_types=device_types, os_types=os_types, geo_locations=countries)
