import pytest
from unittest.mock import Mock, patch, AsyncMock
from datetime import datetime, timezone
from fastapi import HTTPException
from jwt.exceptions import InvalidTokenError

from services.core.routes.middleware import Context, UserAgentInfo, get_context
from services.core.routes.schemas.filter import DeviceType, OSType
from services.core.routes.schemas.landing import ClientInfo
from services.core.routes.schemas.user import AuthPayload
from database.models import User, Project

def mock_request(**kwargs):
    request = Mock()
    request.headers = kwargs.get('headers', {})
    request.client = Mock()
    request.client.host = kwargs.get('client_host', '127.0.0.1')
    return request

@pytest.mark.asyncio
async def test_user_valid_token():
    with patch('services.core.routes.middleware.get_user_by_email_db', new_callable=AsyncMock) as mock_get_user:
        mock_user = Mock(spec=User)
        mock_user.email = "test@example.com"
        mock_get_user.return_value = mock_user

        context = Context()
        context.request = mock_request(headers={
            'Authorization': 'Bearer valid_token',
            'Refresh': 'valid_refresh'
        })

        with patch('jwt.decode') as mock_decode:
            mock_decode.return_value = {'sub': 'test@example.com'}
            result = await context.user()

        assert isinstance(result, AuthPayload)
        assert result.user == mock_user
        assert result.access_token == 'valid_token'
        assert result.refresh_token == 'valid_refresh'

@pytest.mark.asyncio
async def test_user_invalid_token():
    context = Context()
    context.request = mock_request(headers={
        'Authorization': 'Bearer invalid_token'
    })

    with patch('jwt.decode', side_effect=InvalidTokenError):
        with pytest.raises(HTTPException) as exc:
            await context.user()
    
    assert exc.value.status_code == 401

@pytest.mark.asyncio
async def test_project_valid_key():
    with patch('services.core.routes.middleware.validate_project_public_api_key', new_callable=AsyncMock) as mock_validate:
        mock_project = Mock(spec=Project)
        mock_validate.return_value = mock_project

        context = Context()
        context.request = mock_request(headers={
            'Authorization': 'Bearer valid_key'
        })

        result = await context.project()
        assert result == mock_project

@pytest.mark.asyncio
async def test_project_invalid_key():
    with patch('services.core.routes.middleware.validate_project_public_api_key', new_callable=AsyncMock) as mock_validate:
        mock_validate.return_value = None

        context = Context()
        context.request = mock_request(headers={
            'Authorization': 'Bearer invalid_key'
        })

        with pytest.raises(HTTPException) as exc:
            await context.project()
        
        assert exc.value.status_code == 401

@pytest.mark.asyncio
async def test_client_landing():
    context = Context()
    context.request = mock_request(
        headers={
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
            'X-User-Ip': '192.168.1.1',
            'Referrer': 'https://example.com'
        }
    )

    result = await context.client_info()
    
    assert isinstance(result, ClientInfo)
    assert isinstance(result.time_frame, datetime)
    assert result.ip_address == '192.168.1.1'
    assert result.page == 'https://example.com'

def test_user_agent_info_mobile():
    ua = UserAgentInfo('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')
    assert ua.device_type == DeviceType.MOBILE
    assert ua.os_type == OSType.IOS

def test_user_agent_info_desktop():
    ua = UserAgentInfo('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
    assert ua.device_type == DeviceType.DESKTOP
    assert ua.os_type == OSType.WINDOWS

@pytest.mark.asyncio
async def test_get_context():
    context = await get_context()
    assert isinstance(context, Context)
