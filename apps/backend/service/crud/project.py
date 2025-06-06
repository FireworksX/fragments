import hashlib
import hmac
import secrets
from typing import List, Optional

from sqlalchemy.orm import Session

from conf.settings import service_settings
from crud.filesystem import create_directory_db
from crud.media import generate_default_media
from database import FilesystemDirectory
from database.models import Project, ProjectApiKey, ProjectGoal, ProjectMemberRole, User


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
    secret_key: str = service_settings.ACCESS_TOKEN_SECRET_KEY
    # Generate a random hex string (32 hex characters = 16 bytes)
    random_hex = secrets.token_hex(16)

    # Create a message that includes the project_id and the random part.
    message = f"{project_id}:{random_hex}".encode('utf-8')

    # Compute the HMAC-SHA256 signature of the message using the secret key.
    signature = hmac.new(secret_key.encode('utf-8'), message, hashlib.sha256).hexdigest()

    # Combine all parts into the final API key.
    api_key = f"{project_id}-{random_hex}-{signature}"
    return api_key


async def add_user_to_project_db(db: Session, user_id: int, project_id: int, role: int) -> None:
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    role: ProjectMemberRole = ProjectMemberRole(role=role)
    user: User = db.query(User).filter((User.id == user_id)).first()
    role.user = user
    role.project = project
    project.members.append(role)
    db.commit()


async def change_user_role_db(db: Session, user_id: int, project_id: int, role: int) -> None:
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    for member in project.members:
        if member.user_id == user_id:
            member.role = role
    db.commit()


async def generate_project_private_api_key(project_id: int) -> ProjectApiKey:
    private_api_key: str = generate_api_key(project_id)
    return ProjectApiKey(project_id=project_id, is_private=True, key=private_api_key)


async def generate_project_public_api_key(project_id: int) -> ProjectApiKey:
    public_api_key: str = generate_api_key(project_id)
    return ProjectApiKey(project_id=project_id, is_private=False, key=public_api_key)


async def change_project_private_api_key(db: Session, project_id: int) -> Project:
    project: Project = await get_project_by_id_db(db, project_id)
    api_key: ProjectApiKey = await generate_project_private_api_key(project.id)
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    project.private_key = api_key
    db.commit()
    db.refresh(project)
    return project


async def add_project_public_api_key(
    db: Session, project_id: int, key_name: Optional[str] = None
) -> Project:
    project: Project = await get_project_by_id_db(db, project_id)
    api_key: ProjectApiKey = await generate_project_public_api_key(project.id)
    api_key.name = key_name
    db.add(api_key)
    db.commit()
    project.public_keys.append(api_key)
    db.refresh(project)
    return project


async def delete_project_public_api_key(db: Session, project_id: int, public_key_id: int) -> None:
    public_api_key: ProjectApiKey = (
        db.query(ProjectApiKey).filter(ProjectApiKey.id == public_key_id).first()
    )
    if public_api_key is None:
        raise ValueError('Key does not exist')
    if public_api_key.project_id != project_id:
        raise ValueError("Can't remove unrelated key")
    if public_api_key.is_private:
        raise ValueError("Can't remove private key")
    else:
        db.delete(public_api_key)
        db.commit()


async def validate_project_public_api_key(db: Session, public_api_key: str) -> Project:
    public_api_key: ProjectApiKey = (
        db.query(ProjectApiKey).filter(ProjectApiKey.key == public_api_key).first()
    )
    if public_api_key is None:
        raise ValueError('Invalid public key')
    return public_api_key.project


async def create_project_db(db: Session, name: str, user_id: int) -> Project:
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
    return project


async def get_user_project_role(db: Session, user_id: int, project_id: int) -> int | None:
    project: Project = db.query(Project).filter((Project.id == project_id)).first()
    for member in project.members:
        if member.user_id == user_id:
            return member.role
    return None


async def get_project_by_id_db(db: Session, project_id: int) -> Optional[Project]:
    return db.query(Project).filter(Project.id == project_id).first()


async def delete_project_by_id_db(db: Session, project_id: int) -> None:
    db.query(Project).filter(Project.id == project_id).delete()


async def get_projects_by_user_id_db(db: Session, user_id: int) -> List[Project]:
    return db.query(Project).filter(Project.owner_id == user_id).all()


async def update_project_by_id_db(db: Session, values: dict) -> Project:
    project: Project = await get_project_by_id_db(db, values['id'])
    if values.get('name') is not None:
        project.name = values['name']
    db.merge(project)
    db.commit()
    db.refresh(project)
    return project


async def create_project_goal_db(
    db: Session, project_id: int, name: str, target_action: str
) -> ProjectGoal:
    goal = ProjectGoal(project_id=project_id, name=name, target_action=target_action)
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


async def get_project_goal_by_id_db(db: Session, goal_id: int) -> Optional[ProjectGoal]:
    return db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).first()


async def get_project_goal_by_target_action_db(
    db: Session, project_id: int, target_action: str
) -> Optional[ProjectGoal]:
    return (
        db.query(ProjectGoal)
        .filter(ProjectGoal.project_id == project_id, ProjectGoal.target_action == target_action)
        .first()
    )


async def get_project_goals_db(db: Session, project_id: int) -> List[ProjectGoal]:
    return db.query(ProjectGoal).filter(ProjectGoal.project_id == project_id).all()


async def update_project_goal_db(
    db: Session, goal_id: int, name: Optional[str] = None, target_action: Optional[str] = None
) -> ProjectGoal:
    print(f"Updating goal {goal_id} with name {name} and target_action {target_action}")
    goal = await get_project_goal_by_id_db(db, goal_id)
    if name is not None:
        goal.name = name
    if target_action is not None:
        # Check if target_action already exists for another goal in this project
        existing_goal = await get_project_goal_by_target_action_db(
            db, goal.project_id, target_action
        )
        if existing_goal and existing_goal.id != goal.id:
            raise ValueError(f"Target action {target_action} already exists in project")
        goal.target_action = target_action
    db.merge(goal)
    db.commit()
    db.refresh(goal)
    return goal


async def delete_project_goal_db(db: Session, goal_id: int) -> None:
    db.query(ProjectGoal).filter(ProjectGoal.id == goal_id).delete()
    db.commit()
