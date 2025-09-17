from typing import List

from sqlalchemy.orm import Session

from conf.settings import logger
from database.models import Fragment


async def get_default_templates_db(db: Session) -> List[Fragment]:
    logger.info('Getting default templates')
    return []  # TODO: Implement


async def is_default_template_db(db: Session, fragment_id: int) -> bool:
    logger.info(f'Checking if fragment {fragment_id} is a default template')
    return False  # TODO: Implement
