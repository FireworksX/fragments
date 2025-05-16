import pytest
from unittest.mock import AsyncMock, Mock, patch

from fastapi import HTTPException
from services.core.routes.landing import (
    create_landing_route,
    delete_landing_route,
    landing_by_id,
    landings_in_stream,
    update_landing_route,
    get_client_landing
)
from services.core.routes.schemas.landing import LandingGet, LandingPatch, LandingPost, ClientInfo
from database import Landing, Stream, Project, Fragment
from crud.ipgetter import GeoLocation

def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    info.context.client_info = AsyncMock(return_value=Mock(ip_address="1.2.3.4"))
    info.context.client = AsyncMock(return_value=Mock(id=1))
    info.context.project = AsyncMock(return_value=Mock(id=1))
    return info

@pytest.mark.asyncio
async def test_create_landing_successful():
    with patch(
        'services.core.routes.landing.get_stream_by_id_db', new_callable=AsyncMock
    ) as mock_get_stream, patch(
        'services.core.routes.landing.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.landing.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.landing.create_landing_db', new_callable=AsyncMock
    ) as mock_create, patch(
        'services.core.routes.project.get_user_project_role', new_callable=AsyncMock
    ) as mock_role:

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1
        mock_stream.project_id = 1
        mock_get_stream.return_value = mock_stream

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.members = []
        mock_get_project.return_value = mock_project
        
        mock_permission.return_value = True
        mock_role.return_value = 1
        mock_landing = Mock(spec=Landing)
        mock_landing.id = 1
        mock_landing.name = "Test Landing"
        mock_landing.props = None
        mock_landing.weight = 1
        mock_landing.fragment = None
        mock_landing.stream = mock_stream
        mock_landing.active = True
        mock_landing.deleted = False
        mock_create.return_value = mock_landing

        landing_post = LandingPost(
            name="Test Landing", 
            stream_id=1,
            fragment_id=None,
            props=None,
            weight=1,
            active=True,
            deleted=False
        )

        info = mock_info()
        response = await create_landing_route(info, landing_post)

        assert isinstance(response, LandingGet)
        assert response.id == 1
        assert response.name == "Test Landing"

@pytest.mark.asyncio
async def test_get_client_landing_successful():
    with patch(
        'services.core.routes.landing.get_best_landing', new_callable=AsyncMock
    ) as mock_get_best, patch(
        'services.core.routes.landing.get_location_by_ip', new_callable=Mock
    ) as mock_get_location, patch(
        'services.core.routes.landing.create_landing_metric_db', new_callable=AsyncMock
    ) as mock_create_metric, patch(
        'services.core.routes.landing.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.landing.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.utils.get_user_project_role', new_callable=AsyncMock
    ) as mock_role, patch(
        'services.core.routes.fragment.get_fragment_by_id_db', new_callable=AsyncMock
    ) as mock_get_fragment:

        mock_stream = Mock(spec=Stream)
        mock_stream.campaign_id = 1

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.members = []
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True
        mock_role.return_value = 1
        mock_fragment = Mock(spec=Fragment)
        mock_fragment.id = 1
        mock_fragment.name = "Test Fragment"
        mock_fragment.project_id = 1
        mock_fragment.linked_fragments = []
        mock_fragment.assets = []
        mock_get_fragment.return_value = mock_fragment

        mock_landing = Mock(spec=Landing)
        mock_landing.id = 1
        mock_landing.name = "Test Landing"
        mock_landing.stream = mock_stream
        mock_landing.fragment = mock_fragment
        mock_get_best.return_value = mock_landing

        mock_location = Mock(spec=GeoLocation)
        mock_location.country = "US"
        mock_location.region = "CA" 
        mock_location.city = "San Francisco"
        mock_get_location.return_value = mock_location

        info = mock_info()
        response = await get_client_landing(info)

        assert isinstance(response, LandingGet)
        assert response.id == 1
        assert response.name == "Test Landing"
        mock_create_metric.assert_called_once()

@pytest.mark.asyncio 
async def test_delete_landing_successful():
    with patch(
        'services.core.routes.landing.get_landing_by_id_db', new_callable=AsyncMock
    ) as mock_get_landing, patch(
        'services.core.routes.landing.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.landing.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.landing.delete_landing_by_id_db', new_callable=AsyncMock
    ) as mock_delete:

        mock_landing = Mock(spec=Landing)
        mock_landing.id = 1
        mock_landing.project_id = 1
        mock_get_landing.return_value = mock_landing

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get_project.return_value = mock_project

        mock_permission.return_value = True

        info = mock_info()
        await delete_landing_route(info, 1)

        mock_delete.assert_called_once_with(info.context.session(), 1)

@pytest.mark.asyncio
async def test_update_landing_successful():
    with patch(
        'services.core.routes.landing.get_landing_by_id_db', new_callable=AsyncMock
    ) as mock_get_landing, patch(
        'services.core.routes.landing.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.landing.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.landing.update_landing_by_id_db', new_callable=AsyncMock
    ) as mock_update, patch(
        'services.core.routes.utils.get_user_project_role', new_callable=AsyncMock
    ) as mock_role, patch(
        'services.core.routes.fragment.update_fragment_by_id_db', new_callable=AsyncMock
    ) as mock_update_fragment, patch(
        'services.core.routes.fragment.get_fragment_by_id_db', new_callable=AsyncMock
    ) as mock_get_fragment:

        mock_stream = Mock(spec=Stream)
        mock_stream.id = 1

        mock_fragment = Mock(spec=Fragment)
        mock_fragment.id = 2
        mock_fragment.name = "Test Fragment"
        mock_fragment.project_id = 1
        mock_fragment.linked_fragments = []
        mock_fragment.assets = []
        mock_get_fragment.return_value = mock_fragment
        mock_update_fragment.return_value = mock_fragment

        mock_landing = Mock(spec=Landing)
        mock_landing.id = 1
        mock_landing.project_id = 1
        mock_landing.fragment_id = 2
        mock_landing.fragment = mock_fragment
        mock_landing.name = "Test Landing"
        mock_landing.stream = mock_stream
        mock_get_landing.return_value = mock_landing
        mock_update.return_value = mock_landing

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.owner_id = 123
        mock_project.members = []
        mock_get_project.return_value = mock_project

        mock_permission.return_value = True
        mock_role.return_value = 1

        landing_patch = LandingPatch(
            id=1,
            name="Updated Landing",
            active=True,
            deleted=False,
            fragment_id=2
        )

        info = mock_info()
        response = await update_landing_route(info, landing_patch)

        assert isinstance(response, LandingGet)
        assert response.id == 1
        assert response.name == "Test Landing"
        assert response.fragment.name == "Test Fragment"
