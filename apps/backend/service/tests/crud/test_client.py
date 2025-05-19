from datetime import UTC, datetime
from unittest.mock import Mock

import pytest

from crud.client import (
    create_client_db,
    create_client_history_db,
    get_client_by_id_db,
    get_client_history_by_id_db,
    get_client_history_db,
    update_client_last_visited_db,
)
from database.models import Client, ClientHistory


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    return session


@pytest.mark.asyncio
async def test_create_client(mock_session):
    mock_client = Client(id=1)
    mock_session.refresh.side_effect = lambda x: None

    created_client = await create_client_db(mock_session)

    assert isinstance(created_client, Client)
    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_get_client_by_id(mock_session):
    client_id = 1
    mock_client = Client(id=client_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_client

    client = await get_client_by_id_db(mock_session, client_id)
    assert client == mock_client


@pytest.mark.asyncio
async def test_update_client_last_visited(mock_session):
    client_id = 1
    mock_client = Client(id=client_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_client

    updated_client = await update_client_last_visited_db(mock_session, client_id)

    assert updated_client == mock_client
    assert isinstance(updated_client.last_visited_at, datetime)
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_create_client_history(mock_session):
    client_id = 1
    device_type = 1
    os_type = 1
    browser = 'Chrome'
    language = 'en'
    screen_width = 1920
    screen_height = 1080
    country = 'US'
    region = 'CA'
    city = 'San Francisco'
    url = 'https://example.com'
    referrer = 'https://google.com'
    domain = 'example.com'
    subdomain = 'www'
    page_load_time = 1.5

    mock_client = Client(id=client_id)
    mock_history = ClientHistory(
        id=1,
        client_id=client_id,
        device_type=device_type,
        os_type=os_type,
        browser=browser,
        language=language,
        screen_width=screen_width,
        screen_height=screen_height,
        country=country,
        region=region,
        city=city,
        url=url,
        referrer=referrer,
        domain=domain,
        subdomain=subdomain,
        page_load_time=page_load_time,
    )

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_client
    mock_session.refresh.side_effect = lambda x: None

    created_history = await create_client_history_db(
        mock_session,
        client_id,
        device_type,
        os_type,
        browser,
        language,
        screen_width,
        screen_height,
        country,
        region,
        city,
        url,
        referrer,
        domain,
        subdomain,
        page_load_time,
    )

    assert isinstance(created_history, ClientHistory)
    assert created_history.client_id == client_id
    assert created_history.device_type == device_type
    assert created_history.os_type == os_type
    assert created_history.browser == browser
    assert created_history.language == language
    assert created_history.screen_width == screen_width
    assert created_history.screen_height == screen_height
    assert created_history.country == country
    assert created_history.region == region
    assert created_history.city == city
    assert created_history.url == url
    assert created_history.referrer == referrer
    assert created_history.domain == domain
    assert created_history.subdomain == subdomain
    assert created_history.page_load_time == page_load_time

    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 2
    assert mock_session.refresh.call_count == 2


@pytest.mark.asyncio
async def test_get_client_history(mock_session):
    client_id = 1
    mock_histories = [
        ClientHistory(id=1, client_id=client_id),
        ClientHistory(id=2, client_id=client_id),
    ]

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.all.return_value = mock_histories

    histories = await get_client_history_db(mock_session, client_id)
    assert histories == mock_histories


@pytest.mark.asyncio
async def test_get_client_history_by_id(mock_session):
    history_id = 1
    mock_history = ClientHistory(id=history_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_history

    history = await get_client_history_by_id_db(mock_session, history_id)
    assert history == mock_history
