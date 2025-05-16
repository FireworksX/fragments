import pytest
from unittest.mock import Mock

from crud.campaign import (
    create_campaign_db, get_campaign_by_id_db, delete_campaign_by_id_db,
    get_campaign_by_name_and_project_id_db, get_campaigns_by_project_id_db,
    update_campaign_by_id_db
)
from database.models import Campaign, Project, ProjectCampaign


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    session.merge = Mock()
    return session


@pytest.mark.asyncio
async def test_create_campaign(mock_session):
    name = "Test Campaign"
    project_id = 1
    description = "Test Description"
    active = True
    deleted = False
    author_id = 1

    mock_campaign = Campaign(
        id=1,
        name=name,
        project_id=project_id,
        description=description,
        active=active,
        deleted=deleted,
        author_id=author_id
    )
    mock_project = Project(id=project_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    mock_session.refresh.side_effect = lambda x: None

    created_campaign = await create_campaign_db(
        mock_session, name, project_id, description, active, deleted, author_id
    )

    assert isinstance(created_campaign, Campaign)
    assert created_campaign.name == name
    assert created_campaign.project_id == project_id
    assert created_campaign.description == description
    assert created_campaign.active == active
    assert created_campaign.deleted == deleted
    assert created_campaign.author_id == author_id

    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 2
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_get_campaign_by_id(mock_session):
    campaign_id = 1
    mock_campaign = Campaign(id=campaign_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_campaign

    campaign = await get_campaign_by_id_db(mock_session, campaign_id)
    assert campaign == mock_campaign


@pytest.mark.asyncio
async def test_delete_campaign_by_id(mock_session):
    campaign_id = 1
    mock_query = Mock()
    mock_filter = Mock()
    mock_delete = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.delete = mock_delete

    await delete_campaign_by_id_db(mock_session, campaign_id)

    mock_session.query.assert_called_once_with(Campaign)
    mock_query.filter.assert_called_once()
    mock_filter.delete.assert_called_once()


@pytest.mark.asyncio
async def test_get_campaign_by_name_and_project_id(mock_session):
    project_id = 1
    name = "Test Campaign"
    mock_campaign = Campaign(id=1, name=name, project_id=project_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_campaign

    campaign = await get_campaign_by_name_and_project_id_db(mock_session, project_id, name)
    assert campaign == mock_campaign


@pytest.mark.asyncio
async def test_get_campaigns_by_project_id(mock_session):
    project_id = 1
    mock_campaigns = [
        Campaign(id=1, project_id=project_id),
        Campaign(id=2, project_id=project_id)
    ]

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.filter.return_value = mock_filter
    mock_filter.all.return_value = mock_campaigns

    # Test without optional params
    campaigns = await get_campaigns_by_project_id_db(mock_session, project_id)
    assert campaigns == mock_campaigns

    # Test with active param
    campaigns = await get_campaigns_by_project_id_db(mock_session, project_id, active=True)
    assert campaigns == mock_campaigns

    # Test with deleted param
    campaigns = await get_campaigns_by_project_id_db(mock_session, project_id, deleted=False)
    assert campaigns == mock_campaigns

    # Test with both params
    campaigns = await get_campaigns_by_project_id_db(mock_session, project_id, active=True, deleted=False)
    assert campaigns == mock_campaigns


@pytest.mark.asyncio
async def test_update_campaign_by_id(mock_session):
    campaign_id = 1
    mock_campaign = Campaign(
        id=campaign_id,
        name="Old Name",
        description="Old Description",
        active=False,
        deleted=False
    )

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_campaign

    values = {
        'id': campaign_id,
        'name': "New Name",
        'description': "New Description",
        'active': True,
        'deleted': True
    }

    updated_campaign = await update_campaign_by_id_db(mock_session, values)

    assert updated_campaign.name == values['name']
    assert updated_campaign.description == values['description']
    assert updated_campaign.active == values['active']
    assert updated_campaign.deleted == values['deleted']

    mock_session.merge.assert_called_once()
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once()
