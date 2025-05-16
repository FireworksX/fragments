import pytest
from unittest.mock import Mock

from crud.feedback import (
    create_feedback_db, get_feedback_by_id_db,
    update_feedback_db, delete_feedback_db
)
from database.models import Feedback


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    return session


@pytest.mark.asyncio
async def test_create_feedback(mock_session):
    feel = 1
    page = "test_page"
    content = "test content"

    mock_feedback = Feedback(feel=feel, page=page, content=content)
    mock_session.refresh.side_effect = lambda x: None

    created_feedback = await create_feedback_db(mock_session, feel, page, content)

    assert isinstance(created_feedback, Feedback)
    assert created_feedback.feel == feel
    assert created_feedback.page == page
    assert created_feedback.content == content

    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_get_feedback_by_id(mock_session):
    feedback_id = 1
    mock_feedback = Feedback(id=feedback_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_feedback

    feedback = await get_feedback_by_id_db(mock_session, feedback_id)
    assert feedback == mock_feedback


@pytest.mark.asyncio
async def test_update_feedback(mock_session):
    feedback_id = 1
    feel = 2
    page = "updated_page"
    content = "updated content"

    mock_feedback = Feedback(id=feedback_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_feedback

    updated_feedback = await update_feedback_db(mock_session, feedback_id, feel, page, content)

    assert updated_feedback == mock_feedback
    assert updated_feedback.feel == feel
    assert updated_feedback.page == page
    assert updated_feedback.content == content
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_delete_feedback(mock_session):
    feedback_id = 1
    mock_feedback = Feedback(id=feedback_id)

    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_feedback

    await delete_feedback_db(mock_session, feedback_id)

    assert mock_session.delete.call_count == 1
    assert mock_session.commit.call_count == 1
