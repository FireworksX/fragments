import hashlib
import hmac
import secrets
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import logger, service_settings
from crud.filesystem import create_directory_db
from crud.media import generate_default_media
from database import FilesystemDirectory
from database.models import (
    Project,
    ProjectAllowedOrigin,
    ProjectApiKey,
    ProjectGoal,
    ProjectMemberRole,
    User,
)


def generate_api_key(project_id: int) -> str:
    """
    Generate a private API key that incorporates the project_id.

    The key is composed of three parts:
      1. The project_id
      2. A randomly generated hex string
      3. An HMAC-SHA256 signature of the combination, using the secret_key

    The resulting API key format is:
      <project_id>-<random_hex>-<signature>

    Args:
      project_id (int): The project identifier.
      secret_key (str): A secret key used for signing (should be kept secure).

    Returns:
      str: The generated API key.
    """
    logger.info(f"Generating API key for project {project_id}")
    secret_key: str = service_settings.ACCESS_TOKEN_SECRET_KEY
    # Generate a random hex string (32 hex characters = 16 bytes)
    random_hex = secrets.token_hex(16)

    # Create a message that includes the project_id and the random part.
    message = f"{project_id}:{random_hex}".encode('utf-8')

    # Compute the HMAC-SHA256 signature of the message using the secret key.
    signature = hmac.new(
        secret_key.encode('utf-8'), message, hashlib.sha256  # pylint: disable=E1101
    ).hexdigest()

    # Combine all parts into the final API key.
    api_key = f"{project_id}-{random_hex}-{signature}"
    logger.debug(f"Generated API key for project {project_id}")
    return api_key


async def add_user_to_project_db(db: Session, user_id: int, project_id: int, role: int) -> None:
    logger.info(f"Adding user {user_id} to project {project_id} with role {role}")
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    member_role: ProjectMemberRole = ProjectMemberRole(role=role)
    user: User = db.query(User).filter((User.id == user_id)).first()
    member_role.user = user
    member_role.project = project
    project.members.append(member_role)
    db.commit()
    logger.debug(f"Added user {user_id} to project {project_id}")


async def change_user_role_db(db: Session, user_id: int, project_id: int, role: int) -> None:
    logger.info(f"Changing role for user {user_id} in project {project_id} to {role}")
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    for member in project.members:
        if member.user_id == user_id:
            member.role = role
    db.commit()
    logger.debug(f"Changed role for user {user_id} in project {project_id}")


async def generate_project_private_api_key(project_id: int) -> ProjectApiKey:
    logger.info(f"Generating private API key for project {project_id}")
    private_api_key: str = generate_api_key(project_id)
    return ProjectApiKey(project_id=project_id, is_private=True, key=private_api_key)


async def generate_project_public_api_key(project_id: int) -> ProjectApiKey:
    logger.info(f"Generating public API key for project {project_id}")
    public_api_key: str = generate_api_key(project_id)
    return ProjectApiKey(project_id=project_id, is_private=False, key=public_api_key)


async def change_project_private_api_key(db: Session, project_id: int) -> Project:
    logger.info(f"Changing private API key for project {project_id}")
    project: Project = await get_project_by_id_db(db, project_id)
    api_key: ProjectApiKey = await generate_project_private_api_key(project.id)
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    project.private_key = api_key
    db.commit()
    db.refresh(project)
    logger.debug(f"Changed private API key for project {project_id}")
    return project


async def add_project_public_api_key(
    db: Session, project_id: int, key_name: Optional[str] = None
) -> Project:
    logger.info(f"Adding public API key for project {project_id}")
    project: Project = await get_project_by_id_db(db, project_id)
    api_key: ProjectApiKey = await generate_project_public_api_key(project.id)
    api_key.name = key_name
    db.add(api_key)
    db.commit()
    project.public_keys.append(api_key)
    db.refresh(project)
    logger.debug(f"Added public API key for project {project_id}")
    return project


async def delete_project_public_api_key(db: Session, project_id: int, public_key_id: int) -> None:
    logger.info(f"Deleting public API key {public_key_id} from project {project_id}")
    public_api_key: ProjectApiKey = (
        db.query(ProjectApiKey).filter(ProjectApiKey.id == public_key_id).first()
    )
    if public_api_key is None:
        logger.error(f"Key {public_key_id} does not exist")
        raise ValueError('Key does not exist')
    if public_api_key.project_id != project_id:
        logger.error(f"Cannot remove unrelated key {public_key_id} from project {project_id}")
        raise ValueError("Can't remove unrelated key")
    if public_api_key.is_private:
        logger.error(f"Cannot remove private key {public_key_id}")
        raise ValueError("Can't remove private key")
    db.delete(public_api_key)
    db.commit()
    logger.debug(f"Deleted public API key {public_key_id}")


async def validate_project_public_api_key(db: Session, public_api_key: str) -> Project:
    logger.info('Validating public API key')
    public_api_key_db: ProjectApiKey = (
        db.query(ProjectApiKey).filter(ProjectApiKey.key == public_api_key).first()
    )
    if public_api_key_db is None:
        logger.error('Invalid public key')
        raise ValueError('Invalid public key')
    logger.debug(f"Validated public API key for project {public_api_key_db.project_id}")
    return public_api_key_db.project


async def create_project_db(db: Session, name: str, user_id: int) -> Project:
    logger.info(f"Creating project {name} for user {user_id}")
    default_project_logo = await generate_default_media(db, f"{name}.png")
    project: Project = Project(name=name, owner_id=user_id, logo_id=default_project_logo.id)
    db.add(project)
    db.commit()
    db.refresh(project)

    api_key: ProjectApiKey = await generate_project_private_api_key(project.id)
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    project.private_key_id = api_key.id

    await add_user_to_project_db(db, user_id, project.id, 1)  # 1 = owner
    root_directory: FilesystemDirectory = await create_directory_db(
        db=db, parent_id=None, name=name, project_id=project.id
    )
    project.root_directory = root_directory

    db.add(project)
    db.commit()
    db.refresh(project)
    logger.debug(f"Created project {project.id}")
    return project


async def get_user_project_role(db: Session, user_id: int, project_id: int) -> int | None:
    logger.info(f"Getting role for user {user_id} in project {project_id}")
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    for member in project.members:
        if member.user_id == user_id:
            logger.debug(f"Found role {member.role} for user {user_id}")
            return member.role
    logger.debug(f"No role found for user {user_id}")
    return None


async def get_project_by_id_db(db: Session, project_id: int) -> Optional[Project]:
    logger.info(f"Getting project {project_id}")
    project = db.query(Project).filter(Project.id == project_id).first()
    if project:
        logger.debug(f"Found project {project_id}")
    else:
        logger.debug(f"Project {project_id} not found")
    return project


async def delete_project_by_id_db(db: Session, project_id: int) -> None:
    logger.info(f"Deleting project {project_id}")
    db.query(Project).filter(Project.id == project_id).delete()
    logger.debug(f"Deleted project {project_id}")


async def get_projects_by_user_id_db(db: Session, user_id: int) -> List[Project]:
    logger.info(f"Getting projects for user {user_id}")
    projects = db.query(Project).filter(Project.owner_id == user_id).all()
    logger.debug(f"Found {len(projects)} projects for user {user_id}")
    return projects


async def update_project_by_id_db(db: Session, values: dict) -> Project:
    logger.info(f"Updating project {values['id']}")
    project: Project = await get_project_by_id_db(db, values['id'])
    if values.get('name') is not None:
        project.name = values['name']
    db.merge(project)
    db.commit()
    db.refresh(project)
    logger.debug(f"Updated project {project.id}")
    return project


async def create_project_goal_db(
    db: Session,
    project_id: int,
    name: str,
    target_action: str,
    success_level: Optional[float] = None,
    failure_level: Optional[float] = None,
) -> ProjectGoal:
    logger.info(f"Creating goal {name} for project {project_id}")
    goal = ProjectGoal(
        project_id=project_id,
        name=name,
        target_action=target_action,
        success_level=success_level,
        failure_level=failure_level,
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)
    logger.debug(f"Created goal {goal.id}")
    return goal


async def get_project_goal_by_id_db(db: Session, goal_id: int) -> Optional[ProjectGoal]:
    logger.info(f"Getting goal {goal_id}")
    goal = db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).first()
    if goal:
        logger.debug(f"Found goal {goal_id}")
    else:
        logger.debug(f"Goal {goal_id} not found")
    return goal


async def get_project_goal_by_target_action_db(
    db: Session, project_id: int, target_action: str
) -> Optional[ProjectGoal]:
    logger.info(f"Getting goal with target action {target_action} for project {project_id}")
    goal = (
        db.query(ProjectGoal)
        .filter(ProjectGoal.project_id == project_id, ProjectGoal.target_action == target_action)
        .first()
    )
    if goal:
        logger.debug(f"Found goal {goal.id}")
    else:
        logger.debug(f"No goal found with target action {target_action}")
    return goal


async def get_project_goals_db(db: Session, project_id: int) -> List[ProjectGoal]:
    logger.info(f"Getting all goals for project {project_id}")
    goals = db.query(ProjectGoal).filter(ProjectGoal.project_id == project_id).all()
    logger.debug(f"Found {len(goals)} goals")
    return goals


async def update_project_goal_db(
    db: Session,
    goal_id: int,
    name: Optional[str] = None,
    target_action: Optional[str] = None,
    success_level: Optional[float] = None,
    failure_level: Optional[float] = None,
) -> ProjectGoal:
    logger.info(f"Updating goal {goal_id} with name {name} and target_action {target_action}")
    goal = await get_project_goal_by_id_db(db, goal_id)
    if name is not None:
        goal.name = name
    if target_action is not None:
        # Check if target_action already exists for another goal in this project
        existing_goal = await get_project_goal_by_target_action_db(
            db, goal.project_id, target_action
        )
        if existing_goal and existing_goal.id != goal.id:
            logger.error(f"Target action {target_action} already exists in project")
            raise ValueError(f"Target action {target_action} already exists in project")
        goal.target_action = target_action
    if success_level is not None:
        goal.success_level = success_level
    if failure_level is not None:
        goal.failure_level = failure_level
    db.merge(goal)
    db.commit()
    db.refresh(goal)
    logger.debug(f"Updated goal {goal_id}")
    return goal


async def delete_project_goal_db(db: Session, goal_id: int) -> None:
    logger.info(f"Deleting goal {goal_id}")
    db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).delete()
    db.commit()
    logger.debug(f"Deleted goal {goal_id}")


async def add_project_allowed_origin_db(
    db: Session, project_id: int, origin: str, name: str
) -> Project:
    logger.info(f"Adding allowed origin {origin} to project {project_id}")
    allowed_origin: ProjectAllowedOrigin = ProjectAllowedOrigin(
        project_id=project_id, origin=origin, name=name
    )
    db.add(allowed_origin)
    db.commit()
    db.refresh(allowed_origin)
    project: Project = await get_project_by_id_db(db, project_id)
    project.allowed_origins.append(allowed_origin)
    db.commit()
    db.refresh(project)
    logger.debug(f"Added allowed origin {origin} to project {project_id}")
    return project


async def delete_project_allowed_origin_db(
    db: Session, project_id: int, allowed_origin_id: int
) -> None:
    logger.info(f"Deleting allowed origin {allowed_origin_id} from project {project_id}")
    allowed_origin: ProjectAllowedOrigin = (
        db.query(ProjectAllowedOrigin).filter(ProjectAllowedOrigin.id == allowed_origin_id).first()
    )
    if allowed_origin is None:
        logger.error(f"Allowed origin {allowed_origin_id} not found")
        raise ValueError(f"Allowed origin {allowed_origin_id} not found")
    if allowed_origin.project_id != project_id:
        logger.error(
            f"Cannot remove unrelated origin {allowed_origin_id} from project {project_id}"
        )
        raise ValueError("Can't remove unrelated origin")
    db.delete(allowed_origin)
    db.commit()
    logger.debug(f"Deleted allowed origin {allowed_origin_id} from project {project_id}")


async def get_all_allowed_origins_db(db: Session) -> List[str]:
    logger.info('Getting all allowed origins')
    allowed_origins = db.query(ProjectAllowedOrigin).all()
    logger.debug(f"Found {len(allowed_origins)} allowed origins")
    return [origin.origin for origin in allowed_origins]
