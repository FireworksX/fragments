import requests


class GeoLocation:
    def __init__(self, city: str, region: str, country: str):
        self.city = city
        self.region = region
        self.country = country


def get_location_by_ip(ip_address: str) -> GeoLocation:
    try:
        response = requests.get(f'http://ip-api.com/json/{ip_address}')
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()
        
        # Check if required fields exist in response
        if not all(key in data for key in ['city', 'regionName', 'country']):
            raise KeyError("Missing required location data fields")
            
        return GeoLocation(
            city=data['city'],
            region=data['regionName'], 
            country=data['country']
        )
    except requests.RequestException as e:
        # Handle network/HTTP errors
        print(f"Error making request to IP API: {str(e)}")
        return GeoLocation(city="", region="", country="")
    except (KeyError, ValueError) as e:
        # Handle JSON parsing or missing data errors
        print(f"Error parsing location data: {str(e)}")
        return GeoLocation(city="", region="", country="")
