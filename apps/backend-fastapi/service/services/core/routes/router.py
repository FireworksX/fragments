from .schemas import AuthPayload, User, Fragment, Media, FragmentIn, Campaign, CampaignIn, FeedbackIn, Feedback, GeoLocation, SubCampaign, SubCampaignIn

import strawberry
from typing import Optional, List
from .middleware import Context
from .user import login, logout, refresh, profile, signup
from .fragments import fragments, fragment_by_id, create_fragment, update_fragment
from .campaign import campaigns, campaign_by_id, create_campaign, update_campaign, delete_campaign_from_db
from .media import upload_asset
from .feedback import create_feedback
from .subcampaign import create_subcampaign, update_subcampaign, subcampaign_by_id, subcampaigns_in_campaign, delete_subcampaign_from_db
from fastapi import FastAPI, File, UploadFile
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
    async def fragment(self, info: strawberry.Info[Context], fragment_id: Optional[str] = None) -> List[Fragment]:
        if fragment_id is not None:
            return [await fragment_by_id(info, fragment_id)]
        else:
            return await fragments(info)

    @strawberry.field
    async def campaign(self, info: strawberry.Info[Context], campgain_id: Optional[str] = None) -> List[Campaign]:
        if campgain_id is not None:
            return [await campaign_by_id(info, campgain_id)]
        else:
            return await campaigns(info)

    @strawberry.field
    async def location(self, ip: str) -> GeoLocation:
        return get_location_by_ip(ip)

    @strawberry.field
    async def subcampaign(self, info: strawberry.Info[Context], campaign_id: Optional[str] = None, subcampaign_id: Optional[str] = None) -> List[SubCampaign]:
        if subcampaign_id is not None:
            return [await subcampaign_by_id(info, subcampaign_id)]
        if campaign_id is not None:
            return await subcampaigns_in_campaign(info, campaign_id)

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
    async def campaign(self, info: strawberry.Info[Context], pr: CampaignIn) -> Campaign:
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
