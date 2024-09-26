from .schemas import AuthPayload, User, Fragment, Media, FragmentPost, Campaign, CampaignPost, FeedbackIn, Feedback, \
    GeoLocation, SubCampaign, SubCampaignIn, ProjectPost, Project, SubcampaignFragment, SubcampaignFragmentPost

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, logout, refresh, profile, signup
from .fragments import fragments, fragment_by_id, create_fragment, update_fragment, fragments_in_project
from .campaign import campaigns, campaign_by_id, create_campaign, update_campaign, delete_campaign_from_db, campaigns_in_project
from .media import upload_asset
from .feedback import create_feedback
from .subcampaign import create_subcampaign, update_subcampaign, subcampaign_by_id, subcampaigns_in_campaign, \
    delete_subcampaign_from_db
from .project import update_project, create_project, projects, project_by_id
from .subcampaign_fragment import create_subcampaign_fragment, update_subcampaign_fragment, subcampaign_fragments_in_subcampaign, subcampaign_fragment_by_id
from fastapi import UploadFile
from crud.ipgetter import get_location_by_ip


@strawberry.type
class Query:
    @strawberry.field
    async def profile(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await profile(info)

    @strawberry.field
    async def refresh(self, info: strawberry.Info[Context]) -> AuthPayload:
        return await refresh(info)

    @strawberry.field
    async def fragment(self, info: strawberry.Info[Context], fragment_id: Optional[int] = None, project_id: Optional[int] = None) -> List[Fragment]:
        if fragment_id is not None:
            return [await fragment_by_id(info, fragment_id)]
        if project_id is not None:
            return await fragments_in_project(info, project_id)
        else:
            return await fragments(info)

    @strawberry.field
    async def campaign(self, info: strawberry.Info[Context], campgain_id: Optional[int] = None, project_id: Optional[int] = None) -> List[Campaign]:
        if campgain_id is not None:
            return [await campaign_by_id(info, campgain_id)]
        if project_id is not None:
            return await campaigns_in_project(info, project_id)
        else:
            return await campaigns(info)

    @strawberry.field
    async def location(self, ip: str) -> GeoLocation:
        return get_location_by_ip(ip)

    @strawberry.field
    async def subcampaign(self, info: strawberry.Info[Context], campaign_id: Optional[int] = None,
                          subcampaign_id: Optional[int] = None) -> List[SubCampaign]:
        if subcampaign_id is not None:
            return [await subcampaign_by_id(info, subcampaign_id)]
        if campaign_id is not None:
            return await subcampaigns_in_campaign(info, campaign_id)

    @strawberry.field
    async def project(self, info: strawberry.Info[Context], project_id: Optional[int] = None) -> List[Project]:
        if project_id is not None:
            return [await project_by_id(info, project_id)]
        else:
            return await projects(info)

    @strawberry.field
    async def subcampaign_fragment(self, info: strawberry.Info[Context], subcampaign_id: Optional[int] = None, subcampaign_fragment_id: Optional[int] = None) -> List[SubcampaignFragment]:
        if subcampaign_id is not None:
            return [await subcampaign_fragment_by_id(info, subcampaign_id)]
        else:
            return await subcampaign_fragments_in_subcampaign(subcampaign_fragment_id)


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
    async def fragment(self, info: strawberry.Info[Context], fg: FragmentPost) -> Fragment:
        if fg.id is not None:
            return await update_fragment(info, fg)
        else:
            return await create_fragment(info, fg)

    @strawberry.mutation
    async def campaign(self, info: strawberry.Info[Context], pr: CampaignPost) -> Campaign:
        if pr.id is not None:
            return await update_campaign(info, pr)
        else:
            return await create_campaign(info, pr)

    @strawberry.mutation
    async def delete_campaign(self, info: strawberry.Info[Context], campaign_id: int) -> None:
        await delete_campaign_from_db(info, campaign_id)

    @strawberry.mutation
    async def asset(self, info: strawberry.Info[Context], file: UploadFile) -> Media:
        return await upload_asset(info, file)

    @strawberry.mutation
    async def feedback(self, info: strawberry.Info[Context], fd: FeedbackIn) -> Feedback:
        return await create_feedback(info, fd)

    @strawberry.mutation
    async def subcampaign(self, info: strawberry.Info[Context], sub: SubCampaignIn) -> SubCampaign:
        if sub.id is not None:
            return await update_subcampaign(info, sub)
        else:
            return await create_subcampaign(info, sub)

    @strawberry.mutation
    async def delete_subcampaign(self, info: strawberry.Info[Context], subcampaign_id: int) -> None:
        await delete_subcampaign_from_db(info, subcampaign_id)

    @strawberry.mutation
    async def project(self, info: strawberry.Info[Context], pr: ProjectPost) -> Project:
        if pr.id is not None:
            return await update_project(info, pr)
        else:
            return await create_project(info, pr)

    @strawberry.mutation
    async def subcampaign_fragment(self, info: strawberry.Info[Context], subcampaign_fragment: SubcampaignFragmentPost):
        if subcampaign_fragment.id is not None:
            return await update_subcampaign_fragment(info, subcampaign_fragment)
        else:
            return await create_subcampaign_fragment(info, subcampaign_fragment)
