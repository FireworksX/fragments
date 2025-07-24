import json
from typing import Optional, List
from functools import lru_cache

import pycountry

from database import GeoLocation, Session
from conf.settings import logger
from utils.lru_cache import CustomLRUCache


@lru_cache(maxsize=128)
def get_country_name(country_code: str):
    logger.debug(f"Getting country name for code: {country_code}")
    try:
        country_name = pycountry.countries.get(alpha_2=country_code.upper()).name
        logger.debug(f"Found country name: {country_name}")
        return country_name
    except AttributeError:
        logger.warning(f"Invalid country code: {country_code}")
        return 'Invalid country code'


# Global cache instance
geo_cache = CustomLRUCache(maxsize=128)

def get_geo_locations(
    db: Session, countries_filter: Optional[List[str]], regions_filter: Optional[List[str]]
) -> List[GeoLocation]:
    logger.info("Getting geo locations")
    logger.debug(f"Filters - countries: {countries_filter}, regions: {regions_filter}")
    
    # Create cache key from the filter values
    cache_key = (
        tuple(countries_filter) if countries_filter else None,
        tuple(regions_filter) if regions_filter else None
    )
    
    # Try to get from cache
    cached_results = geo_cache.get(cache_key)
    if cached_results is not None:
        logger.debug("Returning cached geo locations")
        return cached_results
    
    geo_locations: List[GeoLocation] = db.query(GeoLocation).all()
    if not geo_locations:
        logger.info("No geo locations found in DB, loading from file")
        with open('/opt/app/data/cities500.json', 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Convert JSON objects to instances of GeoLocationGet
        logger.debug(f"Converting {len(data)} locations from JSON")
        geo_locations: List[GeoLocation] = [
            GeoLocation(
                country=get_country_name(item.get('country', '')),
                region=item.get('admin1', ''),
                city=item.get('name', ''),
            )
            for item in data
        ]
        logger.debug("Adding locations to database")
        db.add_all(geo_locations)
        db.commit()
        logger.info(f"Added {len(geo_locations)} locations to database")

    query = db.query(GeoLocation)
    # Apply filters if provided
    if countries_filter:
        logger.debug(f"Filtering by countries: {countries_filter}")
        query = query.filter(GeoLocation.country.in_(countries_filter))
    if regions_filter:
        logger.debug(f"Filtering by regions: {regions_filter}")
        query = query.filter(GeoLocation.region.in_(regions_filter))

    # Execute the query and return the results
    results = query.all()
    logger.debug(f"Returning {len(results)} geo locations")
    
    # Cache the results before returning
    geo_cache.put(cache_key, results)
    
    return results
