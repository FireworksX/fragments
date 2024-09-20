from typing import List
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, Campaign, CampaignIn
from .middleware import Context
from .media import asset


async def campaigns(info: strawberry.Info[Context]) -> List[Campaign]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("campaigns").select("*").eq("owner", user.user.id).execute()

    campaigns: List[Campaign] = []
    for pr in result.data:
        if pr["deleted"] is not True:
            campaign: Campaign = Campaign(id=pr['id'], user=user.user, name=pr["name"], description=pr["description"],
                                          active=pr["active"], deleted=pr["deleted"],
                                          logo=asset(info, pr['logo']))
            campaigns.append(campaign)
    return campaigns


async def campaign_by_id(info: strawberry.Info[Context], id_: str) -> Campaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("campaigns").select("*").eq("id", id_).execute().data[0]
    campaign: Campaign = Campaign(id=result['id'], user=user.user, name=result["name"], deleted=result["deleted"],
                                  description=result["description"], active=result["active"],
                                  logo=asset(info, result['logo']))
    return campaign


async def create_campaign(info: strawberry.Info[Context], pr: CampaignIn) -> Campaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    campaign = supabase.postgrest.table("campaigns").insert({'owner': user.user.id, 'name': pr.name,
                                                             'logo': pr.logo, 'description': pr.description, 'deleted': False,
                                                             'active': pr.active}).execute().data[0]

    supabase.postgrest.table('pivot_campaign_member').insert({'member': user.user.id, 'campaign': campaign['id']})

    return Campaign(id=campaign['id'], user=user.user, name=campaign["name"], description=campaign["description"], deleted=campaign["deleted"],
                    active=campaign["active"],
                    logo=asset(info, campaign['logo']))


async def update_campaign(info: strawberry.Info[Context], pr: CampaignIn) -> Campaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        result = supabase.postgrest.from_table("campaigns").select("*").eq("id", pr.id).execute().data[0]
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    update = {'owner': user.user.id, 'id': pr.id}
    if pr.name is not None:
        update['name'] = pr.name
    if pr.logo is not None:
        update['logo'] = pr.logo
    if pr.description is not None:
        update['description'] = pr.description
    if pr.active is not None:
        update['active'] = pr.active
    if pr.deleted is not None:
        update['deleted'] = pr.deleted
    campaign = supabase.postgrest.table("campaigns").update(update).eq("id", pr.id).execute().data[0]

    return Campaign(id=campaign['id'], user=user.user, name=campaign["name"], description=campaign["description"],
                    active=campaign["active"], deleted=campaign["deleted"],
                    logo=asset(info, campaign['logo']))


async def delete_campaign_from_db(info: strawberry.Info[Context], campaign_id: int) -> None:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    campaign: CampaignIn = CampaignIn(id=campaign_id, deleted=True, active=False)
    await update_campaign(info, campaign)
