from typing import List

import strawberry
from fastapi import HTTPException, status

from crud.feedback import create_feedback_db
from database import Session
from services.core.telegram.bot import send_feedback

from .middleware import Context
from .schemas.campaign import CampaignGet
from .schemas.feedback import FeedbackGet, FeedbackPost, FeelLevelGet
from .schemas.fragment import FragmentGet
from .schemas.user import AuthPayload
from conf.settings import logger


async def create_feedback(info: strawberry.Info[Context], feedback: FeedbackPost) -> FeedbackGet:
    logger.info("Creating new feedback")
    user: AuthPayload = await info.context.user()
    if user is None:
        logger.warning("Unauthorized attempt to create feedback")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    db: Session = info.context.session()
    logger.debug(f"Creating feedback in database with feel level {feedback.feel.value}, page {feedback.page}")
    feedback_db = await create_feedback_db(
        db, int(feedback.feel.value), feedback.page, feedback.content
    )

    fb: FeedbackGet = FeedbackGet(
        content=feedback_db.content, page=feedback_db.page, feel=FeelLevelGet(feedback_db.feel)
    )

    logger.debug("Sending feedback notification via Telegram")
    send_feedback(fb)
    logger.info("Successfully created and sent feedback")
    return fb
