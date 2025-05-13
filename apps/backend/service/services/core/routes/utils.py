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


def transform_project_members(project: Project) -> List[UserRoleGet]:
    res: List[UserRoleGet] = []
    for member in project.members:
        data = member.user.__dict__
        data['role'] = RoleGet(member.role)
        res.append(UserRoleGet(**data))
    return res


def transform_project_owner(project: Project) -> UserGet:
    data = project.owner.__dict__
    return UserGet(**data)
