import requests

from conf.settings import logger


class GeoLocation:
    def __init__(
        self, city: str | None = None, region: str | None = None, country: str | None = None
    ):
        self.city = city
        self.region = region
        self.country = country


def get_location_by_ip(ip_address: str) -> GeoLocation:
    logger.info(f"Getting geolocation for IP address: {ip_address}")
    try:
        logger.debug(f"Making request to ip-api.com for {ip_address}")
        response = requests.get(f'http://ip-api.com/json/{ip_address}')
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()
        logger.debug(f"Received location data: {data}")

        location = GeoLocation(
            city=data.get('city'), region=data.get('regionName'), country=data.get('country')
        )
        logger.info(
            f"Found location: city={location.city}, region={location.region}, country={location.country}"
        )
        return location

    except requests.RequestException as e:
        # Handle network/HTTP errors
        logger.error(f"Error making request to IP API: {str(e)}")
        return GeoLocation()
    except ValueError as e:
        # Handle JSON parsing errors
        logger.error(f"Error parsing location data: {str(e)}")
        return GeoLocation()
