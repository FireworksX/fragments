import requests


class GeoLocation:
    def __init__(self, city: str, region: str, country: str):
        self.city = city
        self.region = region
        self.country = country


def get_location_by_ip(ip_address: str) -> GeoLocation:
    response = requests.get(f'http://ip-api.com/json/{ip_address}')
    data = response.json()
    return GeoLocation(city=data['city'], region=data['regionName'], country=data['country'])
