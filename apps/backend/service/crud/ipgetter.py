import requests


class GeoLocation:
    def __init__(
        self, city: str | None = None, region: str | None = None, country: str | None = None
    ):
        self.city = city
        self.region = region
        self.country = country


def get_location_by_ip(ip_address: str) -> GeoLocation:
    try:
        response = requests.get(f'http://ip-api.com/json/{ip_address}')
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()

        return GeoLocation(
            city=data.get('city'), region=data.get('regionName'), country=data.get('country')
        )
    except requests.RequestException as e:
        # Handle network/HTTP errors
        print(f"Error making request to IP API: {str(e)}")
        return GeoLocation()
    except ValueError as e:
        # Handle JSON parsing errors
        print(f"Error parsing location data: {str(e)}")
        return GeoLocation()
