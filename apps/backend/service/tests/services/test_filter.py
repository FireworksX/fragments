from unittest.mock import AsyncMock, Mock, patch

import pytest

from database import GeoLocation
from services.core.routes.filter import get_all_filters
from services.core.routes.schemas.filter import (
    AllFiltersGet,
    CountryGet,
    DeviceType,
    OSType,
    RegionGet,
)


def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    return info


@pytest.mark.asyncio
async def test_get_all_filters_successful():
    with patch(
        'services.core.routes.filter.get_geo_locations', new_callable=Mock
    ) as mock_get_locations:

        mock_location1 = Mock(spec=GeoLocation)
        mock_location1.country = 'US'
        mock_location1.region = 'CA'
        mock_location1.city = 'San Francisco'

        mock_location2 = Mock(spec=GeoLocation)
        mock_location2.country = 'US'
        mock_location2.region = 'CA'
        mock_location2.city = 'Los Angeles'

        mock_location3 = Mock(spec=GeoLocation)
        mock_location3.country = 'US'
        mock_location3.region = 'NY'
        mock_location3.city = 'New York'

        mock_get_locations.return_value = [mock_location1, mock_location2, mock_location3]

        info = mock_info()
        response = await get_all_filters(info)

        assert isinstance(response, AllFiltersGet)
        assert len(response.device_types) == len(DeviceType)
        assert len(response.os_types) == len(OSType)
        assert len(response.geo_locations) == 1  # One country (US)

        us_data = response.geo_locations[0]
        assert us_data.country == 'US'
        assert len(us_data.regions) == 2  # CA and NY regions

        ca_region = next(r for r in us_data.regions if r.region == 'CA')
        assert len(ca_region.cities) == 2  # SF and LA
        assert 'San Francisco' in ca_region.cities
        assert 'Los Angeles' in ca_region.cities

        ny_region = next(r for r in us_data.regions if r.region == 'NY')
        assert len(ny_region.cities) == 1  # NYC
        assert 'New York' in ny_region.cities


@pytest.mark.asyncio
async def test_get_all_filters_with_filters():
    with patch(
        'services.core.routes.filter.get_geo_locations', new_callable=Mock
    ) as mock_get_locations:

        mock_location = Mock(spec=GeoLocation)
        mock_location.country = 'US'
        mock_location.region = 'CA'
        mock_location.city = 'San Francisco'

        mock_get_locations.return_value = [mock_location]

        info = mock_info()
        response = await get_all_filters(info, countries_filter=['US'], regions_filter=['CA'])

        assert isinstance(response, AllFiltersGet)
        mock_get_locations.assert_called_once_with(info.context.session(), ['US'], ['CA'])

        assert len(response.geo_locations) == 1
        assert response.geo_locations[0].country == 'US'
        assert len(response.geo_locations[0].regions) == 1
        assert response.geo_locations[0].regions[0].region == 'CA'
        assert len(response.geo_locations[0].regions[0].cities) == 1
        assert 'San Francisco' in response.geo_locations[0].regions[0].cities


@pytest.mark.asyncio
async def test_get_all_filters_empty_locations():
    with patch(
        'services.core.routes.filter.get_geo_locations', new_callable=Mock
    ) as mock_get_locations:

        mock_get_locations.return_value = []

        info = mock_info()
        response = await get_all_filters(info)

        assert isinstance(response, AllFiltersGet)
        assert len(response.device_types) == len(DeviceType)
        assert len(response.os_types) == len(OSType)
        assert len(response.geo_locations) == 0
