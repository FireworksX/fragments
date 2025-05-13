import pytest
from unittest.mock import Mock, AsyncMock, patch
from fastapi import HTTPException
from strawberry.types import Info

from services.core.routes.router import Query, Mutation
from services.core.routes.middleware import Context
from services.core.routes.schemas.user import AuthPayload
from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.campaign import CampaignGet
from services.core.routes.schemas.stream import StreamGet
from services.core.routes.schemas.project import ProjectGet
from services.core.routes.schemas.landing import LandingGet
from services.core.routes.schemas.filter import AllFiltersGet
from services.core.routes.schemas.filesystem import ProjectDirectoryGet
from services.core.routes.schemas.metric import LandingMetricGet

def mock_info():
    context = Mock(spec=Context)
    info = Mock(spec=Info)
    info.context = context
    return info

@pytest.mark.asyncio
async def test_query_profile():
    with patch('services.core.routes.router.profile', new_callable=AsyncMock) as mock_profile:
        mock_auth = Mock(spec=AuthPayload)
        mock_profile.return_value = mock_auth
        
        query = Query()
        info = mock_info()
        result = await query.profile(info)
        
        assert result == mock_auth
        mock_profile.assert_called_once_with(info)

@pytest.mark.asyncio
async def test_query_fragments():
    with patch('services.core.routes.router.fragments_by_ids', new_callable=AsyncMock) as mock_fragments:
        mock_fragment = Mock(spec=FragmentGet)
        mock_fragments.return_value = [mock_fragment]
        
        query = Query()
        info = mock_info()
        result = await query.fragment(info, fragment_ids=[1], project_id=1)
        
        assert result == [mock_fragment]
        mock_fragments.assert_called_once_with(info, [1], 1)

@pytest.mark.asyncio
async def test_query_landing_metrics():
    with patch('services.core.routes.router.get_landing_metrics', new_callable=AsyncMock) as mock_metrics:
        mock_metric = Mock(spec=LandingMetricGet)
        mock_metrics.return_value = [mock_metric]
        
        query = Query()
        info = mock_info()
        result = await query.landing_metric(info, landing_id=1)
        
        assert result == [mock_metric]
        mock_metrics.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_campaign_by_id():
    with patch('services.core.routes.router.campaign_by_id', new_callable=AsyncMock) as mock_campaign:
        mock_camp = Mock(spec=CampaignGet)
        mock_campaign.return_value = mock_camp
        
        query = Query()
        info = mock_info()
        result = await query.campaign(info, campgain_id=1)
        
        assert result == [mock_camp]
        mock_campaign.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_campaigns_in_project():
    with patch('services.core.routes.router.campaigns_in_project', new_callable=AsyncMock) as mock_campaigns:
        mock_camp = Mock(spec=CampaignGet)
        mock_campaigns.return_value = [mock_camp]
        
        query = Query()
        info = mock_info()
        result = await query.campaign(info, project_id=1, active=True, deleted=False)
        
        assert result == [mock_camp]
        mock_campaigns.assert_called_once_with(info, 1, True, False)

@pytest.mark.asyncio
async def test_query_campaign_by_name():
    with patch('services.core.routes.router.campaign_by_name', new_callable=AsyncMock) as mock_campaign:
        mock_camp = Mock(spec=CampaignGet)
        mock_campaign.return_value = [mock_camp]
        
        query = Query()
        info = mock_info()
        result = await query.campaign_by_name(info, project_id=1, name="test", limit=5)
        
        assert result == [mock_camp]
        mock_campaign.assert_called_once_with(info, 1, "test", 5, None, None)

@pytest.mark.asyncio
async def test_query_stream_by_id():
    with patch('services.core.routes.router.stream_by_id', new_callable=AsyncMock) as mock_stream:
        mock_strm = Mock(spec=StreamGet)
        mock_stream.return_value = mock_strm
        
        query = Query()
        info = mock_info()
        result = await query.stream(info, stream_id=1)
        
        assert result == [mock_strm]
        mock_stream.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_streams_in_campaign():
    with patch('services.core.routes.router.streams_in_campaign', new_callable=AsyncMock) as mock_streams:
        mock_strm = Mock(spec=StreamGet)
        mock_streams.return_value = [mock_strm]
        
        query = Query()
        info = mock_info()
        result = await query.stream(info, campaign_id=1, active=True, deleted=False)
        
        assert result == [mock_strm]
        mock_streams.assert_called_once_with(info, 1, True, False)

@pytest.mark.asyncio
async def test_query_project_by_id():
    with patch('services.core.routes.router.project_by_id', new_callable=AsyncMock) as mock_project:
        mock_proj = Mock(spec=ProjectGet)
        mock_project.return_value = mock_proj
        
        query = Query()
        info = mock_info()
        result = await query.project(info, project_id=1)
        
        assert result == [mock_proj]
        mock_project.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_all_projects():
    with patch('services.core.routes.router.projects', new_callable=AsyncMock) as mock_projects:
        mock_proj = Mock(spec=ProjectGet)
        mock_projects.return_value = [mock_proj]
        
        query = Query()
        info = mock_info()
        result = await query.project(info)
        
        assert result == [mock_proj]
        mock_projects.assert_called_once_with(info)

@pytest.mark.asyncio
async def test_query_landing_by_id():
    with patch('services.core.routes.router.landing_by_id', new_callable=AsyncMock) as mock_landing:
        mock_land = Mock(spec=LandingGet)
        mock_landing.return_value = mock_land
        
        query = Query()
        info = mock_info()
        result = await query.landing(info, landing_id=1)
        
        assert result == [mock_land]
        mock_landing.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_landings_in_stream():
    with patch('services.core.routes.router.landings_in_stream', new_callable=AsyncMock) as mock_landings:
        mock_land = Mock(spec=LandingGet)
        mock_landings.return_value = [mock_land]
        
        query = Query()
        info = mock_info()
        result = await query.landing(info, stream_id=1)
        
        assert result == [mock_land]
        mock_landings.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_filters():
    with patch('services.core.routes.router.get_all_filters', new_callable=AsyncMock) as mock_filters:
        mock_filter = Mock(spec=AllFiltersGet)
        mock_filters.return_value = mock_filter
        
        query = Query()
        info = mock_info()
        result = await query.filter(info, countries=["US"], regions=["CA"])
        
        assert result == mock_filter
        mock_filters.assert_called_once_with(info, ["US"], ["CA"])

@pytest.mark.asyncio
async def test_query_directory():
    with patch('services.core.routes.router.get_directory', new_callable=AsyncMock) as mock_directory:
        mock_dir = Mock(spec=ProjectDirectoryGet)
        mock_directory.return_value = [mock_dir]
        
        query = Query()
        info = mock_info()
        result = await query.directory(info, directory_id=1)
        
        assert result == [mock_dir]
        mock_directory.assert_called_once_with(info, 1)

@pytest.mark.asyncio
async def test_query_client_landing():
    with patch('services.core.routes.router.get_client_landing', new_callable=AsyncMock) as mock_landing:
        mock_land = Mock(spec=LandingGet)
        mock_landing.return_value = mock_land
        
        query = Query()
        info = mock_info()
        result = await query.client_landing(info)
        
        assert result == mock_land
        mock_landing.assert_called_once_with(info)

@pytest.mark.asyncio
async def test_query_client_fragment():
    with patch('services.core.routes.router.get_client_fragment', new_callable=AsyncMock) as mock_fragment:
        mock_frag = Mock(spec=FragmentGet)
        mock_fragment.return_value = mock_frag
        
        query = Query()
        info = mock_info()
        result = await query.client_fragment(info, fragment_id=1)
        
        assert result == mock_frag
        mock_fragment.assert_called_once_with(info, 1)
