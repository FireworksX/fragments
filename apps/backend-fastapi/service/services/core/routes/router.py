from .schemas import AuthPayload, User, Fragment, Media, FragmentIn, Project, ProjectIn

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, logout, refresh, profile, signup
from .fragments import fragments, fragment_by_id, create_fragment, update_fragment
from .project import projects, project_by_id, create_project, update_project
from .media import upload_asset
from fastapi import FastAPI, File, UploadFile
@strawberry.type
class Query:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)

    @strawberry.field
    async def refresh(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await refresh(info)

    @strawberry.field
    async def fragment(self, info: strawberry.Info[Context], fragment_id: Optional[str] = None) -> List[Fragment]:
        if fragment_id is not None:
            return [await fragment_by_id(info, fragment_id)]
        else:
            return await fragments(info)

    @strawberry.field
    async def project(self, info: strawberry.Info[Context], project_id: Optional[str] = None) -> List[Project]:
        if project_id is not None:
            return [await project_by_id(info, project_id)]
        else:
            return await projects(info)

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def logout(self, info: strawberry.Info[Context]) -> None:
        await logout(info)
    @strawberry.mutation
    async def signup(self, email: str, password: str, first_name: str, last_name: Optional[str] = None) -> AuthPayload:
        return await signup(email, password, first_name, last_name)

    @strawberry.mutation
    async def login(self, email: str, password: str) -> AuthPayload:
        return await login(email, password)

    @strawberry.mutation
    async def fragment(self, info: strawberry.Info[Context], fg: FragmentIn) -> Fragment:
        if fg.id is not None:
            return await update_fragment(info, fg)
        else:
            return await create_fragment(info, fg)

    @strawberry.mutation
    async def project(self, info: strawberry.Info[Context], pr: ProjectIn) -> Project:
        if pr.id is not None:
            return await update_project(info, pr)
        else:
            return await create_project(info, pr)

    @strawberry.mutation
    async def asset(self, info: strawberry.Info[Context], file: UploadFile) -> Media:
        return await upload_asset(info, file)

