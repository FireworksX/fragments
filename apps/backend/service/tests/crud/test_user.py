import pytest
from unittest.mock import Mock, AsyncMock

from crud.user import create_user_db, get_user_by_email_db, get_user_by_id_db
from database.models import User


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    return session


@pytest.mark.asyncio
async def test_create_user(mock_session):
    email = "test@example.com"
    first_name = "Test"
    last_name = "User"
    hashed_password = "hashedpass123"

    # Configure mock to return the user object after refresh
    mock_session.refresh.side_effect = lambda x: None
    
    user = await create_user_db(mock_session, email, first_name, last_name, hashed_password)

    assert isinstance(user, User)
    assert user.email == email
    assert user.first_name == first_name
    assert user.last_name == last_name
    assert user.hashed_password == hashed_password

    mock_session.add.assert_called_once()
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once()


@pytest.mark.asyncio
async def test_get_user_by_email(mock_session):
    email = "find@example.com"
    mock_user = User(email=email, first_name="Find", last_name="Me", hashed_password="pass123")
    
    # Configure mock query
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_user

    found_user = await get_user_by_email_db(mock_session, email)
    
    assert found_user is mock_user
    mock_session.query.assert_called_once_with(User)
    mock_query.filter.assert_called_once()

    # Test non-existent user
    mock_filter.first.return_value = None
    not_found = await get_user_by_email_db(mock_session, "nonexistent@example.com")
    assert not_found is None


@pytest.mark.asyncio
async def test_get_user_by_id(mock_session):
    user_id = 1
    mock_user = User(id=user_id, email="findid@example.com", first_name="Find", last_name="ById", hashed_password="pass123")
    
    # Configure mock query
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_user

    found_user = await get_user_by_id_db(mock_session, user_id)
    
    assert found_user is mock_user
    mock_session.query.assert_called_once_with(User)
    mock_query.filter.assert_called_once()

    # Test non-existent user
    mock_filter.first.return_value = None
    not_found = await get_user_by_id_db(mock_session, 99999)
    assert not_found is None

