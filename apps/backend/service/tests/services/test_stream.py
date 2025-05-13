import pytest
from unittest.mock import AsyncMock, Mock, patch

from fastapi import HTTPException
from services.core.routes.stream import (
    create_stream_route,
    delete_stream_route,
    stream_by_id,
    streams_in_campaign,
    update_stream_route,
)
from services.core.routes.schemas.stream import StreamGet, StreamPatch, StreamPost
from services.core.routes.schemas.filter import (
    FilterDeviceTypeGet,
    FilterGeoLocationsGet,
    FilterOSTypeGet,
    FilterPageGet,
    FilterTimeFrameGet,
    FilterGeoLocationGet,
    FilterTimeFramesGet,
)
from database import Campaign, Stream

def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    return info

@pytest.mark.asyncio
async def test_streams_in_campaign_successful():
    with patch(
        'services.core.routes.stream.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.stream.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.stream.get_streams_by_campaign_id_db', new_callable=AsyncMock
    ) as mock_get_streams:

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.project_id = 1
        mock_get_campaign.return_value = mock_campaign
        mock_permission.return_value = True

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.name = "Test Stream"
        mock_stream.deleted = False
        mock_stream.active = True
        mock_stream.campaign_id = 1
        mock_stream.weight = 1
        mock_stream.os_types_filter = []
        mock_stream.device_types_filter = []
        mock_stream.pages_filter = []
        mock_stream.geo_locations_filter = []
        mock_stream.time_frames_filter = []
        mock_get_streams.return_value = [mock_stream]

        info = mock_info()
        response = await streams_in_campaign(info, 1)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], StreamGet)
        assert response[0].id == 1
        assert response[0].name == "Test Stream"

@pytest.mark.asyncio
async def test_stream_by_id_successful():
    with patch(
        'services.core.routes.stream.get_stream_by_id_db', new_callable=AsyncMock
    ) as mock_get_stream, patch(
        'services.core.routes.stream.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.stream.write_permission', new_callable=AsyncMock
    ) as mock_permission:

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.name = "Test Stream"
        mock_stream.deleted = False
        mock_stream.active = True
        mock_stream.campaign_id = 1
        mock_stream.weight = 1
        mock_stream.os_types_filter = []
        mock_stream.device_types_filter = []
        mock_stream.pages_filter = []
        mock_stream.geo_locations_filter = []
        mock_stream.time_frames_filter = []
        mock_get_stream.return_value = mock_stream

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.project_id = 1
        mock_get_campaign.return_value = mock_campaign

        mock_permission.return_value = True

        info = mock_info()
        response = await stream_by_id(info, 1)

        assert isinstance(response, StreamGet)
        assert response.id == 1
        assert response.name == "Test Stream"

@pytest.mark.asyncio
async def test_create_stream_successful():
    with patch(
        'services.core.routes.stream.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.stream.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.stream.create_stream_db', new_callable=AsyncMock
    ) as mock_create:

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.project_id = 1
        mock_get_campaign.return_value = mock_campaign
        mock_permission.return_value = True

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.name = "Test Stream"
        mock_stream.deleted = False
        mock_stream.active = True
        mock_stream.campaign_id = 1
        mock_stream.weight = 1
        mock_stream.os_types_filter = []
        mock_stream.device_types_filter = []
        mock_stream.pages_filter = []
        mock_stream.geo_locations_filter = []
        mock_stream.time_frames_filter = []
        mock_create.return_value = mock_stream

        stream_post = StreamPost(
            name="Test Stream",
            campaign_id=1,
            weight=1,
            active=True,
            deleted=False,
            filters=[]
        )

        info = mock_info()
        response = await create_stream_route(info, stream_post)

        assert isinstance(response, StreamGet)
        assert response.id == 1
        assert response.name == "Test Stream"

@pytest.mark.asyncio
async def test_update_stream_successful():
    with patch(
        'services.core.routes.stream.get_stream_by_id_db', new_callable=AsyncMock
    ) as mock_get_stream, patch(
        'services.core.routes.stream.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.stream.update_stream_by_id_db', new_callable=AsyncMock
    ) as mock_update:

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.project_id = 1
        mock_stream.name = "Test Stream"
        mock_stream.deleted = False
        mock_stream.active = True
        mock_stream.campaign_id = 1
        mock_stream.weight = 1
        mock_stream.os_types_filter = []
        mock_stream.device_types_filter = []
        mock_stream.pages_filter = []
        mock_stream.geo_locations_filter = []
        mock_stream.time_frames_filter = []
        mock_get_stream.return_value = mock_stream
        mock_update.return_value = mock_stream
        mock_permission.return_value = True

        stream_patch = StreamPatch(
            id=1,
            name="Updated Stream",
            active=True,
            deleted=False,
            weight=2,
            filters=[]
        )

        info = mock_info()
        response = await update_stream_route(info, stream_patch)

        assert isinstance(response, StreamGet)
        assert response.id == 1
        assert response.name == "Test Stream"

@pytest.mark.asyncio
async def test_delete_stream_successful():
    with patch(
        'services.core.routes.stream.get_stream_by_id_db', new_callable=AsyncMock
    ) as mock_get_stream, patch(
        'services.core.routes.stream.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.stream.delete_stream_by_id_db', new_callable=AsyncMock
    ) as mock_delete:

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.project_id = 1
        mock_get_stream.return_value = mock_stream
        mock_permission.return_value = True

        info = mock_info()
        await delete_stream_route(info, 1)

        mock_delete.assert_called_once_with(info.context.session(), 1)
