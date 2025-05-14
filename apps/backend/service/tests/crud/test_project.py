import pytest
from unittest.mock import Mock, AsyncMock

from crud.project import (
    generate_api_key, add_user_to_project_db, change_user_role_db,
    generate_project_private_api_key, generate_project_public_api_key,
    change_project_private_api_key, add_project_public_api_key,
    delete_project_public_api_key, validate_project_public_api_key,
    create_project_db, get_user_project_role, get_project_by_id_db,
    delete_project_by_id_db, get_projects_by_user_id_db,
    update_project_by_id_db, create_project_goal_db,
    get_project_goal_by_id_db, get_project_goals_db,
    update_project_goal_db, delete_project_goal_db
)
from database.models import Project, ProjectApiKey, ProjectMemberRole, User, ProjectGoal, FilesystemDirectory


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    session.merge = Mock()
    session.delete = Mock()
    return session


def test_generate_api_key():
    project_id = 1
    api_key = generate_api_key(project_id)
    
    # Check format: <project_id>-<random_hex>-<signature>
    parts = api_key.split('-')
    assert len(parts) == 3
    assert parts[0] == str(project_id)
    assert len(parts[1]) == 32  # 16 bytes = 32 hex chars
    assert len(parts[2]) == 64  # SHA256 hex digest is 64 chars


@pytest.mark.asyncio
async def test_add_user_to_project(mock_session):
    project_id = 1
    user_id = 1
    role = 2
    
    mock_project = Project(id=project_id)
    mock_user = User(id=user_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.side_effect = [mock_project, mock_user]
    
    await add_user_to_project_db(mock_session, user_id, project_id, role)
    
    assert len(mock_project.members) == 2
    assert mock_project.members[0].role == role
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_change_user_role(mock_session):
    project_id = 1
    user_id = 1
    new_role = 2
    
    mock_member = ProjectMemberRole(user_id=user_id, role=1)
    mock_project = Project(id=project_id, members=[mock_member])
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    await change_user_role_db(mock_session, user_id, project_id, new_role)
    
    assert mock_member.role == new_role
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_generate_project_api_keys():
    project_id = 1
    
    private_key = await generate_project_private_api_key(project_id)
    assert isinstance(private_key, ProjectApiKey)
    assert private_key.is_private
    assert private_key.project_id == project_id
    
    public_key = await generate_project_public_api_key(project_id)
    assert isinstance(public_key, ProjectApiKey)
    assert not public_key.is_private
    assert public_key.project_id == project_id


@pytest.mark.asyncio
async def test_change_project_private_api_key(mock_session):
    project_id = 1
    mock_project = Project(id=project_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    updated_project = await change_project_private_api_key(mock_session, project_id)
    
    assert updated_project.private_key is not None
    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 2
    assert mock_session.refresh.call_count == 2


@pytest.mark.asyncio
async def test_add_project_public_api_key(mock_session):
    project_id = 1
    key_name = "test_key"
    mock_project = Project(id=project_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    updated_project = await add_project_public_api_key(mock_session, project_id, key_name)
    
    assert len(updated_project.public_keys) == 1
    assert updated_project.public_keys[0].name == key_name
    mock_session.add.assert_called_once()
    mock_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_delete_project_public_api_key(mock_session):
    project_id = 1
    key_id = 1
    
    mock_key = ProjectApiKey(id=key_id, project_id=project_id, is_private=False)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_key
    
    await delete_project_public_api_key(mock_session, project_id, key_id)
    
    mock_session.delete.assert_called_once_with(mock_key)
    mock_session.commit.assert_called_once()

    # Test error cases
    with pytest.raises(ValueError, match="Key does not exist"):
        mock_filter.first.return_value = None
        await delete_project_public_api_key(mock_session, project_id, key_id)

    with pytest.raises(ValueError, match="Can't remove unrelated key"):
        mock_filter.first.return_value = ProjectApiKey(id=key_id, project_id=999, is_private=False)
        await delete_project_public_api_key(mock_session, project_id, key_id)

    with pytest.raises(ValueError, match="Can't remove private key"):
        mock_filter.first.return_value = ProjectApiKey(id=key_id, project_id=project_id, is_private=True)
        await delete_project_public_api_key(mock_session, project_id, key_id)


@pytest.mark.asyncio
async def test_validate_project_public_api_key(mock_session):
    api_key = "test-key"
    mock_key = ProjectApiKey(key=api_key)
    mock_key.project = Project(id=1)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_key
    
    project = await validate_project_public_api_key(mock_session, api_key)
    assert project == mock_key.project

    with pytest.raises(ValueError, match="Invalid public key"):
        mock_filter.first.return_value = None
        await validate_project_public_api_key(mock_session, "invalid-key")


@pytest.mark.asyncio
async def test_create_project(mock_session):
    name = "Test Project"
    user_id = 1
    
    mock_project = Project(id=1, name=name, owner_id=user_id)
    mock_user = User(id=user_id)
    mock_directory = FilesystemDirectory(id=1, name=name)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.side_effect = [mock_project, mock_user, mock_project]
    
    mock_session.refresh.side_effect = lambda x: None
    mock_session.add.side_effect = lambda x: None
    
    created_project = await create_project_db(mock_session, name, user_id)
    
    assert isinstance(created_project, Project)
    assert created_project.name == name
    assert created_project.owner_id == user_id
    
    # Verify all the required objects were created and saved
    assert mock_session.add.call_count == 4  # Project, ApiKey, ProjectMemberRole, FilesystemDirectory
    assert mock_session.commit.call_count == 5
    assert mock_session.refresh.call_count == 4


@pytest.mark.asyncio
async def test_get_user_project_role(mock_session):
    project_id = 1
    user_id = 1
    role = 2
    
    mock_member = ProjectMemberRole(user_id=user_id, role=role)
    mock_project = Project(id=project_id, members=[mock_member])
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    result_role = await get_user_project_role(mock_session, user_id, project_id)
    assert result_role == role

    # Test non-member case
    result_role = await get_user_project_role(mock_session, 999, project_id)
    assert result_role is None


@pytest.mark.asyncio
async def test_get_project_by_id(mock_session):
    project_id = 1
    mock_project = Project(id=project_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    project = await get_project_by_id_db(mock_session, project_id)
    assert project == mock_project


@pytest.mark.asyncio
async def test_delete_project_by_id(mock_session):
    project_id = 1
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_delete = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.delete = mock_delete
    
    await delete_project_by_id_db(mock_session, project_id)
    
    mock_session.query.assert_called_once_with(Project)
    mock_query.filter.assert_called_once()
    mock_filter.delete.assert_called_once()


@pytest.mark.asyncio
async def test_get_projects_by_user_id(mock_session):
    user_id = 1
    mock_projects = [Project(id=1), Project(id=2)]
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.all.return_value = mock_projects
    
    projects = await get_projects_by_user_id_db(mock_session, user_id)
    assert projects == mock_projects


@pytest.mark.asyncio
async def test_update_project_by_id(mock_session):
    project_id = 1
    old_name = "Old Project Name"
    new_name = "New Project Name"
    
    mock_project = Project(id=project_id, name=old_name)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_project
    
    values = {'id': project_id, 'name': new_name}
    updated_project = await update_project_by_id_db(mock_session, values)
    
    assert updated_project.name == new_name
    mock_session.merge.assert_called_once_with(mock_project)
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(mock_project)


@pytest.mark.asyncio
async def test_project_goals(mock_session):
    project_id = 1
    goal_id = 1
    name = "Test Goal"
    target_action = "test_action"
    
    # Test create_project_goal_db
    mock_goal = ProjectGoal(id=goal_id, project_id=project_id, name=name, target_action=target_action)
    mock_session.refresh.side_effect = lambda x: None
    
    created_goal = await create_project_goal_db(mock_session, project_id, name, target_action)
    assert isinstance(created_goal, ProjectGoal)
    assert created_goal.name == name
    assert created_goal.target_action == target_action
    
    # Test get_project_goal_by_id_db
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_goal
    
    goal = await get_project_goal_by_id_db(mock_session, goal_id)
    assert goal == mock_goal
    
    # Test get_project_goals_db
    mock_goals = [
        ProjectGoal(id=1, project_id=project_id),
        ProjectGoal(id=2, project_id=project_id)
    ]
    mock_filter.all.return_value = mock_goals
    
    goals = await get_project_goals_db(mock_session, project_id)
    assert len(goals) == 2
    assert all(isinstance(goal, ProjectGoal) for goal in goals)
    
    # Test update_project_goal_db
    new_name = "Updated Goal"
    new_action = "updated_action"
    
    updated_goal = await update_project_goal_db(mock_session, goal_id, new_name, new_action)
    assert updated_goal.name == new_name
    assert updated_goal.target_action == new_action
    
    # Test delete_project_goal_db
    await delete_project_goal_db(mock_session, goal_id)
    mock_session.commit.assert_called()


