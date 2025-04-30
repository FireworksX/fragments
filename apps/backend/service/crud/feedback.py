from typing import Optional

from sqlalchemy.orm import Session

from database.models import Feedback


async def create_feedback_db(db: Session, feel: int, page: str, content: Optional[str]) -> Feedback:
    feedback: Feedback = Feedback(feel=feel, page=page, content=content)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback
