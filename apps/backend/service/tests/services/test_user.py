import os
from unittest.mock import AsyncMock, MagicMock, Mock, patch

import pytest
import strawberry
from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from database import Media
from services.core.routes.middleware import Context
from services.core.routes.schemas.user import UserGet
from services.core.routes.user import AuthPayload, User, add_avatar_route, login, signup
from services.dependencies import get_db
from services.core.routes.schemas.media import MediaGet, MediaType


def mock_info():
    """
    Creates a mocked `strawberry.Info` object for unit tests.
    """
    mock_info = Mock(spec=strawberry.types.Info)

    # Mock GraphQL execution context
    mock_info.context = Mock()

    # Example: Add a mock user (if needed for authentication)
    mock_info.context.user = Mock(id=123, username='test_user')

    # Example: Add a mock database session
    mock_info.context.db = Mock()

    return mock_info


@pytest.mark.asyncio
async def test_signup_successful():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.user.create_user_db', new_callable=AsyncMock
    ) as mock_create:
        # Mocking the functions
        mock_get.return_value = None  # No existing user
        mock_create.return_value = User(email='test@test.com')  # New user creation

        info = mock_info()
        response = await signup(info, 'test@test.com', 'Test', None, 'password')

        assert isinstance(response, AuthPayload)
        assert response.user.email == 'test@test.com'


@pytest.mark.asyncio
async def test_signup_user_exists():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get:
        mock_get.return_value = User(email='test@test.com')

        info = mock_info()
        with pytest.raises(HTTPException) as e:
            response = await signup(info, 'test@test.com', 'Test', None, 'password')

        assert str(e.value) == '409: User with the same email address already exists'
        assert e.value.status_code == 409


@pytest.mark.asyncio
async def test_signup_failed_to_create_user():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.user.create_user_db', new_callable=AsyncMock
    ) as mock_create:
        mock_get.return_value = None
        mock_create.return_value = None

        info = mock_info()
        with pytest.raises(HTTPException) as e:
            response = await signup(info, 'test@test.com', 'Test', None, 'password')

        assert str(e.value) == '500: Failed to create a user'
        assert e.value.status_code == 500


@pytest.mark.asyncio
async def test_login_user_not_exist():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get:
        mock_get.return_value = None  # No existing user

        info = mock_info()

        with pytest.raises(HTTPException) as exc:
            await login(info, 'test@example.com', 'password')

        assert exc.value.status_code == 404
        assert exc.value.detail == 'User does not exist'


@pytest.mark.asyncio
async def test_login_incorrect_password():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.user.verify_password', return_value=False
    ) as mock_verify:
        mock_get.return_value = User(
            email='test@example.com', hashed_password='password'
        )  # Existing user

        info = mock_info()

        with pytest.raises(HTTPException) as exc:
            await login(info, 'test@example.com', 'password')

        assert exc.value.status_code == 401
        assert exc.value.detail == 'Wrong password'


@pytest.mark.asyncio
async def test_login_successful():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.user.verify_password', return_value=True
    ) as mock_verify, patch(
        'services.core.routes.user.create_access_token', return_value='access_token'
    ) as mock_create_access, patch(
        'services.core.routes.user.create_refresh_token', return_value='refresh_token'
    ) as mock_create_refresh:
        mock_get.return_value = User(
            email='test@example.com', hashed_password='password'
        )  # Existing user

        info = mock_info()

        response = await login(info, 'test@example.com', 'password')

        assert isinstance(response, AuthPayload)
        assert response.user.email == 'test@example.com'
        assert response.access_token == 'access_token'
        assert response.refresh_token == 'refresh_token'

@pytest.mark.asyncio
async def test_add_avatar_successful():
    with patch(
        'services.core.routes.user.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:
        # Mock file
        mock_file = Mock(spec=UploadFile)
        mock_file.filename = "test.jpg"
        mock_file.content_type = "image/jpeg"
        
        # Mock media creation
        mock_media = Mock()
        mock_media.id = 1
        mock_media.public_path = "/media/test.jpg"
        mock_create_media.return_value = mock_media
        
        # Mock user update
        mock_user = Mock()
        mock_user.id = 1
        mock_user.email = "test@example.com"
        mock_user.avatar_id = 1
        mock_user.avatar = mock_media

        info = mock_info()
        info.context.user = AsyncMock(return_value=AuthPayload(user=mock_user, access_token="test_token", refresh_token="test_refresh"))

        response: MediaGet = await add_avatar_route(info, mock_file)

        assert isinstance(response, MediaGet)
        assert response.media_id == 1
        assert response.media_type == MediaType.USER_LOGO
        assert response.public_path == "/media/test.jpg"
        mock_create_media.assert_called_once_with(info.context.session(), mock_file)


@pytest.mark.asyncio
async def test_add_avatar_media_creation_failed():
    with patch(
        'services.core.routes.user.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:
        # Mock file
        mock_file = Mock(spec=UploadFile)
        mock_file.filename = "test.jpg"
        mock_file.content_type = "image/jpeg"
        mock_file.read = AsyncMock()
        
        # Mock failed media creation
        mock_create_media.return_value = None

        info = mock_info()
        info.context.user = AsyncMock(return_value=AuthPayload(user=Mock(id=1), access_token="test_token", refresh_token="test_refresh"))
        
        with pytest.raises(HTTPException) as exc:
            await add_avatar_route(info, mock_file)

        assert exc.value.status_code == 500
        assert exc.value.detail == "Failed to create media file"
        mock_create_media.assert_called_once_with(info.context.session(), mock_file)

