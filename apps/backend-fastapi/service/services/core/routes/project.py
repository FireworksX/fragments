from typing import List
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, Project, ProjectIn
from .middleware import Context
from .media import asset


async def projects(info: strawberry.Info[Context]) -> List[Project]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("projects").select("*").eq("owner", user.user.id).execute()

    projects: List[Project] = []
    for pr in result.data:
        project: Project = Project(id=pr['id'], user=user.user, name=pr["name"],
                                   logo=asset(info, pr['logo']))
        projects.append(project)
    return projects


async def project_by_id(info: strawberry.Info[Context], id_: str) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("projects").select("*").eq("id", id_).execute().data[0]
    project: Project = Project(id=result['id'], user=user.user, name=result["name"],
                               logo=asset(info, result['logo']))
    return project


async def create_project(info: strawberry.Info[Context], pr: ProjectIn) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    project = supabase.postgrest.table("projects").insert({'owner': user.user.id, 'name': pr.name,
                                                             'logo': pr.logo}).execute().data[0]

    supabase.postgrest.table('pivot_project_member').insert({'member': user.user.id, 'project': project['id']})

    return Project(id=project['id'], user=user.user, name=project["name"],
                               logo=asset(info, project['logo']))


async def update_project(info: strawberry.Info[Context], pr: ProjectIn) -> Project:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    update = {'owner': user.user.id, 'id': pr.id}
    if pr.name is not None:
        update['name'] = pr.name
    if pr.logo is not None:
        update['logo'] = pr.logo
    project = supabase.postgrest.table("projects").update(update).eq("id", pr.id).execute().data[0]

    return Project(id=project['id'], user=user.user, name=project["name"],
                   logo=asset(info, project['logo']))
