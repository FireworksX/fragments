from unittest.mock import AsyncMock, Mock, patch

import pytest
from fastapi import HTTPException, UploadFile

from database import Campaign, Media, Project
from services.core.routes.campaign import (
    add_campaign_logo_route,
    campaign_by_id,
    campaign_by_name,
    campaigns_in_project,
    create_campaign_route,
    delete_campaign_logo_route,
    delete_campaign_route,
    update_campaign_route,
)
from services.core.routes.schemas.campaign import CampaignGet, CampaignPatch, CampaignPost
from services.core.routes.schemas.media import MediaGet, MediaType


def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    return info


@pytest.mark.asyncio
async def test_campaigns_in_project_successful():
    with patch(
        'services.core.routes.campaign.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.campaign.read_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.campaign.get_campaigns_by_project_id_db', new_callable=AsyncMock
    ) as mock_get_campaigns:

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.name = 'Test Campaign'
        mock_campaign.description = 'Test Description'
        mock_campaign.deleted = False
        mock_campaign.active = True
        mock_campaign.logo = None
        mock_campaign.author = 123
        mock_campaign.project_id = 1
        mock_get_campaigns.return_value = [mock_campaign]

        info = mock_info()
        response = await campaigns_in_project(info, 1)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], CampaignGet)
        assert response[0].id == 1
        assert response[0].name == 'Test Campaign'


@pytest.mark.asyncio
async def test_campaign_by_id_successful():
    with patch(
        'services.core.routes.campaign.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.campaign.read_permission', new_callable=AsyncMock
    ) as mock_permission:

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.name = 'Test Campaign'
        mock_campaign.description = 'Test Description'
        mock_campaign.deleted = False
        mock_campaign.active = True
        mock_campaign.logo = None
        mock_campaign.author = 123
        mock_campaign.project_id = 1
        mock_get_campaign.return_value = mock_campaign
        mock_permission.return_value = True

        info = mock_info()
        response = await campaign_by_id(info, 1)

        assert isinstance(response, CampaignGet)
        assert response.id == 1
        assert response.name == 'Test Campaign'


@pytest.mark.asyncio
async def test_create_campaign_successful():
    with patch(
        'services.core.routes.campaign.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.campaign.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.campaign.create_campaign_db', new_callable=AsyncMock
    ) as mock_create:

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.name = 'Test Campaign'
        mock_campaign.description = 'Test Description'
        mock_campaign.deleted = False
        mock_campaign.active = True
        mock_campaign.logo = None
        mock_campaign.author = 123
        mock_campaign.project_id = 1
        mock_create.return_value = mock_campaign

        campaign_post = CampaignPost(
            name='Test Campaign',
            project_id=1,
            description='Test Description',
            active=True,
            deleted=False,
        )

        info = mock_info()
        response = await create_campaign_route(info, campaign_post)

        assert isinstance(response, CampaignGet)
        assert response.id == 1
        assert response.name == 'Test Campaign'


@pytest.mark.asyncio
async def test_add_campaign_logo_successful():
    with patch(
        'services.core.routes.campaign.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.campaign.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.campaign.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.campaign.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:

        mock_file = Mock(spec=UploadFile)

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.project_id = 1
        mock_get_campaign.return_value = mock_campaign

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get_project.return_value = mock_project

        mock_permission.return_value = True

        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.public_path = '/media/test.jpg'
        mock_create_media.return_value = mock_media

        info = mock_info()
        response = await add_campaign_logo_route(info, mock_file, 1)

        assert isinstance(response, MediaGet)
        assert response.media_id == 1
        assert response.media_type == MediaType.CAMPAIGN_LOGO
        assert response.public_path == '/media/test.jpg'


@pytest.mark.asyncio
async def test_delete_campaign_logo_successful():
    with patch(
        'services.core.routes.campaign.get_campaign_by_id_db', new_callable=AsyncMock
    ) as mock_get_campaign, patch(
        'services.core.routes.campaign.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.campaign.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.campaign.delete_media_by_id_db', new_callable=AsyncMock
    ) as mock_delete_media:

        mock_campaign = Mock(spec=Campaign)
        mock_campaign.id = 1
        mock_campaign.project_id = 1
        mock_campaign.logo_id = 1
        mock_get_campaign.return_value = mock_campaign

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get_project.return_value = mock_project

        mock_permission.return_value = True

        info = mock_info()
        response = await delete_campaign_logo_route(info, 1)

        assert isinstance(response, CampaignGet)
        assert response.id == 1
        mock_delete_media.assert_called_once_with(info.context.session(), 1)
