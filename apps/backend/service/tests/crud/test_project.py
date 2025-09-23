from unittest.mock import AsyncMock, Mock, patch

import pytest

from crud.project import (
    add_project_allowed_origin_db,
    add_project_public_api_key,
    add_user_to_project_db,
    change_project_private_api_key,
    change_user_role_db,
    create_project_db,
    create_project_goal_db,
    delete_project_allowed_origin_db,
    delete_project_by_id_db,
    delete_project_goal_db,
    delete_project_public_api_key,
    generate_api_key,
    get_all_allowed_origins_db,
    get_project_by_id_db,
    get_project_goal_by_id_db,
    get_project_goal_by_target_action_db,
    get_project_goals_db,
    get_projects_by_user_id_db,
    get_user_project_role,
    remove_user_from_project_db,
    update_project_by_id_db,
    update_project_goal_db,
    validate_project_public_api_key,
)
from database.models import (
    Project,
    ProjectAllowedOrigin,
    ProjectApiKey,
    ProjectGoal,
    ProjectMemberRole,
    User,
)
from services.core.routes.schemas.project import (
    ProjectGoalPatch,
    ProjectGoalPost,
    ProjectPatch,
    ProjectPost,
)
from services.core.routes.schemas.user import UserRole

mock_logger = Mock()
patch('logging.getLogger', Mock(return_value=mock_logger)).start()
patch('logging.config.fileConfig', Mock()).start()


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
async def test_create_project(mock_session):
    # Mock data
    project_post = ProjectPost(name='Test Project', properties={'key': 'value'})
    user_id = 1

    # Mock generate_default_media
    with patch(
        'crud.project.generate_default_media', new_callable=AsyncMock
    ) as mock_generate_media, patch(
        'crud.project.add_user_to_project_db', new_callable=AsyncMock
    ) as mock_add_user_to_project:
        mock_media = Mock()
        mock_media.id = 1
        mock_generate_media.return_value = mock_media
        mock_add_user_to_project.return_value = None
        # Create project instance
        project = Project(
            name=project_post.name,
            owner_id=user_id,
            logo_id=mock_media.id,
            properties=project_post.properties,
        )

        # Configure mock to return the project
        mock_session.refresh.side_effect = lambda x: None
        mock_session.query.return_value.filter.return_value.first.return_value = project

        result = await create_project_db(mock_session, project_post, user_id)

        assert isinstance(result, Project)
        assert result.name == project_post.name
        assert result.owner_id == user_id
        assert result.logo_id == mock_media.id

        mock_add_user_to_project.assert_called_once_with(
            mock_session, user_id, project.id, UserRole.OWNER
        )
        mock_generate_media.assert_called_once_with(mock_session, f"{project_post.name}.png")


@pytest.mark.asyncio
async def test_add_user_to_project(mock_session):
    user_id = 1
    project_id = 1
    role = UserRole.ADMIN

    # Create project and user instances
    project = Project(id=project_id, name='Test Project')
    user = User(id=user_id, email='test@test.com')

    # Configure mocks to return project and user
    mock_session.query.return_value.filter.return_value.first.side_effect = [project, user]

    await add_user_to_project_db(mock_session, user_id, project_id, role)

    mock_session.commit.assert_called_once()
    assert len(project.members) == 2
    assert project.members[1].role == int(UserRole.ADMIN.value)


@pytest.mark.asyncio
async def test_remove_user_from_project(mock_session):
    user_id = 1
    project_id = 1

    member_role = ProjectMemberRole(user_id=user_id, project_id=project_id)
    mock_session.query.return_value.filter.return_value.first.return_value = member_role

    await remove_user_from_project_db(mock_session, user_id, project_id)

    mock_session.delete.assert_called_once_with(member_role)
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_change_user_role(mock_session):
    user_id = 1
    project_id = 1
    new_role = UserRole.ADMIN

    project = Project(id=project_id, name='Test Project')
    member = ProjectMemberRole(user_id=user_id, project_id=project_id)
    project.members = [member]
    mock_session.query.return_value.filter.return_value.first.return_value = project

    await change_user_role_db(mock_session, user_id, project_id, new_role)

    assert member.role == int(new_role.value)
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_get_project_by_id(mock_session):
    project_id = 1
    project = Project(id=project_id, name='Test Project')

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = project

    found_project = await get_project_by_id_db(mock_session, project_id)

    assert found_project is project
    mock_session.query.assert_called_once_with(Project)

    # Test non-existent project
    mock_filter.first.return_value = None
    not_found = await get_project_by_id_db(mock_session, 99999)
    assert not_found is None


@pytest.mark.asyncio
async def test_delete_project_by_id(mock_session):
    project_id = 1
    project = Project(id=project_id, name='Test Project')
    mock_session.query.return_value.filter.return_value.first.return_value = project

    await delete_project_by_id_db(mock_session, project_id)

    mock_session.delete.assert_called_once_with(project)
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_get_projects_by_user_id(mock_session):
    user_id = 1
    projects = [Project(id=1, name='Project 1'), Project(id=2, name='Project 2')]
    mock_session.query.return_value.join.return_value.filter.return_value.all.return_value = (
        projects
    )

    result = await get_projects_by_user_id_db(mock_session, user_id)

    assert result == projects


@pytest.mark.asyncio
async def test_update_project_by_id(mock_session):
    project_patch = ProjectPatch(id=1, name='Updated Project', properties={'key': 'new_value'})
    project = Project(id=project_patch.id, name='Original Project')

    with patch('crud.project.get_project_by_id_db', new_callable=AsyncMock) as mock_get_project:
        mock_get_project.return_value = project

        updated_project = await update_project_by_id_db(mock_session, project_patch)

        assert updated_project.name == project_patch.name
        mock_session.merge.assert_called_once_with(project)
        mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_create_project_goal(mock_session):
    project_goal = ProjectGoalPost(
        project_id=1,
        name='Test Goal',
        target_action='test_action',
        success_level=0.8,
        failure_level=0.2,
    )

    goal = await create_project_goal_db(mock_session, project_goal)

    assert isinstance(goal, ProjectGoal)
    assert goal.name == project_goal.name
    assert goal.target_action == project_goal.target_action
    mock_session.add.assert_called_once()
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_get_project_goal_by_id(mock_session):
    goal_id = 1
    goal = ProjectGoal(id=goal_id, name='Test Goal')
    mock_session.query.return_value.filter.return_value.first.return_value = goal

    result = await get_project_goal_by_id_db(mock_session, goal_id)

    assert result == goal


@pytest.mark.asyncio
async def test_update_project_goal(mock_session):
    goal = ProjectGoal(id=1, name='Original Goal')
    project_goal = ProjectGoalPatch(
        id=1,
        name='Updated Goal',
        target_action='updated_action',
        success_level=0.9,
        failure_level=0.1,
    )

    with patch(
        'crud.project.get_project_goal_by_target_action_db', new_callable=AsyncMock
    ) as mock_get_goal:
        mock_get_goal.return_value = None

        updated_goal = await update_project_goal_db(mock_session, goal, project_goal)

        assert updated_goal.name == project_goal.name
        assert updated_goal.target_action == project_goal.target_action
        mock_session.merge.assert_called_once_with(goal)
        mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_delete_project_goal(mock_session):
    goal = ProjectGoal(id=1, name='Test Goal')

    await delete_project_goal_db(mock_session, goal)

    mock_session.delete.assert_called_once_with(goal)
    mock_session.commit.assert_called_once()


def test_generate_api_key():
    project_id = 1
    api_key = generate_api_key(project_id)

    assert isinstance(api_key, str)
    assert api_key.startswith(f"{project_id}-")
    parts = api_key.split('-')
    assert len(parts) == 3


@pytest.mark.asyncio
async def test_validate_project_public_api_key(mock_session):
    public_api_key = 'test-key'
    project = Project(id=1, name='Test Project')
    api_key = ProjectApiKey(key=public_api_key, project=project)
    mock_session.query.return_value.filter.return_value.first.return_value = api_key

    result = await validate_project_public_api_key(mock_session, public_api_key)

    assert result == project


@pytest.mark.asyncio
async def test_add_project_allowed_origin(mock_session):
    project_id = 1
    origin = 'http://test.com'
    name = 'Test Origin'
    project = Project(id=project_id, name='Test Project')

    with patch('crud.project.get_project_by_id_db', new_callable=AsyncMock) as mock_get_project:
        mock_get_project.return_value = project

        result = await add_project_allowed_origin_db(mock_session, project_id, origin, name)

        assert result == project
        mock_session.add.assert_called()
        mock_session.commit.assert_called()


@pytest.mark.asyncio
async def test_delete_project_allowed_origin(mock_session):
    project_id = 1
    allowed_origin_id = 1
    origin = ProjectAllowedOrigin(id=allowed_origin_id, project_id=project_id)
    mock_session.query.return_value.filter.return_value.first.return_value = origin

    await delete_project_allowed_origin_db(mock_session, project_id, allowed_origin_id)

    mock_session.delete.assert_called_once_with(origin)
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_get_all_allowed_origins(mock_session):
    origins = [
        ProjectAllowedOrigin(origin='http://test1.com'),
        ProjectAllowedOrigin(origin='http://test2.com'),
    ]
    mock_session.query.return_value.all.return_value = origins

    result = await get_all_allowed_origins_db(mock_session)

    assert len(result) == 2
    assert all(isinstance(origin, str) for origin in result)


@pytest.mark.asyncio
async def test_add_project_public_api_key(mock_session):
    project_id = 1
    project = Project(id=project_id, name='Test Project')

    with patch('crud.project.get_project_by_id_db', new_callable=AsyncMock) as mock_get_project:
        mock_get_project.return_value = project

        project = await add_project_public_api_key(mock_session, project_id)

        assert isinstance(project, Project)
        assert project.public_keys[0].key.startswith(f"{project_id}-")
        mock_session.add.assert_called_once()
        mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_change_project_private_api_key(mock_session):
    project_id = 1
    project = Project(id=project_id, name='Test Project', private_key='old-key')

    with patch('crud.project.get_project_by_id_db', new_callable=AsyncMock) as mock_get_project:
        mock_get_project.return_value = project

        project = await change_project_private_api_key(mock_session, project_id)

        assert isinstance(project, Project)
        assert project.private_key.key.startswith(f"{project_id}-")
        assert project.private_key.key != 'old-key'


@pytest.mark.asyncio
async def test_delete_project_public_api_key(mock_session):
    project_id = 1
    api_key_id = 1
    api_key = ProjectApiKey(id=api_key_id, project_id=project_id)
    mock_session.query.return_value.filter.return_value.first.return_value = api_key

    await delete_project_public_api_key(mock_session, project_id, api_key_id)

    mock_session.delete.assert_called_once_with(api_key)
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_get_projects_by_user_id(mock_session):
    user_id = 1
    projects = [Project(id=1, name='Project 1'), Project(id=2, name='Project 2')]

    mock_session.query.return_value.join.return_value.filter.return_value.all.return_value = (
        projects
    )

    result = await get_projects_by_user_id_db(mock_session, user_id)

    assert len(result) == 2
    assert all(isinstance(project, Project) for project in result)
    mock_session.query.assert_called_once()


@pytest.mark.asyncio
async def test_get_user_project_role(mock_session):
    user_id = 1
    project_id = 1
    role = 1

    project = Project(id=project_id, name='Test Project')
    member = ProjectMemberRole(user_id=user_id, project_id=project_id, role=role)
    project.members = [member]

    mock_session.query.return_value.filter.return_value.first.return_value = project

    result = await get_user_project_role(mock_session, user_id, project_id)

    assert result == role
    mock_session.query.assert_called_once()

    # Test when project doesn't exist
    mock_session.query.return_value.filter.return_value.first.return_value = None
    result = await get_user_project_role(mock_session, user_id, project_id)
    assert result is None


@pytest.mark.asyncio
async def test_get_project_goal_by_target_action_db(mock_session):
    project_id = 1
    target_action = 'test_action'
    goal = ProjectGoal(id=1, project_id=project_id, target_action=target_action, name='Test Goal')

    mock_session.query.return_value.filter.return_value.first.return_value = goal

    result = await get_project_goal_by_target_action_db(mock_session, project_id, target_action)

    assert result == goal
    mock_session.query.assert_called_once()

    # Test when no goal exists
    mock_session.query.return_value.filter.return_value.first.return_value = None
    result = await get_project_goal_by_target_action_db(mock_session, project_id, target_action)
    assert result is None


@pytest.mark.asyncio
async def test_get_project_goals_db(mock_session):
    project_id = 1
    goals = [
        ProjectGoal(id=1, project_id=project_id, name='Goal 1'),
        ProjectGoal(id=2, project_id=project_id, name='Goal 2'),
    ]

    mock_session.query.return_value.filter.return_value.all.return_value = goals

    result = await get_project_goals_db(mock_session, project_id)

    assert len(result) == 2
    assert all(isinstance(goal, ProjectGoal) for goal in result)
    mock_session.query.assert_called_once()

    # Test when no goals exist
    mock_session.query.return_value.filter.return_value.all.return_value = []
    result = await get_project_goals_db(mock_session, project_id)
    assert len(result) == 0
