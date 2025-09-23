import os
from unittest.mock import AsyncMock, MagicMock, Mock, patch

# Mock logger and logging config
mock_logger = Mock()
patch('logging.getLogger', Mock(return_value=mock_logger)).start()
patch('logging.config.fileConfig', Mock()).start()

import pytest
import strawberry
from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from database import Media
from services.core.routes.middleware import Context
from services.core.routes.schemas.media import MediaGet, MediaType
from services.core.routes.schemas.user import UserGet, UserSignUp
from services.core.routes.user import AuthPayload, User, add_avatar_route, login, signup_route
from services.dependencies import get_db

def mock_info():
    """
    Creates a mocked `strawberry.Info` object for unit tests.
    """
    mock_info = Mock(spec=strawberry.types.Info)
    mock_info.context = Mock()
    mock_info.context.session = Mock(return_value=Mock(spec=Session))
    return mock_info

@pytest.mark.asyncio
async def test_signup_successful():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.user.create_user_db', new_callable=AsyncMock
    ) as mock_create, patch(
        'services.core.routes.user.generate_default_media', new_callable=AsyncMock
    ) as mock_default_media:
        # Mocking the functions
        mock_get.return_value = None  # No existing user
        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.filename = 'default.jpg'
        mock_media.path = '/media/default.jpg'
        mock_media.public_path = '/media/default.jpg'
        mock_default_media.return_value = mock_media
        mock_user = User(
            id=1,
            email='test@test.com',
            first_name='Test',
            last_name=None,
            avatar_id=mock_media.id,
            avatar=mock_media
        )
        mock_create.return_value = mock_user

        info = mock_info()
        response = await signup_route(info, UserSignUp(email='test@test.com', first_name='Test', last_name=None, password='password'))

        assert isinstance(response, AuthPayload)
        assert response.user.email == 'test@test.com'
        assert response.user.first_name == 'Test'
        assert response.user.logo.media_id == mock_media.id
        assert response.user.logo.public_path == mock_media.public_path

@pytest.mark.asyncio
async def test_signup_user_exists():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get:
        mock_get.return_value = User(email='test@test.com')

        info = mock_info()
        with pytest.raises(HTTPException) as e:
            await signup_route(info, UserSignUp(email='test@test.com', first_name='Test', last_name=None, password='password'))

        assert e.value.status_code == 409
        assert e.value.detail == 'User with the same email address already exists'

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
        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.filename = 'avatar.jpg'
        mock_media.path = '/media/avatar.jpg'
        mock_media.public_path = '/media/avatar.jpg'
        mock_get.return_value = User(
            id=1,
            email='test@example.com',
            first_name='Test',
            last_name=None,
            hashed_password='hashed_password',
            avatar_id=mock_media.id,
            avatar=mock_media
        )

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
        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.filename = 'avatar.jpg'
        mock_media.path = '/media/avatar.jpg'
        mock_media.public_path = '/media/avatar.jpg'
        mock_get.return_value = User(
            id=1,
            email='test@example.com',
            first_name='Test',
            last_name=None,
            hashed_password='hashed_password',
            avatar_id=mock_media.id,
            avatar=mock_media
        )

        info = mock_info()

        response = await login(info, 'test@example.com', 'password')

        assert isinstance(response, AuthPayload)
        assert response.user.email == 'test@example.com'
        assert response.user.first_name == 'Test'
        assert response.user.logo.media_id == mock_media.id
        assert response.user.logo.public_path == mock_media.public_path
        assert response.access_token == 'access_token'
        assert response.refresh_token == 'refresh_token'

@pytest.mark.asyncio
async def test_add_avatar_successful():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get_user, patch(
        'services.core.routes.user.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:
        # Mock file
        mock_file = Mock(spec=UploadFile)
        mock_file.filename = 'test.jpg'
        mock_file.content_type = 'image/jpeg'

        # Mock media creation
        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.filename = 'test.jpg'
        mock_media.path = '/media/test.jpg'
        mock_media.public_path = '/media/test.jpg'
        mock_create_media.return_value = mock_media

        # Mock user
        mock_user = User(
            id=1,
            email='test@example.com',
            first_name='Test',
            last_name=None,
            avatar_id=mock_media.id,
            avatar=mock_media
        )
        mock_get_user.return_value = mock_user

        info = mock_info()
        info.context.user = AsyncMock(
            return_value=AuthPayload(
                user=UserGet(
                    id=1,
                    email='test@example.com',
                    first_name='Test',
                    last_name=None,
                    logo=MediaGet(
                        media_id=1,
                        media_type=MediaType.USER_LOGO,
                        public_path='/media/test.jpg'
                    )
                ),
                access_token='test_token',
                refresh_token='test_refresh'
            )
        )

        response = await add_avatar_route(info, mock_file)

        assert isinstance(response, MediaGet)
        assert response.media_id == 1
        assert response.media_type == MediaType.USER_LOGO
        assert response.public_path == '/media/test.jpg'
        mock_create_media.assert_called_once_with(info.context.session(), mock_file)

@pytest.mark.asyncio
async def test_add_avatar_media_creation_failed():
    with patch(
        'services.core.routes.user.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get_user, patch(
        'services.core.routes.user.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:
        # Mock file
        mock_file = Mock(spec=UploadFile)
        mock_file.filename = 'test.jpg'
        mock_file.content_type = 'image/jpeg'

        # Mock failed media creation
        mock_create_media.side_effect = Exception('Failed to create media')

        # Mock user
        mock_user = User(id=1, email='test@example.com')
        mock_get_user.return_value = mock_user

        info = mock_info()
        info.context.user = AsyncMock(
            return_value=AuthPayload(
                user=UserGet(
                    id=1,
                    email='test@example.com',
                    first_name='Test',
                    last_name=None,
                    logo=MediaGet(
                        media_id=1,
                        media_type=MediaType.USER_LOGO,
                        public_path='/media/default.jpg'
                    )
                ),
                access_token='test_token',
                refresh_token='test_refresh'
            )
        )

        with pytest.raises(HTTPException) as exc:
            await add_avatar_route(info, mock_file)

        assert exc.value.status_code == 500
        assert exc.value.detail == 'Failed to create media file'
        mock_create_media.assert_called_once_with(info.context.session(), mock_file)
