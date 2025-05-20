from typing import List, Optional

import strawberry
from fastapi import UploadFile
from starlette import status

from .area import (
    create_area_route,
    delete_area_route,
    get_area_by_id_route,
    get_areas_route,
    update_area_route,
)
from .campaign import (
    add_campaign_logo_route,
    campaign_by_id,
    campaign_by_name,
    campaigns_in_area,
    create_campaign_route,
    delete_campaign_logo_route,
    delete_campaign_route,
    update_campaign_route,
)
from .client import (
    contribute_to_project_goal_route,
    get_client_history_route,
    get_client_route,
    get_clients_by_project_id_route,
    get_contributions_to_project_goal_route,
    init_client_session_route,
    release_client_session_route,
)
from .feedback import create_feedback
from .filesystem import (
    create_directory_route,
    delete_directory_route,
    get_directory,
    update_directory_route,
)
from .filter import get_all_filters
from .fragment import (
    add_fragment_asset_route,
    create_fragment_route,
    delete_fragment_asset_route,
    delete_fragment_route,
    fragments_by_ids,
    fragments_in_project,
    get_client_fragment,
    update_fragment_route,
)
from .middleware import Context
from .project import add_project_logo_route, add_project_public_key_route
from .project import add_user_to_project as add_user_to_project_route
from .project import change_project_private_key_route
from .project import change_user_role as change_user_role_route
from .project import (
    create_project_goal_route,
    create_project_route,
    delete_project_goal_route,
    delete_project_logo_route,
    delete_project_public_key_route,
    delete_project_route,
    get_project_goals_route,
    project_by_id,
    projects,
    update_project_goal_route,
    update_project_route,
)
from .schemas import AllFiltersGet
from .schemas.area import AreaGet, AreaPatch, AreaPost
from .schemas.campaign import CampaignGet, CampaignPatch, CampaignPost
from .schemas.client import ClientGet, ClientHistoryGet, ClientHistoryInput
from .schemas.feedback import FeedbackGet, FeedbackPost
from .schemas.filesystem import ProjectDirectory, ProjectDirectoryGet, ProjectDirectoryPatch
from .schemas.fragment import FragmentGet, FragmentPatch, FragmentPost
from .schemas.media import MediaDelete, MediaGet, MediaPost, MediaType
from .schemas.metric import ClientMetricPost, ClientMetricType
from .schemas.project import (
    ClientProjectGoalGet,
    ProjectGet,
    ProjectGoalGet,
    ProjectGoalPatch,
    ProjectGoalPost,
    ProjectPatch,
    ProjectPost,
)
from .schemas.user import AuthPayload, RoleGet, UserGet
from .user import add_avatar_route, delete_avatar_route, login, profile, refresh, signup


@strawberry.type
class Query:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)

    @strawberry.field
    async def fragment(
        self,
        info: strawberry.Info[Context],
        fragment_ids: Optional[List[int]] = None,
        project_id: Optional[int] = None,
    ) -> List[FragmentGet]:
        return await fragments_by_ids(info, fragment_ids, project_id)

    @strawberry.field
    async def campaign(
        self,
        info: strawberry.Info[Context],
        campgain_id: Optional[int] = None,
        area_id: Optional[int] = None,
        active: Optional[bool] = None,
        archived: Optional[bool] = None,
    ) -> List[CampaignGet]:
        if campgain_id is not None:
            return [await campaign_by_id(info, campgain_id)]
        if area_id is not None:
            return await campaigns_in_area(info, area_id, active, archived)

    @strawberry.field
    async def campaign_by_name(
        self,
        info: strawberry.Info[Context],
        area_id: int,
        name: str,
        limit: Optional[int] = 5,
        active: Optional[bool] = None,
        archived: Optional[bool] = None,
    ) -> List[CampaignGet]:
        return await campaign_by_name(info, area_id, name, limit, active, archived)

    @strawberry.field
    async def project(
        self, info: strawberry.Info[Context], project_id: Optional[int] = None
    ) -> List[ProjectGet]:
        if project_id is not None:
            return [await project_by_id(info, project_id)]
        else:
            return await projects(info)

    @strawberry.field
    async def filter(
        self,
        info: strawberry.Info[Context],
        countries: Optional[List[str]] = None,
        regions: Optional[List[str]] = None,
    ) -> AllFiltersGet:
        return await get_all_filters(info, countries, regions)

    @strawberry.field
    async def directory(
        self, info: strawberry.Info[Context], directory_id: int
    ) -> list[ProjectDirectoryGet]:
        return await get_directory(info, directory_id)

    @strawberry.field
    async def client_fragment(
        self, info: strawberry.Info[Context], fragment_id: int
    ) -> Optional[FragmentGet]:
        return await get_client_fragment(info, fragment_id)

    @strawberry.field
    async def clients_by_project_id(
        self, info: strawberry.Info[Context], project_id: int
    ) -> List[ClientGet]:
        return await get_clients_by_project_id_route(info, project_id)

    @strawberry.field
    async def client_by_id(self, info: strawberry.Info[Context], client_id: int) -> ClientGet:
        return await get_client_route(info, client_id)

    @strawberry.field
    async def client_history(
        self, info: strawberry.Info[Context], client_id: int
    ) -> List[ClientHistoryGet]:
        return await get_client_history_route(info, client_id)

    @strawberry.field
    async def project_goals(
        self, info: strawberry.Info[Context], project_id: int
    ) -> List[ProjectGoalGet]:
        return await get_project_goals_route(info, project_id)

    @strawberry.field
    async def contributions_to_project_goal(
        self, info: strawberry.Info[Context], project_id: int, project_goal_id: int
    ) -> List[ClientProjectGoalGet]:
        return await get_contributions_to_project_goal_route(info, project_id, project_goal_id)

    @strawberry.field
    async def area(self, info: strawberry.Info[Context], area_id: int) -> AreaGet:
        return await get_area_by_id_route(info, area_id)

    @strawberry.field
    async def areas(self, info: strawberry.Info[Context], project_id: int) -> List[AreaGet]:
        return await get_areas_route(info, project_id)


@strawberry.type
class Mutation:

    @strawberry.mutation
    async def signup(
        self,
        info: strawberry.Info[Context],
        email: str,
        password: str,
        first_name: str,
        last_name: Optional[str] = None,
    ) -> AuthPayload:
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
    async def create_fragment(
        self, info: strawberry.Info[Context], fg: FragmentPost
    ) -> FragmentGet:
        return await create_fragment_route(info, fg)

    @strawberry.mutation
    async def update_fragment(
        self, info: strawberry.Info[Context], fg: FragmentPatch
    ) -> FragmentGet:
        return await update_fragment_route(info, fg)

    @strawberry.mutation
    async def delete_fragment(self, info: strawberry.Info[Context], fragment_id: int) -> None:
        await delete_fragment_route(info, fragment_id)

    #### fragments ####

    #### campaign ####

    @strawberry.mutation
    async def create_campaign(
        self, info: strawberry.Info[Context], cmp: CampaignPost
    ) -> CampaignGet:
        return await create_campaign_route(info, cmp)

    @strawberry.mutation
    async def update_campaign(
        self, info: strawberry.Info[Context], cmp: CampaignPatch
    ) -> CampaignGet:
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
    async def add_user_to_project(
        self, info: strawberry.Info[Context], user_id: int, project_id: int, role: int
    ) -> None:
        await add_user_to_project_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_user_role(
        self, info: strawberry.Info[Context], user_id: int, project_id: int, role: RoleGet
    ) -> None:
        await change_user_role_route(info, user_id, project_id, role)

    @strawberry.mutation
    async def change_project_private_key(
        self, info: strawberry.Info[Context], project_id: int
    ) -> ProjectGet:
        return await change_project_private_key_route(info, project_id)

    @strawberry.mutation
    async def add_project_public_key(
        self, info: strawberry.Info[Context], project_id: int, public_key_name: Optional[str] = None
    ) -> ProjectGet:
        return await add_project_public_key_route(info, project_id, public_key_name)

    @strawberry.mutation
    async def delete_project_public_key(
        self, info: strawberry.Info[Context], project_id: int, public_key_id: int
    ) -> None:
        await delete_project_public_key_route(info, project_id, public_key_id)

    @strawberry.mutation
    async def create_project_goal(
        self, info: strawberry.Info[Context], goal: ProjectGoalPost
    ) -> ProjectGoalGet:
        return await create_project_goal_route(info, goal)

    @strawberry.mutation
    async def update_project_goal(
        self, info: strawberry.Info[Context], goal: ProjectGoalPatch
    ) -> ProjectGoalGet:
        return await update_project_goal_route(info, goal)

    @strawberry.mutation
    async def delete_project_goal(self, info: strawberry.Info[Context], goal_id: int) -> None:
        await delete_project_goal_route(info, goal_id)

    #### project ####

    #### directory ####

    @strawberry.mutation
    async def create_directory(
        self, info: strawberry.Info[Context], directory: ProjectDirectory
    ) -> list[ProjectDirectoryGet]:
        return await create_directory_route(info, directory)

    @strawberry.mutation
    async def delete_directory(self, info: strawberry.Info[Context], directory_id: int) -> None:
        await delete_directory_route(info, directory_id)

    @strawberry.mutation
    async def update_directory(
        self, info: strawberry.Info[Context], directory: ProjectDirectoryPatch
    ) -> list[ProjectDirectoryGet]:
        return await update_directory_route(info, directory)

    #### directory ####

    #### logos ####

    @strawberry.mutation
    async def upload_asset(
        self, info: strawberry.Info[Context], media: MediaPost, file: UploadFile
    ) -> MediaGet:
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

    #### client ####

    @strawberry.field
    async def add_client_metric(
        self, info: strawberry.Info[Context], metric: ClientMetricPost
    ) -> None:
        if metric.metric_type == ClientMetricType.INIT_SESSION:
            return await init_client_session_route(info)
        elif metric.metric_type == ClientMetricType.RELEASE_SESSION:
            return await release_client_session_route(info)
        elif metric.metric_type == ClientMetricType.REACH_PROJECT_GOAL:
            return await contribute_to_project_goal_route(info, metric.metric_value)

    #### client ####

    #### area ####

    @strawberry.mutation
    async def create_area(self, info: strawberry.Info[Context], area: AreaPost) -> AreaGet:
        return await create_area_route(info, area)

    @strawberry.mutation
    async def update_area(self, info: strawberry.Info[Context], area: AreaPatch) -> AreaGet:
        return await update_area_route(info, area)

    @strawberry.mutation
    async def delete_area(self, info: strawberry.Info[Context], area_id: int) -> None:
        await delete_area_route(info, area_id)

    #### area ####
