from datetime import datetime
from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile, status

from .analytic import get_campaign_stats_route, get_goal_stats_route, get_variant_stats_route
from .area import (
    add_area_logo_route,
    create_area_route,
    delete_area_logo_route,
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
    campaigns_in_area_without_default,
    create_campaign_route,
    delete_campaign_logo_route,
    delete_campaign_route,
    update_campaign_route,
)
from .client import (
    client_area_route,
    contribute_to_project_goal_route,
    get_client_history_route,
    get_client_route,
    get_clients_by_project_id_route,
    get_contributions_to_project_goal_route,
    init_client_session_route,
    release_client_session_route,
)
from .feature_flag import (
    FeatureFlagGet,
    FeatureFlagPatch,
    FeatureFlagPost,
    create_feature_flag_route,
    delete_feature_flag_route,
    feature_flag_by_id,
    update_feature_flag_route,
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
    get_client_fragment,
    update_fragment_route,
)
from .middleware import Context
from .project import (
    add_project_allowed_origin_route,
    add_project_logo_route,
    add_project_public_key_route,
)
from .project import add_user_to_project as add_user_to_project_route
from .project import change_project_private_key_route
from .project import change_user_role as change_user_role_route
from .project import (
    create_project_goal_route,
    create_project_route,
    delete_project_allowed_origin_route,
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
from .release_condition import (
    create_condition_route,
    create_condition_set_route,
    create_release_condition_route,
    delete_condition_route,
    delete_condition_set_route,
    delete_release_condition_route,
    get_condition_route,
    get_condition_set_route,
    release_condition_by_id,
    update_condition_route,
    update_condition_set_route,
    update_release_condition_route,
)
from .schemas.analytic import CampaignStatsGet, GoalStatsGet, VariantStatsGet
from .schemas.area import AreaGet, AreaPatch, AreaPost
from .schemas.campaign import CampaignGet, CampaignPatch, CampaignPost, CampaignStatus
from .schemas.client import ClientAreaGet, ClientGet, ClientHistoryGet
from .schemas.feature_flag import VariantGet
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
from .schemas.release_condition import (
    AllFiltersGet,
    ConditionGet,
    ConditionPatch,
    ConditionPost,
    ConditionSetGet,
    ConditionSetPatch,
    ConditionSetPost,
    ReleaseConditionGet,
    ReleaseConditionPatch,
    ReleaseConditionPost,
)
from .schemas.user import AuthPayload, RoleGet
from .user import add_avatar_route, delete_avatar_route, login, profile, refresh, signup
from .variant import (
    VariantPatch,
    VariantPost,
    create_variant_route,
    delete_variant_route,
    normalize_variants_rollout_percentage_route,
    update_variant_route,
    variant_by_id,
    variants_by_feature_flag_id,
)


@strawberry.type
class AuthQuery:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)


@strawberry.type
class AuthMutation:
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


@strawberry.type
class FragmentQuery:
    @strawberry.field
    async def fragment(
        self,
        info: strawberry.Info[Context],
        fragment_ids: Optional[List[int]] = None,
        project_id: Optional[int] = None,
    ) -> List[FragmentGet]:
        return await fragments_by_ids(info, fragment_ids, project_id)


@strawberry.type
class FragmentMutation:
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


@strawberry.type
class CampaignQuery:
    @strawberry.field
    async def campaign(
        self,
        info: strawberry.Info[Context],
        campaign_id: Optional[int] = None,
        area_id: Optional[int] = None,
        name: Optional[str] = None,
        without_default: Optional[bool] = True,
        limit: Optional[int] = 5,
        campaign_status: Optional[CampaignStatus] = None,
    ) -> List[CampaignGet]:
        if campaign_id is not None:
            return [await campaign_by_id(info, campaign_id)]
        if area_id is not None:
            if name is not None:
                return await campaign_by_name(info, area_id, name, limit, campaign_status)
            if without_default:
                return await campaigns_in_area_without_default(info, area_id, campaign_status)
            return await campaigns_in_area(info, area_id, campaign_status)
        return []


@strawberry.type
class CampaignMutation:
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


@strawberry.type
class ProjectQuery:
    @strawberry.field
    async def project(
        self, info: strawberry.Info[Context], project_id: Optional[int] = None
    ) -> List[ProjectGet]:
        if project_id is not None:
            return [await project_by_id(info, project_id)]
        return await projects(info)

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


@strawberry.type
class ProjectMutation:
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

    @strawberry.mutation
    async def add_project_allowed_origin(
        self, info: strawberry.Info[Context], project_id: int, origin: str, name: str
    ) -> ProjectGet:
        return await add_project_allowed_origin_route(info, project_id, origin, name)

    @strawberry.mutation
    async def delete_project_allowed_origin(
        self, info: strawberry.Info[Context], project_id: int, allowed_origin_id: int
    ) -> None:
        await delete_project_allowed_origin_route(info, project_id, allowed_origin_id)


@strawberry.type
class FilesystemQuery:
    @strawberry.field
    async def directory(
        self, info: strawberry.Info[Context], directory_id: int
    ) -> list[ProjectDirectoryGet]:
        return await get_directory(info, directory_id)


@strawberry.type
class FilesystemMutation:
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


@strawberry.type
class AreaQuery:
    @strawberry.field
    async def area(
        self,
        info: strawberry.Info[Context],
        area_id: Optional[int] = None,
        project_id: Optional[int] = None,
    ) -> List[AreaGet]:
        if area_id is not None:
            return [await get_area_by_id_route(info, area_id)]
        if project_id is not None:
            return await get_areas_route(info, project_id)
        return []


@strawberry.type
class AreaMutation:
    @strawberry.mutation
    async def create_area(self, info: strawberry.Info[Context], area: AreaPost) -> AreaGet:
        return await create_area_route(info, area)

    @strawberry.mutation
    async def update_area(self, info: strawberry.Info[Context], area: AreaPatch) -> AreaGet:
        return await update_area_route(info, area)

    @strawberry.mutation
    async def delete_area(self, info: strawberry.Info[Context], area_id: int) -> None:
        await delete_area_route(info, area_id)


@strawberry.type
class ReleaseConditionQuery:
    @strawberry.field
    async def release_condition(
        self, info: strawberry.Info[Context], release_condition_id: int
    ) -> ReleaseConditionGet:
        return await release_condition_by_id(info, release_condition_id)

    @strawberry.field
    async def condition_set(
        self, info: strawberry.Info[Context], condition_set_id: int
    ) -> ConditionSetGet:
        return await get_condition_set_route(info, condition_set_id)

    @strawberry.field
    async def condition(self, info: strawberry.Info[Context], condition_id: int) -> ConditionGet:
        return await get_condition_route(info, condition_id)

    @strawberry.field
    async def filter(
        self,
        info: strawberry.Info[Context],
        countries: Optional[List[str]] = None,
        regions: Optional[List[str]] = None,
    ) -> AllFiltersGet:
        return await get_all_filters(info, countries, regions)


@strawberry.type
class ReleaseConditionMutation:
    @strawberry.mutation
    async def create_condition(
        self, info: strawberry.Info[Context], condition_set_id: int, condition: ConditionPost
    ) -> ConditionGet:
        return await create_condition_route(info, condition_set_id, condition)

    @strawberry.mutation
    async def update_condition(
        self, info: strawberry.Info[Context], condition: ConditionPatch
    ) -> ConditionGet:
        return await update_condition_route(info, condition)

    @strawberry.mutation
    async def delete_condition(self, info: strawberry.Info[Context], condition_id: int) -> None:
        await delete_condition_route(info, condition_id)

    @strawberry.mutation
    async def create_release_condition(
        self, info: strawberry.Info[Context], release_condition: ReleaseConditionPost
    ) -> ReleaseConditionGet:
        return await create_release_condition_route(info, release_condition)

    @strawberry.mutation
    async def update_release_condition(
        self, info: strawberry.Info[Context], release_condition: ReleaseConditionPatch
    ) -> ReleaseConditionGet:
        return await update_release_condition_route(info, release_condition)

    @strawberry.mutation
    async def delete_release_condition(
        self, info: strawberry.Info[Context], release_condition_id: int
    ) -> None:
        await delete_release_condition_route(info, release_condition_id)

    @strawberry.mutation
    async def create_condition_set(
        self,
        info: strawberry.Info[Context],
        release_condition_id: int,
        condition_set: ConditionSetPost,
    ) -> ConditionSetGet:
        return await create_condition_set_route(info, release_condition_id, condition_set)

    @strawberry.mutation
    async def update_condition_set(
        self, info: strawberry.Info[Context], condition_set: ConditionSetPatch
    ) -> ConditionSetGet:
        return await update_condition_set_route(info, condition_set)

    @strawberry.mutation
    async def delete_condition_set(
        self, info: strawberry.Info[Context], condition_set_id: int
    ) -> None:
        await delete_condition_set_route(info, condition_set_id)


@strawberry.type
class FeatureFlagQuery:
    @strawberry.field
    async def feature_flag(
        self, info: strawberry.Info[Context], feature_flag_id: int
    ) -> FeatureFlagGet:
        return await feature_flag_by_id(info, feature_flag_id)

    @strawberry.field
    async def variant(
        self,
        info: strawberry.Info[Context],
        feature_flag_id: Optional[int] = None,
        variant_id: Optional[int] = None,
    ) -> List[VariantGet]:
        if variant_id is not None:
            return [await variant_by_id(info, variant_id)]
        if feature_flag_id is not None:
            return await variants_by_feature_flag_id(info, feature_flag_id)
        return []


@strawberry.type
class FeatureFlagMutation:
    @strawberry.mutation
    async def create_feature_flag(
        self, info: strawberry.Info[Context], project_id: int, feature_flag: FeatureFlagPost
    ) -> FeatureFlagGet:
        return await create_feature_flag_route(info, project_id, feature_flag)

    @strawberry.mutation
    async def update_feature_flag(
        self, info: strawberry.Info[Context], feature_flag: FeatureFlagPatch
    ) -> FeatureFlagGet:
        return await update_feature_flag_route(info, feature_flag)

    @strawberry.mutation
    async def delete_feature_flag(
        self, info: strawberry.Info[Context], feature_flag_id: int
    ) -> None:
        await delete_feature_flag_route(info, feature_flag_id)

    @strawberry.mutation
    async def create_variant(
        self, info: strawberry.Info[Context], variant: VariantPost
    ) -> VariantGet:
        return await create_variant_route(info, variant)

    @strawberry.mutation
    async def update_variant(
        self, info: strawberry.Info[Context], variant: VariantPatch
    ) -> VariantGet:
        return await update_variant_route(info, variant)

    @strawberry.mutation
    async def delete_variant(self, info: strawberry.Info[Context], variant_id: int) -> None:
        await delete_variant_route(info, variant_id)

    @strawberry.mutation
    async def normalize_variants_rollout_percentage(
        self, info: strawberry.Info[Context], feature_flag_id: int
    ) -> None:
        await normalize_variants_rollout_percentage_route(info, feature_flag_id)


@strawberry.type
class AssetMutation:
    @strawberry.mutation
    async def upload_asset(
        self, info: strawberry.Info[Context], media: MediaPost, file: UploadFile
    ) -> MediaGet:
        if media.media_type == MediaType.PROJECT_LOGO:
            return await add_project_logo_route(info, file, media.target_id)
        if media.media_type == MediaType.FRAGMENT_ASSET:
            return await add_fragment_asset_route(info, file, media.target_id, media.directory_id)
        if media.media_type == MediaType.CAMPAIGN_LOGO:
            return await add_campaign_logo_route(info, file, media.target_id)
        if media.media_type == MediaType.USER_LOGO:
            return await add_avatar_route(info, file)
        if media.media_type == MediaType.AREA_LOGO:
            return await add_area_logo_route(info, file, media.target_id)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid media type')

    @strawberry.mutation
    async def delete_asset(self, info: strawberry.Info[Context], media: MediaDelete) -> None:
        if media.media_type == MediaType.PROJECT_LOGO:
            await delete_project_logo_route(info, media.target_id)
        if media.media_type == MediaType.FRAGMENT_ASSET:
            await delete_fragment_asset_route(info, media.target_id, media.media_id)
        if media.media_type == MediaType.CAMPAIGN_LOGO:
            await delete_campaign_logo_route(info, media.target_id)
        if media.media_type == MediaType.USER_LOGO:
            await delete_avatar_route(info)
        if media.media_type == MediaType.AREA_LOGO:
            await delete_area_logo_route(info, media.target_id)


@strawberry.type
class ClientQuery:
    @strawberry.field
    async def client_fragment(
        self, info: strawberry.Info[Context], fragment_id: int
    ) -> Optional[FragmentGet]:
        return await get_client_fragment(info, fragment_id)

    @strawberry.field
    async def client(
        self,
        info: strawberry.Info[Context],
        client_id: Optional[int] = None,
        project_id: Optional[int] = None,
    ) -> List[ClientGet]:
        if client_id is not None:
            return [await get_client_route(info, client_id)]
        if project_id is not None:
            return await get_clients_by_project_id_route(info, project_id)
        return []

    @strawberry.field
    async def client_history(
        self, info: strawberry.Info[Context], client_id: int
    ) -> List[ClientHistoryGet]:
        return await get_client_history_route(info, client_id)

    @strawberry.field
    async def client_area(
        self, info: strawberry.Info[Context], area_code: str
    ) -> Optional[ClientAreaGet]:
        return await client_area_route(info, area_code)


@strawberry.type
class ClientMutation:
    @strawberry.mutation
    async def feedback(self, info: strawberry.Info[Context], fd: FeedbackPost) -> FeedbackGet:
        return await create_feedback(info, fd)

    @strawberry.mutation
    async def add_client_metric(
        self, info: strawberry.Info[Context], metric: ClientMetricPost
    ) -> None:
        if metric.metric_type == ClientMetricType.INIT_SESSION:
            return await init_client_session_route(info)
        if metric.metric_type == ClientMetricType.RELEASE_SESSION:
            return await release_client_session_route(info)
        if metric.metric_type == ClientMetricType.REACH_PROJECT_GOAL:
            return await contribute_to_project_goal_route(info, metric.metric_value)


@strawberry.type
class AnalyticQuery:
    @strawberry.field
    async def variant_stats(
        self,
        info: strawberry.Info[Context],
        feature_flag_id: int,
        variant_id: int,
        from_ts: Optional[datetime] = None,
        to_ts: Optional[datetime] = None,
    ) -> VariantStatsGet:
        return await get_variant_stats_route(info, feature_flag_id, variant_id, from_ts, to_ts)

    @strawberry.field
    async def campaign_stats(
        self,
        info: strawberry.Info[Context],
        area_id: int,
        campaign_id: int,
        from_ts: Optional[datetime] = None,
        to_ts: Optional[datetime] = None,
    ) -> CampaignStatsGet:
        return await get_campaign_stats_route(info, area_id, campaign_id, from_ts, to_ts)

    @strawberry.field
    async def goal_stats(
        self,
        info: strawberry.Info[Context],
        goal_id: int,
        from_ts: Optional[datetime] = None,
        to_ts: Optional[datetime] = None,
    ) -> GoalStatsGet:
        return await get_goal_stats_route(info, goal_id, from_ts, to_ts)


@strawberry.type
class Query(
    AuthQuery,
    FragmentQuery,
    CampaignQuery,
    ProjectQuery,
    FilesystemQuery,
    AreaQuery,
    ReleaseConditionQuery,
    FeatureFlagQuery,
    ClientQuery,
    AnalyticQuery,
):
    pass


@strawberry.type
class Mutation(
    AuthMutation,
    FragmentMutation,
    CampaignMutation,
    ProjectMutation,
    FilesystemMutation,
    AreaMutation,
    ReleaseConditionMutation,
    FeatureFlagMutation,
    ClientMutation,
    AssetMutation,
):
    pass
