from typing import List

from crud.campaign import get_campaign_by_id_db
from crud.project import get_user_project_role
from database import Project, Session

from .schemas.campaign import CampaignGet
from .schemas.user import RoleGet, UserGet, UserRoleGet


async def get_user_role_in_project(db: Session, user_id: int, project_id: int) -> RoleGet | None:
    user_role_db: int | None = await get_user_project_role(db, user_id, project_id)
    if user_role_db is None:
        return None
    return RoleGet(user_role_db)
