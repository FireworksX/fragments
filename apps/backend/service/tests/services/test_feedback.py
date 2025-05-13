import pytest
from unittest.mock import AsyncMock, Mock, patch

from fastapi import HTTPException
from services.core.routes.feedback import create_feedback
from services.core.routes.schemas.feedback import FeedbackGet, FeedbackPost, FeelLevelGet

def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    return info

@pytest.mark.asyncio
async def test_create_feedback_successful():
    with patch(
        'services.core.routes.feedback.create_feedback_db', new_callable=AsyncMock
    ) as mock_create_feedback, patch(
        'services.core.routes.feedback.send_feedback', new_callable=Mock
    ) as mock_send_feedback:

        mock_feedback_db = Mock()
        mock_feedback_db.content = "Test feedback"
        mock_feedback_db.page = "test_page"
        mock_feedback_db.feel = 1
        mock_create_feedback.return_value = mock_feedback_db

        info = mock_info()
        feedback = FeedbackPost(
            content="Test feedback",
            page="test_page",
            feel=FeelLevelGet.ONE
        )

        response = await create_feedback(info, feedback)

        assert isinstance(response, FeedbackGet)
        assert response.content == "Test feedback"
        assert response.page == "test_page"
        assert response.feel == FeelLevelGet.ONE

        mock_create_feedback.assert_called_once_with(
            info.context.session(),
            1,
            "test_page",
            "Test feedback"
        )
        mock_send_feedback.assert_called_once()

@pytest.mark.asyncio
async def test_create_feedback_unauthorized():
    info = mock_info()
    info.context.user = AsyncMock(return_value=None)
    
    feedback = FeedbackPost(
        content="Test feedback",
        page="test_page",
        feel=FeelLevelGet.ONE
    )

    with pytest.raises(HTTPException) as exc:
        await create_feedback(info, feedback)
    
    assert exc.value.status_code == 401
