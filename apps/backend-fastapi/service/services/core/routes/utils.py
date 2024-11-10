from typing import List

from database import Session, Project
from crud.project import get_user_project_role
from crud.campaign import get_campaign_by_id_db
from .schemas import RoleGet, UserRoleGet, UserGet, CampaignGet


async def get_user_role_in_project(db: Session, user_id: int, project_id: int) -> RoleGet | None:
    user_role_db: int | None = await get_user_project_role(db, user_id, project_id)
    if user_role_db is None:
        return None
    return RoleGet(user_role_db)


def transform_project_members(project: Project) -> List[UserRoleGet]:
    res: List[UserRoleGet] = []
    for member in project.members:
        data = member.user.__dict__
        print(data)
        data['role'] = RoleGet(member.role)
        res.append(UserRoleGet(**data))
    return res


def transform_project_owner(project: Project) -> UserGet:
    data = project.owner.__dict__
    print(data)
    return UserGet(**data)
