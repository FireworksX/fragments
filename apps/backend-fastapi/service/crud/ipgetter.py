import requests

from services.core.routes.schemas import GeoLocation

def get_location_by_ip(ip_address: str):
    response = requests.get(f'http://ip-api.com/json/{ip_address}')
    data = response.json()
    return GeoLocation(city=data['city'], region=data['regionName'], country=data['country'], lat=data['lat'], long=data['lon'])
