import json
from typing import List, Optional

from database import GeoLocation, Session


def get_geo_locations(db: Session, countries_filter: Optional[List[str]],
                      regions_filter: Optional[List[str]]) -> List[GeoLocation]:
    geo_locations: List[GeoLocation] = db.query(GeoLocation).all()
    if not geo_locations:
        with open("/opt/app/data/cities500.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        # Convert JSON objects to instances of GeoLocationGet
        geo_locations: List[GeoLocation] = [
            GeoLocation(
                country=item.get("country", ""),
                region=item.get("admin1", ""),
                city=item.get("name", "")
            )
            for item in data
        ]
        db.add_all(geo_locations)
        db.commit()

    query = db.query(GeoLocation)
    # Apply filters if provided
    if countries_filter:
        query = query.filter(GeoLocation.country.in_(countries_filter))
    if regions_filter:
        query = query.filter(GeoLocation.region.in_(regions_filter))

    # Execute the query and return the results
    return query.all()
