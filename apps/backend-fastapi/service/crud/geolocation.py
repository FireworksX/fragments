import json
from typing import List

from database import GeoLocation, Session


def get_geo_locations(db: Session) -> List[GeoLocation]:

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
    return geo_locations