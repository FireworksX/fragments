from typing import List
from fastapi import HTTPException, status
import strawberry
from .schemas.feedback import FeelLevelGet, FeedbackPost, FeedbackGet
from .schemas.campaign import CampaignGet
from .schemas.fragment import FragmentGet
from .schemas.user import AuthPayload
from .middleware import Context
from services.core.telegram.bot import send_feedback
from crud.feedback import create_feedback_db
from database import Session

async def create_feedback(info: strawberry.Info[Context], feedback: FeedbackPost) -> FeedbackGet:
    user: AuthPayload = await info.context.user()
    if user is None:
       raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    db: Session = info.context.session()
    feedback_db = await create_feedback_db(db, int(feedback.feel.value), feedback.page, feedback.content)

    fb: FeedbackGet = FeedbackGet(content=feedback_db.content, page=feedback_db.page, feel=FeelLevelGet(feedback_db.feel))

    send_feedback(fb)
    return fb
