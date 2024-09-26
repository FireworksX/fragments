from typing import List, Dict, Any
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, Project, ProjectPost
from .middleware import Context
from .media import asset


def project_from_db(project: Dict[str, Any], info: strawberry.Info[Context], user: AuthPayload) -> Project:
    return Project(id=project['id'], user=user.user, name=project["name"],
                   logo=asset(info, project['logo_id']))


async def projects(info: strawberry.Info[Context]) -> List[Project]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("projects").select("*").eq("owner", user.user.id).execute()

    projects: List[Project] = []
    for pr in result.data:
        projects.append(project_from_db(pr, info, user))
    return projects


async def project_by_id(info: strawberry.Info[Context], id_: int) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    project = supabase.postgrest.from_table("projects").select("*").eq("id", id_).execute().data[0]
    return project_from_db(project, info, user)


async def create_project(info: strawberry.Info[Context], pr: ProjectPost) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    project = supabase.postgrest.table("projects").insert({'owner': user.user.id, 'name': pr.name,
                                                           'logo_id': pr.logo_id}).execute().data[0]

    supabase.postgrest.table('pivot_project_member').insert({'member': user.user.id, 'project': project['id']})

    return project_from_db(project, info, user)


async def update_project(info: strawberry.Info[Context], pr: ProjectPost) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    update = {'owner': user.user.id, 'id': pr.id}
    if pr.name is not None:
        update['name'] = pr.name
    if pr.logo_id is not None:
        update['logo_id'] = pr.logo_id
    project = supabase.postgrest.table("projects").update(update).eq("id", pr.id).execute().data[0]

    return project_from_db(project, info, user)
