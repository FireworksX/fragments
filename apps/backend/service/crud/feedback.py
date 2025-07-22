from typing import Optional

from sqlalchemy.orm import Session

from database.models import Feedback
from conf.settings import logger


async def create_feedback_db(db: Session, feel: int, page: str, content: Optional[str]) -> Feedback:
    logger.info(f"Creating feedback for page {page}")
    feedback: Feedback = Feedback(feel=feel, page=page, content=content)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    logger.debug(f"Created feedback {feedback.id}")
    return feedback


async def get_feedback_by_id_db(db: Session, feedback_id: int) -> Optional[Feedback]:
    logger.info(f"Getting feedback by id {feedback_id}")
    feedback = db.query(Feedback).filter(Feedback.id == feedback_id).first()
    if feedback:
        logger.debug(f"Found feedback {feedback.id}")
    else:
        logger.debug(f"Feedback {feedback_id} not found")
    return feedback


async def update_feedback_db(
    db: Session, feedback_id: int, feel: int, page: str, content: Optional[str]
) -> Optional[Feedback]:
    logger.info(f"Updating feedback {feedback_id}")
    feedback = await get_feedback_by_id_db(db, feedback_id)
    if feedback:
        feedback.feel = feel
        feedback.page = page
        feedback.content = content
        db.commit()
        db.refresh(feedback)
        logger.debug(f"Updated feedback {feedback.id}")
    else:
        logger.debug(f"Feedback {feedback_id} not found for update")
    return feedback


async def delete_feedback_db(db: Session, feedback_id: int) -> None:
    logger.info(f"Deleting feedback {feedback_id}")
    feedback = await get_feedback_by_id_db(db, feedback_id)
    if feedback:
        db.delete(feedback)
        db.commit()
        logger.debug(f"Deleted feedback {feedback_id}")
    else:
        logger.debug(f"Feedback {feedback_id} not found for deletion")
