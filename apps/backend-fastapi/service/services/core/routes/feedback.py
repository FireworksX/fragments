from typing import List
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, Campaign, FeedbackIn, Feedback
from .middleware import Context
from .media import asset
from services.core.telegram.bot import send_feedback


async def create_feedback(info: strawberry.Info[Context], feedback: FeedbackIn) -> Feedback:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    data = {'user_id': user.user.id, 'page': feedback.page,
                                                        'content': feedback.content}
    if feedback.feel is not None:
        data['feel'] = int(feedback.feel.value)
    supabase.postgrest.table("feedback").insert(data).execute()


    fb: Feedback = Feedback(user=user.user, content=feedback.content, page=feedback.page, feel=feedback.feel)

    send_feedback(fb)
    return fb
