from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile, status

from conf.settings import logger
from crud.media import create_media_db, delete_media_by_id_db, generate_default_media
from crud.project import (
    add_project_allowed_origin_db,
    add_project_public_api_key,
    add_user_to_project_db,
    change_project_private_api_key,
    change_user_role_db,
    create_project_db,
    create_project_goal_db,
    delete_project_allowed_origin_db,
    delete_project_by_id_db,
    delete_project_goal_db,
    delete_project_public_api_key,
    get_project_by_id_db,
    get_project_goal_by_id_db,
    get_projects_by_user_id_db,
    update_project_by_id_db,
    update_project_goal_db,
)
from crud.user import get_user_by_email_db, get_user_by_id_db
from database import Media, Session
from database.models import Project, ProjectGoal, User

from .area import area_db_to_area
from .middleware import Context
from .schemas.media import MediaGet, MediaType
from .schemas.project import (
    ProjectAllowedOriginGet,
    ProjectGet,
    ProjectGoalGet,
    ProjectGoalPatch,
    ProjectGoalPost,
    ProjectKeyGet,
    ProjectPatch,
    ProjectPost,
)
from .schemas.user import AuthPayload, UserRole, UserRoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[UserRole] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: Optional[UserRole] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not UserRole.DESIGNER


async def private_key_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking private key permission for user {user_id} in project {project_id}")
    role: Optional[UserRole] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is UserRole.OWNER or role is UserRole.ADMIN


def project_goal_db_to_goal(goal: ProjectGoal) -> ProjectGoalGet:
    logger.debug(f"Converting project goal {goal.id} to schema")
    return ProjectGoalGet(
        id=goal.id,
        name=goal.name,
        target_action=goal.target_action,
        success_level=goal.success_level,
        failure_level=goal.failure_level,
    )


async def project_db_to_project(
    info: strawberry.Info[Context], db: Session, project: Project
) -> ProjectGet:
    logger.debug(f"Converting project {project.id} to schema")
    user: AuthPayload = await info.context.user()
    permission: bool = await private_key_permission(db, user.user.id, project.id)
    return ProjectGet(
        id=project.id,
        name=project.name,
        logo=MediaGet(
            media_id=project.logo_id,
            media_type=MediaType.PROJECT_LOGO,
            public_path=project.logo.public_path,
        ),
        owner=user_db_to_user(project.owner),
        root_directory_id=project.root_directory_id,
        members=[
            UserRoleGet(
                id=member.user.id,
                email=member.user.email,
                first_name=member.user.first_name,
                last_name=member.user.last_name,
                logo=MediaGet(
                    media_id=member.user.avatar_id,
                    media_type=MediaType.USER_LOGO,
                    public_path=member.user.avatar.public_path,
                ),
                role=UserRole(member.role),
            )
            for member in project.members
        ],
        areas=([] if project.areas is None else [area_db_to_area(area) for area in project.areas]),
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
        ),
        allowed_origins=(
            []
            if project.allowed_origins is None
            else [
                ProjectAllowedOriginGet(id=origin.id, name=origin.name, origin=origin.origin)
                for origin in project.allowed_origins
            ]
        ),
    )


async def projects(info: strawberry.Info[Context]) -> List[ProjectGet]:
    logger.info('Getting all projects for user')
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    prs: List[Project] = await get_projects_by_user_id_db(db, user.user.id)
    res: List[ProjectGet] = []
    for project in prs:
        res.append(await project_by_id(info, project.id))  # TODO issue of sqlalchemy
    logger.info(f"Found {len(res)} projects")
    return res


async def project_by_id(info: strawberry.Info[Context], project_id: int) -> ProjectGet:
    logger.info(f"Getting project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to obtain project',
        )
    logger.info(f"Successfully retrieved project {project_id}")
    return await project_db_to_project(info, db, project)


async def create_project_route(info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
    logger.info(f"Creating new project with name {pr.name}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Project = await create_project_db(db, pr.name, user.user.id)
    logger.info(f"Created project {project.id}")
    return await project_db_to_project(info, db, project)


async def change_project_private_key_route(
    info: strawberry.Info[Context], project_id: int
) -> ProjectGet:
    logger.info(f"Changing private key for project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await private_key_permission(db, user.user.id, project_id)

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to change private key for project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to change private key',
        )

    project = await change_project_private_api_key(db, project_id)
    logger.info(f"Changed private key for project {project_id}")
    return await project_db_to_project(info, db, project)


async def add_project_public_key_route(
    info: strawberry.Info[Context], project_id: int, public_key_name: Optional[str] = None
) -> ProjectGet:
    logger.info(f"Adding public key to project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to add public key to project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to add public keys',
        )

    project = await add_project_public_api_key(db, project_id, public_key_name)
    logger.info(f"Added public key to project {project_id}")
    return await project_db_to_project(info, db, project)


async def delete_project_public_key_route(
    info: strawberry.Info[Context], project_id: int, public_key_id: int
) -> None:
    logger.info(f"Deleting public key {public_key_id} from project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to delete public key from project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete public keys',
        )
    try:
        await delete_project_public_api_key(db, project_id, public_key_id)
        logger.info(f"Deleted public key {public_key_id} from project {project_id}")
    except ValueError as exc:
        logger.error(f"Failed to delete public key {public_key_id}: {str(exc)}")
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=str(exc)) from exc


async def invite_user_to_project_route(
    info: strawberry.Info[Context], email: str, project_id: int, role_to_add: UserRole
) -> None:
    logger.info(f"Inviting user {email} to project {project_id} with role {role_to_add}")
    db: Session = info.context.session()
    user: Optional[User] = await get_user_by_email_db(db, email)
    if user is None:
        logger.error(f"User {email} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')
    await add_user_to_project_db(db, user.id, project_id, role_to_add)
    logger.info(f"Invited user {email} to project {project_id} with role {role_to_add}")


async def add_user_to_project_route(
    info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: UserRole
) -> None:
    logger.info(f"Adding user {user_id} to project {project_id} with role {role_to_add}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to add users to project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to add users'
        )

    user_to_add: Optional[User] = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        logger.error(f"User {user_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')
    await add_user_to_project_db(db, user_id, project_id, role_to_add)
    logger.info(f"Added user {user_id} to project {project_id}")


async def change_user_role_route(
    info: strawberry.Info[Context], user_id: int, project_id: int, role_to_add: UserRole
) -> None:
    logger.info(f"Changing role for user {user_id} in project {project_id} to {role_to_add}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to change roles in project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to change roles'
        )

    user_to_add: Optional[User] = await get_user_by_id_db(db, user_id=user_id)
    if user_to_add is None:
        logger.error(f"User {user_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exist')

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    await change_user_role_db(db, user_id, project_id, role_to_add)
    logger.info(f"Changed role for user {user_id} in project {project_id}")


async def update_project_route(info: strawberry.Info[Context], pr: ProjectPatch) -> ProjectGet:
    logger.info(f"Updating project {pr.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    permission: bool = await write_permission(db, user.user.id, pr.id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update project {pr.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to add users'
        )

    project: Optional[Project] = await get_project_by_id_db(db, pr.id)
    if project is None:
        logger.error(f"Project {pr.id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    project = await update_project_by_id_db(db, values=pr.__dict__)
    logger.info(f"Updated project {pr.id}")
    return await project_db_to_project(info, db, project)


async def delete_project_route(info: strawberry.Info[Context], project_id: int) -> None:
    logger.info(f"Deleting project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to obtain project',
        )
    await delete_project_by_id_db(db, project_id)
    logger.info(f"Deleted project {project_id}")


async def add_project_logo_route(
    info: strawberry.Info[Context], file: UploadFile, project_id: int
) -> MediaGet:
    logger.info(f"Adding logo to project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to add logo to project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to add logo'
        )

    try:
        media: Media = await create_media_db(db, file)
    except Exception as exc:
        logger.error(f"Failed to create media file for project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        ) from exc

    project.logo_id = media.id
    db.commit()
    logger.info(f"Added logo to project {project_id}")

    return MediaGet(
        media_id=media.id, media_type=MediaType.PROJECT_LOGO, public_path=media.public_path
    )


async def delete_project_logo_route(info: strawberry.Info[Context], project_id: int) -> ProjectGet:
    logger.info(f"Deleting logo from project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete logo from project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view fragments',
        )

    await delete_media_by_id_db(db, project.logo_id)
    default_logo = await generate_default_media(db, f"{project.name}.png")
    project.logo_id = default_logo.id
    db.commit()
    logger.info(f"Deleted logo from project {project_id}")
    return await project_db_to_project(info, db, project)


async def create_project_goal_route(
    info: strawberry.Info[Context], goal: ProjectGoalPost
) -> ProjectGoalGet:
    logger.info(f"Creating goal for project {goal.project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, goal.project_id)
    if project is None:
        logger.error(f"Project {goal.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create goal in project {goal.project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to create goals'
        )

    goal_db: ProjectGoal = await create_project_goal_db(db, goal)
    logger.info(f"Created goal {goal_db.id} for project {goal.project_id}")
    return project_goal_db_to_goal(goal_db)


async def get_project_goals_route(
    info: strawberry.Info[Context], project_id: int
) -> List[ProjectGoalGet]:
    logger.info(f"Getting goals for project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view goals in project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view goals',
        )
    if project.goals is None:
        logger.info(f"No goals found for project {project_id}")
        return []
    goals = [project_goal_db_to_goal(goal) for goal in project.goals]
    logger.info(f"Found {len(goals)} goals for project {project_id}")
    return goals


async def update_project_goal_route(
    info: strawberry.Info[Context], goal: ProjectGoalPatch
) -> ProjectGoalGet:
    logger.info(f"Updating goal {goal.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    goal_db: Optional[ProjectGoal] = await get_project_goal_by_id_db(db, goal.id)
    if goal_db is None:
        logger.error(f"Goal {goal.id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal does not exist')

    permission: bool = await write_permission(db, user.user.id, goal_db.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update goal {goal.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to update goals'
        )

    updated_goal: ProjectGoal = await update_project_goal_db(db, goal_db, goal)
    logger.info(f"Updated goal {updated_goal.id}")
    return project_goal_db_to_goal(updated_goal)


async def delete_project_goal_route(info: strawberry.Info[Context], goal_id: int) -> None:
    logger.info(f"Deleting goal {goal_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    goal: Optional[ProjectGoal] = await get_project_goal_by_id_db(db, goal_id)
    if goal is None:
        logger.error(f"Goal {goal_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Goal does not exist')

    permission: bool = await write_permission(db, user.user.id, goal.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete goal {goal_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to delete goals'
        )

    await delete_project_goal_db(db, goal)
    logger.info(f"Deleted goal {goal.id}")


async def add_project_allowed_origin_route(
    info: strawberry.Info[Context], project_id: int, origin: str, name: str
) -> ProjectGet:
    logger.info(f"Adding allowed origin {origin} to project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to add allowed origin to project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to add allowed origins',
        )

    if origin == '*':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Allowed origin cannot be *'
        )

    project = await add_project_allowed_origin_db(db, project_id, origin, name)
    logger.info(f"Added allowed origin {origin} to project {project_id}")
    return await project_db_to_project(info, db, project)


async def delete_project_allowed_origin_route(
    info: strawberry.Info[Context], project_id: int, allowed_origin_id: int
) -> None:
    logger.info(f"Deleting allowed origin {allowed_origin_id} from project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Optional[Project] = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to delete allowed origin from project {project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete allowed origins',
        )

    await delete_project_allowed_origin_db(db, project_id, allowed_origin_id)
