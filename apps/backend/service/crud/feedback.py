from typing import Optional

from sqlalchemy.orm import Session

from database.models import Feedback


async def create_feedback_db(db: Session, feel: int, page: str, content: Optional[str]) -> Feedback:
    feedback: Feedback = Feedback(feel=feel, page=page, content=content)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback


async def get_feedback_by_id_db(db: Session, feedback_id: int) -> Optional[Feedback]:
    return db.query(Feedback).filter(Feedback.id == feedback_id).first()


async def update_feedback_db(
    db: Session, feedback_id: int, feel: int, page: str, content: Optional[str]
) -> Optional[Feedback]:
    feedback = await get_feedback_by_id_db(db, feedback_id)
    if feedback:
        feedback.feel = feel
        feedback.page = page
        feedback.content = content
        db.commit()
        db.refresh(feedback)
    return feedback


async def delete_feedback_db(db: Session, feedback_id: int) -> None:
    feedback = await get_feedback_by_id_db(db, feedback_id)
    if feedback:
        db.delete(feedback)
        db.commit()
