import json
from typing import List

import requests

from services.core.routes.schemas import GeoLocationFilterGet


def get_location_by_ip(ip_address: str):
    response = requests.get(f'http://ip-api.com/json/{ip_address}')
    data = response.json()
    return GeoLocationFilterGet(city=data['city'], region=data['regionName'], country=data['country'], lat=data['lat'],
                                long=data['lon'])
