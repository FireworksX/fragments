from unittest.mock import AsyncMock, Mock, patch

import pytest
import strawberry
from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from database.models import (
    Media,
    Project,
    ProjectAllowedOrigin,
    ProjectApiKey,
    ProjectGoal,
    ProjectMemberRole,
    User,
)
from services.core.routes.middleware import Context
from services.core.routes.project import (
    add_project_allowed_origin_route,
    add_project_logo_route,
    add_project_public_key_route,
    add_user_to_project_route,
    change_project_private_key_route,
    change_user_role_route,
    create_project_goal_route,
    create_project_route,
    delete_project_allowed_origin_route,
    delete_project_goal_route,
    delete_project_logo_route,
    delete_project_public_key_route,
    delete_project_route,
    get_project_goals_route,
    project_db_to_project,
    project_goal_db_to_goal,
    remove_user_from_project_route,
    update_project_goal_route,
)
from services.core.routes.schemas.media import MediaType
from services.core.routes.schemas.project import (
    MediaGet,
    ProjectAllowedOriginGet,
    ProjectGet,
    ProjectGoalGet,
    ProjectGoalPatch,
    ProjectGoalPost,
    ProjectKeyGet,
    ProjectPatch,
    ProjectPost,
)
from services.core.routes.schemas.user import UserRole
from services.core.routes.user import AuthPayload
from services.core.routes.user import User as UserSchema


def mock_info():
    """Creates a mocked strawberry.Info object for testing"""
    mock_info = Mock(spec=strawberry.types.Info)
    mock_info.context = Mock(spec=Context)
    mock_info.context.session = Mock(return_value=Mock(spec=Session))
    mock_info.context.user = AsyncMock(
        return_value=AuthPayload(
            user=UserSchema(id=1, email='test@test.com'),
            access_token='test_access_token',
            refresh_token='test_refresh_token',
        )
    )
    return mock_info


@pytest.mark.asyncio
async def test_project_db_to_project():
    info = mock_info()
    db = info.context.session()

    mock_project = Mock(spec=Project)
    mock_project.id = 1
    mock_project.name = 'Test Project'
    mock_project.logo_id = 1
    mock_project.logo = Mock(spec=Media)
    mock_project.logo.public_path = 'test/path'
    mock_project.owner = Mock(spec=User)
    mock_project.root_directory_id = 1
    mock_project.members = []
    mock_project.areas = []
    mock_project.private_key = Mock(spec=ProjectApiKey)
    mock_project.private_key.key = 'private_key'
    mock_project.private_key.id = 1
    mock_project.public_keys = []
    mock_project.allowed_origins = []
    mock_project.properties = '{}'

    with patch(
        'services.core.routes.project.owner_permission', new_callable=AsyncMock
    ) as mock_permission:
        mock_permission.return_value = True
        result = await project_db_to_project(info, db, mock_project)

        assert isinstance(result, ProjectGet)
        assert result.id == mock_project.id
        assert result.name == mock_project.name


@pytest.mark.asyncio
async def test_project_goal_db_to_goal():
    mock_goal = Mock(spec=ProjectGoal)
    mock_goal.id = 1
    mock_goal.name = 'Test Goal'
    mock_goal.target_action = 'test_action'
    mock_goal.success_level = 0.5
    mock_goal.failure_level = 0.2

    result = project_goal_db_to_goal(mock_goal)

    assert isinstance(result, ProjectGoalGet)
    assert result.id == mock_goal.id
    assert result.name == mock_goal.name
    assert result.target_action == mock_goal.target_action
    assert result.success_level == mock_goal.success_level
    assert result.failure_level == mock_goal.failure_level


@pytest.mark.asyncio
async def test_add_project_logo_route():
    info = mock_info()
    mock_file = Mock(spec=UploadFile)
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.create_media_db', new_callable=AsyncMock
    ) as mock_create_media:

        mock_project = Mock(spec=Project)
        mock_media = Mock(spec=Media)
        mock_media.id = 1
        mock_media.public_path = 'test/path'

        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_create_media.return_value = mock_media

        result = await add_project_logo_route(info, mock_file, project_id)

        assert isinstance(result, MediaGet)
        assert result.media_id == mock_media.id
        assert result.public_path == mock_media.public_path
        assert result.media_type == MediaType.PROJECT_LOGO


@pytest.mark.asyncio
async def test_delete_project_logo_route():
    info = mock_info()
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.read_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_media_by_id_db', new_callable=AsyncMock
    ) as mock_delete_media, patch(
        'services.core.routes.project.generate_default_media', new_callable=AsyncMock
    ) as mock_generate_media:

        mock_project = Mock(spec=Project)
        mock_project.logo_id = 1
        mock_project.name = 'Test Project'

        mock_get.return_value = mock_project
        mock_permission.return_value = True

        mock_default_media = Mock(spec=Media)
        mock_default_media.id = 2
        mock_generate_media.return_value = mock_default_media

        result = await delete_project_logo_route(info, project_id)

        assert mock_project.logo_id == mock_default_media.id
        mock_delete_media.assert_called_once_with(info.context.session(), mock_project.logo_id)


@pytest.mark.asyncio
async def test_create_project_goal_route():
    info = mock_info()
    goal = ProjectGoalPost(
        project_id=1,
        name='Test Goal',
        target_action='test_action',
        success_level=0.5,
        failure_level=0.2,
    )

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.create_project_goal_db', new_callable=AsyncMock
    ) as mock_create:

        mock_project = Mock(spec=Project)
        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.id = 1
        mock_goal.name = goal.name
        mock_goal.target_action = goal.target_action
        mock_goal.success_level = goal.success_level
        mock_goal.failure_level = goal.failure_level

        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_create.return_value = mock_goal

        result = await create_project_goal_route(info, goal)

        assert isinstance(result, ProjectGoalGet)
        assert result.id == mock_goal.id
        assert result.name == mock_goal.name


@pytest.mark.asyncio
async def test_get_project_goals_route():
    info = mock_info()
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.read_permission', new_callable=AsyncMock
    ) as mock_permission:

        mock_project = Mock(spec=Project)
        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.id = 1
        mock_goal.name = 'Test Goal'
        mock_goal.target_action = 'test_action'
        mock_goal.success_level = 0.5
        mock_goal.failure_level = 0.2
        mock_project.goals = [mock_goal]

        mock_get.return_value = mock_project
        mock_permission.return_value = True

        result = await get_project_goals_route(info, project_id)

        assert len(result) == 1
        assert isinstance(result[0], ProjectGoalGet)
        assert result[0].id == mock_goal.id


@pytest.mark.asyncio
async def test_update_project_goal_route():
    info = mock_info()
    goal = ProjectGoalPatch(
        id=1,
        name='Updated Goal',
        target_action='updated_action',
        success_level=0.6,
        failure_level=0.3,
    )

    with patch(
        'services.core.routes.project.get_project_goal_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.update_project_goal_db', new_callable=AsyncMock
    ) as mock_update:

        mock_goal_db = Mock(spec=ProjectGoal)
        mock_goal_db.project_id = 1

        mock_get.return_value = mock_goal_db
        mock_permission.return_value = True
        mock_update.return_value = mock_goal_db

        result = await update_project_goal_route(info, goal)

        assert isinstance(result, ProjectGoalGet)
        mock_update.assert_called_once_with(info.context.session(), mock_goal_db, goal)


@pytest.mark.asyncio
async def test_delete_project_goal_route():
    info = mock_info()
    goal_id = 1

    with patch(
        'services.core.routes.project.get_project_goal_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_project_goal_db', new_callable=AsyncMock
    ) as mock_delete:

        mock_goal = Mock(spec=ProjectGoal)
        mock_goal.project_id = 1

        mock_get.return_value = mock_goal
        mock_permission.return_value = True

        await delete_project_goal_route(info, goal_id)

        mock_delete.assert_called_once_with(info.context.session(), mock_goal)


@pytest.mark.asyncio
async def test_add_project_allowed_origin_route():
    info = mock_info()
    project_id = 1
    origin = 'http://test.com'
    name = 'Test Origin'

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.add_project_allowed_origin_db', new_callable=AsyncMock
    ) as mock_add:

        mock_project = Mock(spec=Project)
        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_add.return_value = mock_project

        result = await add_project_allowed_origin_route(info, project_id, origin, name)

        assert isinstance(result, ProjectGet)
        mock_add.assert_called_once_with(info.context.session(), project_id, origin, name)

        # Test invalid origin
        with pytest.raises(HTTPException) as exc:
            await add_project_allowed_origin_route(info, project_id, '*', name)
        assert exc.value.status_code == 400


@pytest.mark.asyncio
async def test_delete_project_allowed_origin_route():
    info = mock_info()
    project_id = 1
    allowed_origin_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_project_allowed_origin_db', new_callable=AsyncMock
    ) as mock_delete:

        mock_project = Mock(spec=Project)
        mock_get.return_value = mock_project
        mock_permission.return_value = True

        await delete_project_allowed_origin_route(info, project_id, allowed_origin_id)

        mock_delete.assert_called_once_with(info.context.session(), project_id, allowed_origin_id)

        # Test project not found
        mock_get.return_value = None
        with pytest.raises(HTTPException) as exc:
            await delete_project_allowed_origin_route(info, project_id, allowed_origin_id)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get.return_value = mock_project
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await delete_project_allowed_origin_route(info, project_id, allowed_origin_id)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_add_project_public_key_route():
    info = mock_info()
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.add_project_public_api_key', new_callable=AsyncMock
    ) as mock_add:

        mock_project = Mock(spec=Project)
        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_add.return_value = mock_project

        result = await add_project_public_key_route(info, project_id)

        assert isinstance(result, ProjectGet)
        mock_add.assert_called_once_with(info.context.session(), project_id)

        # Test project not found
        mock_get.return_value = None
        with pytest.raises(HTTPException) as exc:
            await add_project_public_key_route(info, project_id)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get.return_value = mock_project
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await add_project_public_key_route(info, project_id)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_change_project_private_key_route():
    info = mock_info()
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.change_project_private_api_key', new_callable=AsyncMock
    ) as mock_change:

        mock_project = Mock(spec=Project)
        mock_get.return_value = mock_project
        mock_permission.return_value = True
        mock_change.return_value = mock_project

        result = await change_project_private_key_route(info, project_id)

        assert isinstance(result, ProjectGet)
        mock_change.assert_called_once_with(info.context.session(), project_id)

        # Test project not found
        mock_get.return_value = None
        with pytest.raises(HTTPException) as exc:
            await change_project_private_key_route(info, project_id)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get.return_value = mock_project
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await change_project_private_key_route(info, project_id)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_add_user_to_project_route():
    info = mock_info()
    project_id = 1
    email = 'test@test.com'
    role = UserRole.ADMIN

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.project.get_user_by_email_db', new_callable=AsyncMock
    ) as mock_get_user, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.add_user_to_project_db', new_callable=AsyncMock
    ) as mock_add:

        mock_project = Mock(spec=Project)
        mock_user = Mock(spec=User)
        mock_project.id = project_id
        mock_user.id = 2
        mock_user.email = email

        mock_get_project.return_value = mock_project
        mock_get_user.return_value = mock_user
        mock_permission.return_value = True
        mock_add.return_value = mock_project

        result = await add_user_to_project_route(info, project_id, email, role)

        assert isinstance(result, ProjectGet)
        mock_add.assert_called_once_with(info.context.session(), project_id, mock_user.id, role)

        # Test project not found
        mock_get_project.return_value = None
        with pytest.raises(HTTPException) as exc:
            await add_user_to_project_route(info, project_id, email, role)
        assert exc.value.status_code == 404

        # Test user not found
        mock_get_project.return_value = mock_project
        mock_get_user.return_value = None
        with pytest.raises(HTTPException) as exc:
            await add_user_to_project_route(info, project_id, email, role)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get_user.return_value = mock_user
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await add_user_to_project_route(info, project_id, email, role)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_change_user_role_route():
    info = mock_info()
    project_id = 1
    user_id = 2
    role = UserRole.ADMIN

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.project.get_user_by_id_db', new_callable=AsyncMock
    ) as mock_get_user, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.change_user_role_db', new_callable=AsyncMock
    ) as mock_change_role:

        mock_project = Mock(spec=Project)
        mock_user = Mock(spec=User)
        mock_project.id = project_id
        mock_user.id = user_id

        mock_get_project.return_value = mock_project
        mock_get_user.return_value = mock_user
        mock_permission.return_value = True
        mock_change_role.return_value = mock_project

        result = await change_user_role_route(info, project_id, user_id, role)

        assert isinstance(result, ProjectGet)
        mock_change_role.assert_called_once_with(info.context.session(), project_id, user_id, role)

        # Test project not found
        mock_get_project.return_value = None
        with pytest.raises(HTTPException) as exc:
            await change_user_role_route(info, project_id, user_id, role)
        assert exc.value.status_code == 404

        # Test user not found
        mock_get_project.return_value = mock_project
        mock_get_user.return_value = None
        with pytest.raises(HTTPException) as exc:
            await change_user_role_route(info, project_id, user_id, role)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get_user.return_value = mock_user
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await change_user_role_route(info, project_id, user_id, role)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_create_project_route():
    info = mock_info()
    project_data = ProjectPost(name='Test Project')

    with patch(
        'services.core.routes.project.create_project_db', new_callable=AsyncMock
    ) as mock_create_project, patch(
        'services.core.routes.project.generate_default_media', new_callable=AsyncMock
    ) as mock_generate_media:

        mock_project = Mock(spec=Project)
        mock_project.id = 1
        mock_project.name = project_data.name
        mock_project.logo_id = 1
        mock_project.logo = Mock(spec=Media)
        mock_project.logo.public_path = 'test/path'
        mock_project.owner = Mock(spec=User)
        mock_project.root_directory_id = 1
        mock_project.members = []
        mock_project.areas = []
        mock_project.private_key = Mock(spec=ProjectApiKey)
        mock_project.private_key.key = 'private_key'
        mock_project.private_key.id = 1
        mock_project.public_keys = []
        mock_project.allowed_origins = []
        mock_project.properties = '{}'

        mock_media = Mock(spec=Media)
        mock_generate_media.return_value = mock_media
        mock_create_project.return_value = mock_project

        result = await create_project_route(info, project_data)

        assert isinstance(result, ProjectGet)
        assert result.name == project_data.name
        mock_create_project.assert_called_once_with(
            info.context.session(), project_data.name, 1, mock_media.id  # user_id from mock_info
        )


@pytest.mark.asyncio
async def test_delete_project_route():
    info = mock_info()
    project_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.project.owner_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_project_db', new_callable=AsyncMock
    ) as mock_delete_project:

        mock_project = Mock(spec=Project)
        mock_project.id = project_id
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        await delete_project_route(info, project_id)

        mock_get_project.assert_called_once_with(info.context.session(), project_id)
        mock_permission.assert_called_once_with(info, mock_project)
        mock_delete_project.assert_called_once_with(info.context.session(), mock_project)

        # Test unauthorized
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await delete_project_route(info, project_id)
        assert exc.value.status_code == 401

        # Test project not found
        mock_get_project.return_value = None
        with pytest.raises(HTTPException) as exc:
            await delete_project_route(info, project_id)
        assert exc.value.status_code == 404


@pytest.mark.asyncio
async def test_delete_project_public_key_route():
    info = mock_info()
    project_id = 1
    key_id = 1

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.delete_project_public_key_db', new_callable=AsyncMock
    ) as mock_delete_key:

        mock_project = Mock(spec=Project)
        mock_project.id = project_id
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        await delete_project_public_key_route(info, project_id, key_id)

        mock_get_project.assert_called_once_with(info.context.session(), project_id)
        mock_permission.assert_called_once_with(info, mock_project)
        mock_delete_key.assert_called_once_with(info.context.session(), project_id, key_id)

        # Test project not found
        mock_get_project.return_value = None
        with pytest.raises(HTTPException) as exc:
            await delete_project_public_key_route(info, project_id, key_id)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get_project.return_value = mock_project
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await delete_project_public_key_route(info, project_id, key_id)
        assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_remove_user_from_project_route():
    info = mock_info()
    project_id = 1
    user_id = 2

    with patch(
        'services.core.routes.project.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.project.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.project.remove_user_from_project_db', new_callable=AsyncMock
    ) as mock_remove_user:

        mock_project = Mock(spec=Project)
        mock_project.id = project_id
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        await remove_user_from_project_route(info, project_id, user_id)

        mock_get_project.assert_called_once_with(info.context.session(), project_id)
        mock_permission.assert_called_once_with(info, mock_project)
        mock_remove_user.assert_called_once_with(info.context.session(), project_id, user_id)

        # Test project not found
        mock_get_project.return_value = None
        with pytest.raises(HTTPException) as exc:
            await remove_user_from_project_route(info, project_id, user_id)
        assert exc.value.status_code == 404

        # Test unauthorized
        mock_get_project.return_value = mock_project
        mock_permission.return_value = False
        with pytest.raises(HTTPException) as exc:
            await remove_user_from_project_route(info, project_id, user_id)
        assert exc.value.status_code == 401
