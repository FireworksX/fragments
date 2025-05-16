from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile, status

from crud.campaign import get_campaign_by_id_db
from crud.media import create_media_db, delete_media_by_id_db
from crud.project import (
    add_project_public_api_key,
    add_user_to_project_db,
    change_project_private_api_key,
    change_user_role_db,
    create_project_db,
    delete_project_by_id_db,
    delete_project_public_api_key,
    get_project_by_id_db,
    get_projects_by_user_id_db,
    get_user_project_role,
    update_project_by_id_db,
)
from crud.user import get_user_by_id_db
from crud.project import create_project_goal_db, get_project_goal_by_id_db, update_project_goal_db, delete_project_goal_db
from database import Media, Session
from database.models import Project, ProjectGoal, ProjectMemberRole, User

from .filesystem import get_directory
from .middleware import Context
from .schemas.campaign import CampaignGet
from .schemas.fragment import FragmentGet
from .schemas.media import MediaGet, MediaType
from .schemas.project import ProjectGet, ProjectKeyGet, ProjectPatch, ProjectPost, ProjectGoalGet, ProjectGoalPost, ProjectGoalPatch
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project, transform_project_members


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


async def private_key_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is RoleGet.OWNER or role is RoleGet.ADMIN


async def transform_project_campaigns(db: Session, project: Project) -> List[CampaignGet]:
    res: List[CampaignGet] = []
    for campaign_relation in project.campaigns:
        res.append(await get_campaign_by_id_db(db, campaign_relation.campaign.id))
    return res

def project_goal_db_to_goal(goal: ProjectGoal) -> ProjectGoalGet:
    return ProjectGoalGet(
        id=goal.id,
        name=goal.name,
        target_action=goal.target_action
    )

async def project_db_to_project(
    info: strawberry.Info[Context], db: Session, project: Project
) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    permission: bool = await private_key_permission(db, user.user.id, project.id)
    return ProjectGet(
        id=project.id,
        name=project.name,
        logo=None if project.logo is None else project.logo.public_path,
        owner=project.owner,
        root_directory_id=project.root_directory_id,
        members=transform_project_members(project),
        campaigns=await transform_project_campaigns(db, project),
        private_key=(
            ProjectKeyGet(value=project.private_key.key, name='private', id=project.private_key.id)
            if permission
            else None
        ),
        public_keys=(
            []
            if project.public_keys is None
            else [
                ProjectKeyGet(value=public_key.key, name=public_key.name, id=public_key.id)
                for public_key in project.public_keys
            ]
        )
    )


async def projects(info: strawberry.Info[Context]) -> List[ProjectGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    prs: List[Project] = await get_projects_by_user_id_db(db, user.user.id)
    res: List[ProjectGet] = []
    for project in prs:
        res.append(await project_by_id(info, project.id))  # TODO issue of sqlalchemy
    return res


async def project_by_id(info: strawberry.Info[Context], project_id: int) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to obtain project',
        )
    return await project_db_to_project(info, db, project)


async def create_project_route(info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await create_project_db(db, pr.name, user.user.id)
    return await project_db_to_project(info, db, project)


async def change_project_private_key_route(
    info: strawberry.Info[Context], project_id: int
) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await private_key_permission(db, user.user.id, project_id)

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to change private key',
        )

    project: Project = await change_project_private_api_key(db, project_id)
    return await project_db_to_project(info, db, project)


async def add_project_public_key_route(
    info: strawberry.Info[Context], project_id: int, public_key_name: Optional[str] = None
) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to add public keys',
        )

    project: Project = await add_project_public_api_key(db, project_id, public_key_name)
    return await project_db_to_project(info, db, project)


async def delete_project_public_key_route(
    info: strawberry.Info[Context], project_id: int, public_key_id: int
) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete public keys',
        )
    try:
        await delete_project_public_api_key(db, project_id, public_key_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=str(e))


async def add_user_to_project(
    info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: int
) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to add users'
        )

    user_to_add: User = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')
    await add_user_to_project_db(db, user_id, project_id, role_to_add)


async def change_user_role(
    info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: RoleGet
):
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to change roles'
        )

    user_to_add: User = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    await change_user_role_db(db, user_id, project_id, int(role_to_add.value))


async def update_project_route(info: strawberry.Info[Context], pr: ProjectPatch) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, pr.id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to add users'
        )

    project: Project = await get_project_by_id_db(db, pr.id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    project: Project = await update_project_by_id_db(db, values=pr.__dict__)
    return await project_db_to_project(info, db, project)


async def delete_project_route(info: strawberry.Info[Context], project_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to obtain project',
        )
    await delete_project_by_id_db(db, project_id)


async def add_project_logo_route(
    info: strawberry.Info[Context], file: UploadFile, project_id: int
) -> MediaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to add users'
        )

    media: Media = await create_media_db(db, file)
    if media is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        )

    project.logo_id = media.id
    db.commit()

    return MediaGet(media_id=media.id, media_type=MediaType.PROJECT_LOGO, public_path=media.public_path)


async def delete_project_logo_route(info: strawberry.Info[Context], project_id: int) -> ProjectGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view fragments',
        )

    await delete_media_by_id_db(db, project.logo_id)
    project.logo_id = None
    db.commit()
    return await project_db_to_project(info, db, project)


async def create_project_goal_route(
    info: strawberry.Info[Context], goal: ProjectGoalPost
) -> ProjectGoalGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, goal.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, goal.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='User is not allowed to create goals'
        )

    goal: ProjectGoal = await create_project_goal_db(db, goal.project_id, goal.name, goal.target_action)
    return project_goal_db_to_goal(goal)

async def get_project_goals_route(info: strawberry.Info[Context], project_id: int) -> List[ProjectGoalGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view goals',
        )
    if project.goals is None:
        return []
    return [project_goal_db_to_goal(goal) for goal in project.goals]

async def update_project_goal_route(
    info: strawberry.Info[Context], goal: ProjectGoalPatch  
) -> ProjectGoalGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    goal_db: ProjectGoal = await get_project_goal_by_id_db(db, goal.id)
    if goal_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal does not exist')

    permission: bool = await write_permission(db, user.user.id, goal_db.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to update goals'
        )

    updated_goal: ProjectGoal = await update_project_goal_db(db, goal.id, goal.name, goal.target_action)
    return project_goal_db_to_goal(updated_goal)


async def delete_project_goal_route(
    info: strawberry.Info[Context], goal_id: int
) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    goal: ProjectGoal = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal does not exist')

    permission: bool = await write_permission(db, user.user.id, goal.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete goals'
        )

    await delete_project_goal_db(db, goal_id)
