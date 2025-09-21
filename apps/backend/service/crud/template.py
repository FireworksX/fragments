from typing import List

from sqlalchemy.orm import Session

from conf.settings import logger
from database.models import Fragment


async def get_default_templates_db(db: Session) -> List[Fragment]:
    logger.info('Getting default templates')
    templates = (
        db.query(Fragment)
        .filter(Fragment.project_id == 8)
        .filter(~Fragment.name.ilike('%draft%'))
        .all()
    )
    logger.debug(f'Found {len(templates)} default templates')
    return templates


async def is_default_template_db(db: Session, fragment_id: int) -> bool:
    logger.info(f'Checking if fragment {fragment_id} is a default template')
    fragment = db.query(Fragment).filter(Fragment.id == fragment_id).first()
    if fragment is None:
        return False
    return fragment.project_id == 8
