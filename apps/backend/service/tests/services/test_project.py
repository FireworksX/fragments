from unittest.mock import AsyncMock, Mock, patch

import pytest
import strawberry
from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from database import Media, Project, ProjectGoal
from services.core.routes.middleware import Context
from services.core.routes.project import (
    add_project_logo_route,
    add_project_public_key_route,
    add_user_to_project,
    change_project_private_key_route,
    change_user_role,
    create_project_goal_route,
    create_project_route,
    delete_project_goal_route,
    delete_project_logo_route,
    delete_project_public_key_route,
    delete_project_route,
    project_by_id,
    projects,
    update_project_goal_route,
    update_project_route,
)
from services.core.routes.schemas.media import MediaGet, MediaType
from services.core.routes.schemas.project import (
    ProjectGet,
    ProjectGoalGet,
    ProjectGoalPatch,
    ProjectGoalPost,
    ProjectPost,
)
from services.core.routes.user import AuthPayload, User


def mock_info():
    """
    Creates a mocked `strawberry.Info` object for unit tests.
    """
    mock_info = Mock(spec=strawberry.types.Info)
    mock_info.context = Mock()
    mock_info.context.session = Mock(return_value=Mock(spec=Session))
    mock_info.context.user = AsyncMock(
        return_value=AuthPayload(
            user=User(id=123, email='test@test.com'),
            access_token='test_token',
            refresh_token='test_refresh',
        )
    )
    return mock_info


@pytest.mark.asyncio
async def test_project_by_id_successful():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.read_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.get_user_project_role', new_callable=AsyncMock
    ) as mock_role, patch(
        'services.core.routes.project.private_key_permission', new_callable=AsyncMock
    ) as mock_private_key:
        # Set up mock project with members
        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = 'Test Project'
        mock_project.owner_id = 123
        mock_project.members = []
        mock_project.owner = Mock()
        mock_project.campaigns = []
        mock_project.logo = None
        mock_project.goals = []
        mock_project.root_directory_id = 1
        mock_project.private_key = Mock(key='private_key', id=1)
        mock_project.public_keys = []

        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_role.return_value = 1  # Mock owner role
        mock_private_key.return_value = True

        info = mock_info()
        response = await project_by_id(info, 1)

        assert isinstance(response, ProjectGet)
        assert response.id == 1
        assert response.name == 'Test Project'
        assert response.logo is None
        assert response.root_directory_id == 1
        assert response.members == []
        assert response.campaigns == []
        assert response.private_key.value == 'private_key'
        assert response.private_key.id == 1
        assert response.public_keys == []


@pytest.mark.asyncio
async def test_project_by_id_not_found():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get:
        mock_get.return_value = None

        info = mock_info()
        with pytest.raises(HTTPException) as exc:
            await project_by_id(info, 1)

        assert exc.value.status_code == 404
        assert exc.value.detail == 'Project does not exist'


@pytest.mark.asyncio
async def test_project_by_id_unauthorized():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.read_permission', new_callable=AsyncMock
    ) as mock_permission:
        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = 'Test Project'
        mock_project.owner_id = 456
        mock_project.members = []
        mock_get.return_value = mock_project
        mock_permission.return_value = False

        info = mock_info()
        with pytest.raises(HTTPException) as exc:
            await project_by_id(info, 1)

        assert exc.value.status_code == 401
        assert exc.value.detail == 'User is not allowed to obtain project'


@pytest.mark.asyncio
async def test_create_project_successful():
    with patch(
        'services.core.routes.project.create_project_db', new_callable=AsyncMock
    ) as mock_create, patch(
        'services.core.routes.project.get_user_project_role', new_callable=AsyncMock
    ) as mock_role, patch(
        'services.core.routes.project.private_key_permission', new_callable=AsyncMock
    ) as mock_permission:
        project_data = ProjectPost(name='Test Project')
        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = 'Test Project'
        mock_project.owner_id = 123
        mock_project.members = []
        mock_project.owner = Mock()
        mock_project.campaigns = []
        mock_project.logo = None
        mock_project.goals = []
        mock_project.root_directory_id = 1
        mock_project.private_key = Mock(key='private_key', id=1)
        mock_project.public_keys = []
        mock_create.return_value = mock_project
        mock_role.return_value = 1  # Owner role
        mock_permission.return_value = True

        info = mock_info()
        response = await create_project_route(info, project_data)

        assert isinstance(response, ProjectGet)
        assert response.id == 1
        assert response.name == 'Test Project'
        assert response.logo is None
        assert response.root_directory_id == 1
        assert response.members == []
        assert response.campaigns == []
        assert response.private_key.value == 'private_key'
        assert response.private_key.id == 1
        assert response.public_keys == []
        mock_create.assert_called_once_with(info.context.session(), 'Test Project', 123)


@pytest.mark.asyncio
async def test_add_project_logo_successful():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:

        mock_file = Mock(spec=UploadFile)
        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = 'Test Project'
        mock_project.owner_id = 123
        mock_project.members = []
        mock_project.owner = Mock()
        mock_project.campaigns = []
        mock_project.logo = None
        mock_project.root_directory_id = 1
        mock_project.private_key = Mock(key='private_key', id=1)
        mock_project.public_keys = []
        mock_get.return_value = mock_project
        mock_permission.return_value = True

        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.public_path = '/media/test.jpg'
        mock_create_media.return_value = mock_media

        info = mock_info()
        response = await add_project_logo_route(info, mock_file, 1)

        assert isinstance(response, MediaGet)
        assert response.media_id == 1
        assert response.media_type == MediaType.PROJECT_LOGO
        assert response.public_path == '/media/test.jpg'


@pytest.mark.asyncio
async def test_delete_project_logo_successful():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.get_user_project_role', new_callable=AsyncMock
    ) as mock_role, patch(
        'services.core.routes.project.read_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_media_by_id_db', new_callable=AsyncMock
    ) as mock_delete_media, patch(
        'services.core.routes.project.private_key_permission', new_callable=AsyncMock
    ) as mock_private_key:

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = 'Test Project'
        mock_project.owner_id = 123
        mock_project.logo_id = 1
        mock_project.members = []
        mock_project.owner = Mock()
        mock_project.campaigns = []
        mock_project.goals = []
        mock_project.root_directory_id = 1
        mock_project.private_key = Mock(key='private_key', id=1)
        mock_project.public_keys = []
        mock_get.return_value = mock_project
        mock_role.return_value = 1  # Owner role
        mock_permission.return_value = True
        mock_private_key.return_value = True

        info = mock_info()
        response = await delete_project_logo_route(info, 1)

        assert isinstance(response, ProjectGet)
        assert response.id == 1
        mock_delete_media.assert_called_once_with(info.context.session(), 1)


@pytest.mark.asyncio
async def test_create_project_goal_successful():
    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.create_project_goal_db', new_callable=AsyncMock
    ) as mock_create_goal:

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_get.return_value = mock_project
        mock_permission.return_value = True

        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.id = 1
        mock_goal.name = 'Test Goal'
        mock_goal.target_action = 'test_action'
        mock_create_goal.return_value = mock_goal

        info = mock_info()
        goal_post = ProjectGoalPost(project_id=1, name='Test Goal', target_action='test_action')
        response = await create_project_goal_route(info, goal_post)

        assert isinstance(response, ProjectGoalGet)
        assert response.id == 1
        assert response.name == 'Test Goal'
        assert response.target_action == 'test_action'
        mock_create_goal.assert_called_once_with(
            info.context.session(), 1, 'Test Goal', 'test_action'
        )


@pytest.mark.asyncio
async def test_update_project_goal_successful():
    with patch(
        'services.core.routes.project.get_project_goal_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.update_project_goal_db', new_callable=AsyncMock
    ) as mock_update_goal:

        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.id = 1
        mock_goal.project_id = 1
        mock_goal.name = 'Updated Goal'
        mock_goal.target_action = 'updated_action'
        mock_get.return_value = mock_goal
        mock_permission.return_value = True
        mock_update_goal.return_value = mock_goal

        info = mock_info()
        goal_patch = ProjectGoalPatch(id=1, name='Updated Goal', target_action='updated_action')
        response = await update_project_goal_route(info, goal_patch)

        assert isinstance(response, ProjectGoalGet)
        assert response.id == 1
        assert response.name == 'Updated Goal'
        assert response.target_action == 'updated_action'
        mock_update_goal.assert_called_once_with(
            info.context.session(), 1, 'Updated Goal', 'updated_action'
        )


@pytest.mark.asyncio
async def test_delete_project_goal_successful():
    with patch(
        'services.core.routes.project.get_project_goal_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_project_goal_db', new_callable=AsyncMock
    ) as mock_delete_goal:

        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.id = 1
        mock_goal.project_id = 1
        mock_get.return_value = mock_goal
        mock_permission.return_value = True

        info = mock_info()
        await delete_project_goal_route(info, 1)

        mock_delete_goal.assert_called_once_with(info.context.session(), 1)
