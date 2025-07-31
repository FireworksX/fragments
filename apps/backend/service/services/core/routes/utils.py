from conf.settings import logger
from crud.project import get_user_project_role
from database import Session

from .schemas.user import RoleGet


async def get_user_role_in_project(db: Session, user_id: int, project_id: int) -> RoleGet | None:
    logger.info(f"Getting role for user {user_id} in project {project_id}")
    user_role_db: int | None = await get_user_project_role(db, user_id, project_id)
    if user_role_db is None:
        logger.warning(f"No role found for user {user_id} in project {project_id}")
        return None
    logger.info(f"Found role {user_role_db} for user {user_id} in project {project_id}")
    return RoleGet(user_role_db)
