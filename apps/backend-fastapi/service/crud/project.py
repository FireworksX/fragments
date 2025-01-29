from crud.filesystem import create_directory_db
from database import FilesystemDirectory
from database.models import Project, User, ProjectMemberRole
from sqlalchemy.orm import Session
from typing import Optional, List


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


async def create_project_db(db: Session, name: str, user_id: int) -> Project:
    project: Project = Project(name=name, owner_id=user_id)
    db.add(project)
    db.commit()
    db.refresh(project)

    await add_user_to_project_db(db, user_id, project.id, 1)  # 1 = owner
    root_directory: FilesystemDirectory = await create_directory_db(db=db, parent_id=None, name=name, project_id=project.id)
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


async def get_project_by_id_db(db: Session, project_id: int) -> Project:
    return db.query(Project).filter(Project.id == project_id).first()


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
