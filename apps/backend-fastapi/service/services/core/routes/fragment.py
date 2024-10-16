from typing import List
import strawberry
from fastapi import HTTPException
from starlette import status

from crud.project import get_project_by_id_db
from .schemas import FragmentGet, AuthPayload, FragmentPost, ProjectGet, RoleGet
from .middleware import Context
from crud.fragment import create_fragment_db, Fragment, get_fragments_by_project_id_db, get_fragment_by_id_db, \
    update_fragment_by_id_db
from database import Session, Project
from .project import project_by_id
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.ADMIN


async def create_fragment(info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, fg.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fg.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add fragments')

    fragment: Fragment = await create_fragment_db(db, fg.name, user.user.id, fg.project_id, fg.document, fg.props)
    return FragmentGet(id=fragment.id, name=fragment.name, author=fragment.author, document=fragment.document,
                       props=fragment.props, project=project_by_id(info, fg.project_id))


async def fragments_in_project(info: strawberry.Info[Context], project_id: int) -> List[FragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')

    fragments: List[Fragment] = await get_fragments_by_project_id_db(db, project_id)
    out: List[FragmentGet] = []
    for fg in fragments:
        out.append(FragmentGet(id=fg.id, name=fg.name, author=fg.author, document=fg.document, props=fg.props,
                               project=project))
    return out


async def fragment_by_id(info: strawberry.Info[Context], fragment_id: int) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fragment_id} does not exist')

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await read_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view fragments')

    return FragmentGet(id=fragment.id, name=fragment.name, author=fragment.author, document=fragment.document,
                       props=fragment.props, project=project)


async def update_fragment(info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()
    fragment: Fragment = await get_fragment_by_id_db(db, fg.id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Fragment with id {fg.id} does not exist')
    project: ProjectGet = await project_by_id(info, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Project with id {fragment.project_id} does not exist or you do not have permission to view it')
    permission: bool = await write_permission(db, user.user.id, fg.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update fragments')

    fragment: Fragment = await update_fragment_by_id_db(db, values=fg.__dict__)

    return FragmentGet(id=fragment.id, name=fragment.name, author=fragment.author, document=fragment.document,
                       props=fragment.props, project=project)
