from .campaign import campaign_by_id, create_campaign_route, update_campaign_route, campaigns_in_project, \
    add_campaign_logo_route
from .schemas import AuthPayload, UserGet, FragmentGet, FragmentPost, CampaignGet, CampaignPost, FeedbackPost, \
    FeedbackGet, \
    GeoLocationGet, StreamGet, StreamPost, ProjectPost, ProjectGet, LandingGet, \
    LandingPost, LandingPatch, ProjectPatch, StreamPatch, CampaignPatch, FragmentPatch

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, refresh, profile, signup, add_avatar_route
from .fragment import create_fragment_route, fragments_in_project, fragment_by_id, update_fragment_route, add_fragment_asset_route, remove_fragment_asset_route
from .stream import create_stream_route, stream_by_id, streams_in_campaign, update_stream_route
from .feedback import create_feedback
from .project import create_project_route, project_by_id, projects, update_project_route, \
    add_user_to_project as add_user_to_project_route, RoleGet, change_user_role as change_user_role_route, \
    add_project_logo_route
from fastapi import UploadFile
from crud.ipgetter import get_location_by_ip
from .landing import landing_by_id, landings_in_stream, update_landing_route, create_landing_route


@strawberry.type
class Query:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)

    @strawberry.field
    async def fragment(self, info: strawberry.Info[Context], fragment_id: Optional[int] = None,
                       project_id: Optional[int] = None) -> List[FragmentGet]:
        if fragment_id is not None:
            return [await fragment_by_id(info, fragment_id)]
        if project_id is not None:
            return await fragments_in_project(info, project_id)
        else:
            return []

    #
    @strawberry.field
    async def campaign(self, info: strawberry.Info[Context], campgain_id: Optional[int] = None,
                       project_id: Optional[int] = None, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[CampaignGet]:
        if campgain_id is not None:
            return [await campaign_by_id(info, campgain_id)]
        if project_id is not None:
            return await campaigns_in_project(info, project_id, active, deleted)

    @strawberry.field
    async def location(self, ip: str) -> GeoLocationGet:
        return get_location_by_ip(ip)

    @strawberry.field
    async def stream(self, info: strawberry.Info[Context], stream_id: Optional[int] = None,
                          campaign_id: Optional[int] = None, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[StreamGet]:
        if stream_id is not None:
            return [await stream_by_id(info, stream_id)]
        if campaign_id is not None:
            return await streams_in_campaign(info, campaign_id, active, deleted)

    @strawberry.field
    async def project(self, info: strawberry.Info[Context], project_id: Optional[int] = None) -> List[ProjectGet]:
        if project_id is not None:
            return [await project_by_id(info, project_id)]
        else:
            return await projects(info)

    @strawberry.field
    async def landing(self, info: strawberry.Info[Context], stream_id: Optional[int] = None, landing_id: Optional[int] = None) -> List[LandingGet]:
        if landing_id is not None:
            return [await landing_by_id(info, landing_id)]
        else:
            return await landings_in_stream(info, stream_id)


@strawberry.type
class Mutation:

    @strawberry.mutation
    async def signup(self, info: strawberry.Info[Context], email: str, password: str, first_name: str,
                     last_name: Optional[str] = None) -> AuthPayload:
        return await signup(info, email, first_name, last_name, password)

    @strawberry.mutation
    async def login(self, info: strawberry.Info[Context], email: str, password: str) -> AuthPayload:
        return await login(info, email, password)

    @strawberry.mutation
    async def refresh(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await refresh(info)

    @strawberry.mutation
    async def create_fragment(self, info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
        return await create_fragment_route(info, fg)

    @strawberry.mutation
    async def update_fragment(self, info: strawberry.Info[Context], fg: FragmentPatch) -> FragmentGet:
        return await update_fragment_route(info, fg)

    @strawberry.mutation
    async def create_campaign(self, info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
        return await create_campaign_route(info, cmp)

    @strawberry.mutation
    async def update_campaign(self, info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
        return await update_campaign_route(info, cmp)

    @strawberry.mutation
    async def add_campaign_logo(self, info: strawberry.Info[Context], file: UploadFile, campaign_id: int) -> CampaignGet:
        return await add_campaign_logo_route(info, file, campaign_id)

    @strawberry.mutation
    async def add_fragment_asset(self, info: strawberry.Info[Context], file: UploadFile, fragment_id: int) -> FragmentGet:
        return await add_fragment_asset_route(info, file, fragment_id)

    @strawberry.mutation
    async def add_avatar(self, info: strawberry.Info[Context], file: UploadFile) -> UserGet:
        return await add_avatar_route(info, file)

    @strawberry.mutation
    async def feedback(self, info: strawberry.Info[Context], fd: FeedbackPost) -> FeedbackGet:
        return await create_feedback(info, fd)

    @strawberry.mutation
    async def create_stream(self, info: strawberry.Info[Context], strm: StreamPost) -> StreamGet:
       return await create_stream_route(info, strm)

    @strawberry.mutation
    async def update_stream(self, info: strawberry.Info[Context], strm: StreamPatch) -> StreamGet:
       return await update_stream_route(info, strm)

    @strawberry.mutation
    async def create_project(self, info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
        return await create_project_route(info, pr)

    @strawberry.mutation
    async def update_project(self, info: strawberry.Info[Context], pr: ProjectPatch) -> ProjectGet:
        return await update_project_route(info, pr)

    @strawberry.mutation
    async def add_project_logo(self, info: strawberry.Info[Context], file: UploadFile, project_id: int) -> ProjectGet:
        return await add_project_logo_route(info, file, project_id)

    @strawberry.mutation
    async def add_fragment_asset(self, info: strawberry.Info[Context], file: UploadFile, fragment_id: int) -> FragmentGet:
        return await add_fragment_asset_route(info, file, fragment_id)

    @strawberry.mutation
    async def remove_fragment_asset(self, info: strawberry.Info[Context], fragment_id: int, public_path: str) -> FragmentGet:
        return await remove_fragment_asset_route(info, fragment_id, public_path)

    @strawberry.mutation
    async def add_user_to_project(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                                  role: int) -> None:
        await add_user_to_project_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_user_role(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                               role: RoleGet) -> None:
        await change_user_role_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def create_landing(self, info: strawberry.Info[Context], landings: LandingPost) -> LandingGet:
        return await create_landing_route(info, landings)

    @strawberry.mutation
    async def update_landing(self, info: strawberry.Info[Context], landing: LandingPatch) -> LandingGet:
        return await update_landing_route(info, landing)

