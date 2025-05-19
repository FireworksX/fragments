from unittest.mock import AsyncMock, Mock, patch

import pytest
from fastapi import HTTPException

from database.models.models import LandingMetric
from services.core.routes.metric import (
    create_landing_metric,
    get_landing_metric,
    get_landing_metrics,
)
from services.core.routes.schemas.metric import LandingMetricGet, LandingMetricPost


def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.project = AsyncMock(return_value=Mock())
    info.context.session = Mock(return_value=Mock())
    info.context.client_info = AsyncMock(
        return_value=Mock(ip_address='127.0.0.1', device_type=None, os_type=None)
    )
    info.context.client = AsyncMock(return_value=Mock(id=1))
    return info


@pytest.mark.asyncio
async def test_get_landing_metrics():
    with patch(
        'services.core.routes.metric.get_landing_metrics_db', new_callable=AsyncMock
    ) as mock_get_metrics:
        mock_metric = Mock(spec=LandingMetric)
        mock_metric.id = 1
        mock_metric.landing_id = 1
        mock_metric.campaign_id = 1
        mock_metric.url = 'test.com'
        mock_metric.referrer = 'referrer.com'
        mock_metric.domain = 'test'
        mock_metric.subdomain = 'www'
        mock_metric.page_load_time = 100
        mock_metric.device_type = 'desktop'
        mock_metric.os_type = 'windows'
        mock_metric.browser = 'chrome'
        mock_metric.language = 'en'
        mock_metric.screen_width = 1920
        mock_metric.screen_height = 1080
        mock_metric.country = 'US'
        mock_metric.region = 'CA'
        mock_metric.city = 'San Francisco'
        mock_metric.created_at = None
        mock_metric.event = 'pageview'

        mock_get_metrics.return_value = [mock_metric]

        info = mock_info()
        response = await get_landing_metrics(info, landing_id=1)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], LandingMetricGet)
        assert response[0].url == 'test.com'


@pytest.mark.asyncio
async def test_get_landing_metric():
    with patch(
        'services.core.routes.metric.get_landing_metric_by_id_db', new_callable=AsyncMock
    ) as mock_get_metric:
        mock_metric = Mock(spec=LandingMetric)
        mock_metric.id = 1
        mock_metric.url = 'test.com'
        mock_get_metric.return_value = mock_metric

        info = mock_info()
        response = await get_landing_metric(info, metric_id=1)

        assert isinstance(response, LandingMetricGet)
        assert response.url == 'test.com'


@pytest.mark.asyncio
async def test_get_landing_metric_not_found():
    with patch(
        'services.core.routes.metric.get_landing_metric_by_id_db', new_callable=AsyncMock
    ) as mock_get_metric:
        mock_get_metric.return_value = None

        info = mock_info()
        with pytest.raises(HTTPException) as exc:
            await get_landing_metric(info, metric_id=1)

        assert exc.value.status_code == 404


@pytest.mark.asyncio
async def test_create_landing_metric():
    with patch(
        'services.core.routes.metric.create_landing_metric_db', new_callable=AsyncMock
    ) as mock_create_metric, patch(
        'services.core.routes.metric.get_location_by_ip', new_callable=Mock
    ) as mock_get_location:
        mock_metric = Mock(spec=LandingMetric)
        mock_metric.id = 1
        mock_metric.url = 'test.com'
        mock_create_metric.return_value = mock_metric

        mock_location = Mock()
        mock_location.country = 'US'
        mock_location.region = 'CA'
        mock_location.city = 'San Francisco'
        mock_get_location.return_value = mock_location

        info = mock_info()
        metric = LandingMetricPost(
            landing_id=1,
            campaign_id=1,
            url='test.com',
            domain='test',
            subdomain='www',
            page_load_time=100,
            browser='chrome',
            language='en',
            screen_width=1920,
            screen_height=1080,
            event='pageview',
        )

        response = await create_landing_metric(info, metric)

        assert isinstance(response, LandingMetricGet)
        assert response.url == 'test.com'
        mock_create_metric.assert_called_once()
