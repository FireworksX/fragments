from .campaign import campaign_by_id, create_campaign, update_campaign, campaigns_in_project
from .schemas import AuthPayload, UserGet, FragmentGet, MediaGet, FragmentPost, CampaignGet, CampaignPost, FeedbackPost, \
    FeedbackGet, \
    GeoLocationGet, StreamGet, StreamPost, ProjectPost, ProjectGet, SubcampaignFragmentGet, \
    SubcampaignFragmentPost

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, refresh, profile, signup
from .fragment import create_fragment, fragments_in_project, fragment_by_id, update_fragment
# from .campaign import campaigns, campaign_by_id, create_campaign, update_campaign, delete_campaign_from_db, campaigns_in_project
# from .media import upload_asset
from .stream import create_stream, stream_by_id, streams_in_campaign, update_stream
from .feedback import create_feedback
# from .subcampaign import create_subcampaign, update_subcampaign, subcampaign_by_id, subcampaigns_in_campaign, \
#   delete_subcampaign_from_db
from .project import create_project, project_by_id, projects, update_project, \
    add_user_to_project as add_user_to_project_route, RoleGet, change_user_role as change_user_role_route
# from .subcampaign_fragment import create_subcampaign_fragment, update_subcampaign_fragment, subcampaign_fragments_in_subcampaign, subcampaign_fragment_by_id
from fastapi import UploadFile
from crud.ipgetter import get_location_by_ip

from fastapi import Depends
from database import Session
from services.dependencies import get_db


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
    #
    # @strawberry.field
    # async def subcampaign_fragment(self, info: strawberry.Info[Context], subcampaign_id: Optional[int] = None, subcampaign_fragment_id: Optional[int] = None) -> List[SubcampaignFragmentGet]:
    #     if subcampaign_id is not None:
    #         return [await subcampaign_fragment_by_id(info, subcampaign_id)]
    #     else:
    #         return await subcampaign_fragments_in_subcampaign(subcampaign_fragment_id)


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
    async def fragment(self, info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
        if fg.id is not None:
            return await update_fragment(info, fg)
        else:
            return await create_fragment(info, fg)

    @strawberry.mutation
    async def campaign(self, info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
        if cmp.id is not None:
            return await update_campaign(info, cmp)
        else:
            return await create_campaign(info, cmp)

    #
    # @strawberry.mutation
    # async def asset(self, info: strawberry.Info[Context], file: UploadFile) -> MediaGet:
    #     return await upload_asset(info, file)

    @strawberry.mutation
    async def feedback(self, info: strawberry.Info[Context], fd: FeedbackPost) -> FeedbackGet:
        return await create_feedback(info, fd)

    @strawberry.mutation
    async def stream(self, info: strawberry.Info[Context], strm: StreamPost) -> StreamGet:
       if strm.id is not None:
           return await update_stream(info, strm)
       else:
            return await create_stream(info, strm)

    @strawberry.mutation
    async def project(self, info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
        if pr.id is not None:
            return await update_project(info, pr)
        else:
            return await create_project(info, pr)

    @strawberry.mutation
    async def add_user_to_project(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                                  role: int) -> None:
        await add_user_to_project_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_user_role(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                               role: RoleGet) -> None:
        await change_user_role_route(info, user_id, project_id, role)
    #
    # @strawberry.mutation
    # async def subcampaign_fragment(self, info: strawberry.Info[Context], subcampaign_fragment: SubcampaignFragmentPost) -> SubcampaignFragmentGet:
    #     if subcampaign_fragment.id is not None:
    #         return await update_subcampaign_fragment(info, subcampaign_fragment)
    #     else:
    #         return await create_subcampaign_fragment(info, subcampaign_fragment)
