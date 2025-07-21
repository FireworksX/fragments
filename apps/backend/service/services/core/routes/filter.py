from typing import Dict, List, Optional

import strawberry

from crud.geolocation import get_geo_locations
from database import Session
from services.core.routes.middleware import Context

from .schemas.release_condition import AllFiltersGet, CountryGet, DeviceType, OSType, RegionGet
from .schemas.user import AuthPayload
from conf.settings import logger


async def get_all_filters(
    info: strawberry.Info[Context],
    countries_filter: Optional[List[str]] = None,
    regions_filter: Optional[List[str]] = None,
) -> AllFiltersGet:
    logger.info("Getting all filters")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    
    logger.debug("Getting OS types and device types")
    os_types: List[OSType] = [v for v in OSType]
    device_types: List[DeviceType] = [v for v in DeviceType]
    
    logger.debug(f"Getting geo locations with countries filter: {countries_filter} and regions filter: {regions_filter}")
    locations = get_geo_locations(db, countries_filter, regions_filter)

    logger.debug("Building country dictionary")
    country_dict: Dict[str, Dict[str, List[str]]] = {}
    for location in locations:
        if location.country not in country_dict and location.country is not None:
            country_dict[location.country] = {}
        if location.region not in country_dict[location.country] and location.region is not None:
            country_dict[location.country][location.region] = []
        if location.country is not None and location.region is not None:
            country_dict[location.country][location.region].append(location.city)

    logger.debug("Building countries list")
    countries: List[CountryGet] = []
    for country, regions in country_dict.items():
        regions_list = [
            RegionGet(region=region, cities=list(set(cities)))  # Remove duplicate cities
            for region, cities in regions.items()
        ]
        countries.append(CountryGet(country=country, regions=regions_list))
    
    logger.info(f"Found {len(countries)} countries, {len(os_types)} OS types, and {len(device_types)} device types")
    return AllFiltersGet(device_types=device_types, os_types=os_types, geo_locations=countries)
