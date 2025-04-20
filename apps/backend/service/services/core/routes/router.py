from starlette import status

from .campaign import campaign_by_id, create_campaign_route, update_campaign_route, campaigns_in_project, \
    add_campaign_logo_route, campaign_by_name, delete_campaign_logo_route, delete_campaign_route
from .filesystem import create_directory_route, get_directory, \
    delete_directory_route, update_directory_route
from .filter import get_all_filters
from .schemas import AllFiltersGet
from .schemas.feedback import FeedbackPost, FeedbackGet
from .schemas.filesystem import ProjectDirectory, ProjectDirectoryGet, ProjectDirectoryPatch
from .schemas.media import MediaPost, MediaType, MediaDelete, MediaGet
from .schemas.stream import StreamGet, StreamPost, StreamPatch
from .schemas.landing import LandingGet, LandingPost, LandingPatch, ClientLanding
from .schemas.campaign import CampaignGet, CampaignPost, CampaignPatch
from .schemas.fragment import FragmentPost, FragmentPatch, FragmentGet
from .schemas.project import ProjectGet, ProjectPost, ProjectPatch

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, refresh, profile, signup, add_avatar_route, delete_avatar_route
from .fragment import create_fragment_route, fragments_in_project, fragments_by_ids, update_fragment_route, \
    add_fragment_asset_route, delete_fragment_asset_route, delete_fragment_route, get_client_fragment
from .stream import create_stream_route, stream_by_id, streams_in_campaign, update_stream_route, delete_stream_route
from .feedback import create_feedback
from .project import create_project_route, project_by_id, projects, update_project_route, \
    add_user_to_project as add_user_to_project_route, change_user_role as change_user_role_route, \
    add_project_logo_route, add_project_public_key_route, delete_project_public_key_route, \
    change_project_private_key_route, delete_project_logo_route, delete_project_route
from .schemas.user import RoleGet, UserGet, AuthPayload
from fastapi import UploadFile
from .landing import landing_by_id, landings_in_stream, update_landing_route, create_landing_route, get_client_landing, \
    delete_landing_route


@strawberry.type
class Query:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)

    @strawberry.field
    async def fragment(self, info: strawberry.Info[Context], fragment_ids: Optional[List[int]] = None,
                       project_id: Optional[int] = None) -> List[FragmentGet]:
        return await fragments_by_ids(info, fragment_ids, project_id)

    @strawberry.field
    async def campaign(self, info: strawberry.Info[Context], campgain_id: Optional[int] = None,
                       project_id: Optional[int] = None, active: Optional[bool] = None,
                       deleted: Optional[bool] = None) -> List[CampaignGet]:
        if campgain_id is not None:
            return [await campaign_by_id(info, campgain_id)]
        if project_id is not None:
            return await campaigns_in_project(info, project_id, active, deleted)

    @strawberry.field
    async def campaign_by_name(self, info: strawberry.Info[Context], project_id: int, name: str,
                               limit: Optional[int] = 5, active: Optional[bool] = None,
                               deleted: Optional[bool] = None) -> List[CampaignGet]:
        return await campaign_by_name(info, project_id, name, limit, active, deleted)

    @strawberry.field
    async def stream(self, info: strawberry.Info[Context], stream_id: Optional[int] = None,
                     campaign_id: Optional[int] = None, active: Optional[bool] = None,
                     deleted: Optional[bool] = None) -> List[StreamGet]:
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
    async def landing(self, info: strawberry.Info[Context], stream_id: Optional[int] = None,
                      landing_id: Optional[int] = None) -> List[LandingGet]:
        if landing_id is not None:
            return [await landing_by_id(info, landing_id)]
        else:
            return await landings_in_stream(info, stream_id)

    @strawberry.field
    async def filter(self, info: strawberry.Info[Context], countries: Optional[List[str]] = None,
                     regions: Optional[List[str]]= None) -> AllFiltersGet:
        return await get_all_filters(info, countries, regions)

    @strawberry.field
    async def directory(self, info: strawberry.Info[Context], directory_id: int) -> list[ProjectDirectoryGet]:
        return await get_directory(info, directory_id)

    @strawberry.field
    async def client_landing(self, info: strawberry.Info[Context]) -> Optional[LandingGet]:
        return await get_client_landing(info)

    @strawberry.field
    async def client_fragment(self, info: strawberry.Info[Context], fragment_id: int) -> Optional[FragmentGet]:
        return await get_client_fragment(info, fragment_id)


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
    async def feedback(self, info: strawberry.Info[Context], fd: FeedbackPost) -> FeedbackGet:
        return await create_feedback(info, fd)

    #### fragments ####
    @strawberry.mutation
    async def create_fragment(self, info: strawberry.Info[Context], fg: FragmentPost) -> FragmentGet:
        return await create_fragment_route(info, fg)

    @strawberry.mutation
    async def update_fragment(self, info: strawberry.Info[Context], fg: FragmentPatch) -> FragmentGet:
        return await update_fragment_route(info, fg)

    @strawberry.mutation
    async def delete_fragment(self, info: strawberry.Info[Context], fragment_id: int) -> None:
        await delete_fragment_route(info, fragment_id)

    #### fragments ####

    #### campaign ####

    @strawberry.mutation
    async def create_campaign(self, info: strawberry.Info[Context], cmp: CampaignPost) -> CampaignGet:
        return await create_campaign_route(info, cmp)

    @strawberry.mutation
    async def update_campaign(self, info: strawberry.Info[Context], cmp: CampaignPatch) -> CampaignGet:
        return await update_campaign_route(info, cmp)

    @strawberry.mutation
    async def delete_campaign(self, info: strawberry.Info[Context], campaign_id: int) -> None:
        return await delete_campaign_route(info, campaign_id)

    #### campaign ####

    #### project ####
    @strawberry.mutation
    async def create_project(self, info: strawberry.Info[Context], pr: ProjectPost) -> ProjectGet:
        return await create_project_route(info, pr)

    @strawberry.mutation
    async def update_project(self, info: strawberry.Info[Context], pr: ProjectPatch) -> ProjectGet:
        return await update_project_route(info, pr)

    @strawberry.mutation
    async def delete_project(self, info: strawberry.Info[Context], project_id: int) -> None:
        return await delete_project_route(info, project_id)

    @strawberry.mutation
    async def add_user_to_project(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                                  role: int) -> None:
        await add_user_to_project_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_user_role(self, info: strawberry.Info[Context], user_id: int, project_id: int,
                               role: RoleGet) -> None:
        await change_user_role_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_project_private_key(self, info: strawberry.Info[Context], project_id: int) -> ProjectGet:
        return await change_project_private_key_route(info, project_id)

    @strawberry.mutation
    async def add_project_public_key(self, info: strawberry.Info[Context], project_id: int, public_key_name: Optional[str] = None) -> ProjectGet:
        return await add_project_public_key_route(info, project_id, public_key_name)

    @strawberry.mutation
    async def delete_project_public_key(self, info: strawberry.Info[Context], project_id: int, public_key_id: int) -> None:
        await delete_project_public_key_route(info, project_id, public_key_id)

    #### project ####

    #### stream ###
    @strawberry.mutation
    async def create_stream(self, info: strawberry.Info[Context], stream: StreamPost) -> StreamGet:
        return await create_stream_route(info, stream)

    @strawberry.mutation
    async def update_stream(self, info: strawberry.Info[Context], stream: StreamPatch) -> StreamGet:
        return await update_stream_route(info, stream)

    @strawberry.mutation
    async def delete_stream(self, info: strawberry.Info[Context], stream_id: int) -> None:
        await delete_stream_route(info, stream_id)

    #### stream ###

    #### landing ####
    @strawberry.mutation
    async def create_landing(self, info: strawberry.Info[Context], landings: LandingPost) -> LandingGet:
        return await create_landing_route(info, landings)

    @strawberry.mutation
    async def update_landing(self, info: strawberry.Info[Context], landing: LandingPatch) -> LandingGet:
        return await update_landing_route(info, landing)

    @strawberry.mutation
    async def delete_landing(self, info: strawberry.Info[Context], landing_id: int) -> None:
        return await delete_landing_route(info, landing_id)

    #### landing ####

    #### directory ####

    @strawberry.mutation
    async def create_directory(self, info: strawberry.Info[Context], directory: ProjectDirectory) -> list[
        ProjectDirectoryGet]:
        return await create_directory_route(info, directory)

    @strawberry.mutation
    async def delete_directory(self, info: strawberry.Info[Context], directory_id: int) -> None:
        await delete_directory_route(info, directory_id)

    @strawberry.mutation
    async def update_directory(self, info: strawberry.Info[Context], directory: ProjectDirectoryPatch) -> list[
        ProjectDirectoryGet]:
        return await update_directory_route(info, directory)

    #### directory ####

    #### logos ####

    @strawberry.mutation
    async def upload_asset(self, info: strawberry.Info[Context], media: MediaPost, file: UploadFile) -> MediaGet:
        if media.media_type == MediaType.PROJECT_LOGO:
            return await add_project_logo_route(info, file, media.target_id)
        elif media.media_type == MediaType.FRAGMENT_ASSET:
            return await add_fragment_asset_route(info, file, media.target_id, media.directory_id)
        elif media.media_type == MediaType.CAMPAIGN_LOGO:
            return await add_campaign_logo_route(info, file, media.target_id)
        elif media.media_type == MediaType.USER_LOGO:
            return await add_avatar_route(info, file)

    @strawberry.mutation
    async def delete_asset(self, info: strawberry.Info[Context], media: MediaDelete) -> None:
        if media.media_type == MediaType.PROJECT_LOGO:
            await delete_project_logo_route(info, media.target_id)
        elif media.media_type == MediaType.FRAGMENT_ASSET:
            await delete_fragment_asset_route(info, media.target_id, media.media_id)
        elif media.media_type == MediaType.CAMPAIGN_LOGO:
            await delete_campaign_logo_route(info, media.target_id)
        elif media.media_type == MediaType.USER_LOGO:
            await delete_avatar_route(info)
