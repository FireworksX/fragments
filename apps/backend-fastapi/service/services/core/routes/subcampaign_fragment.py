from typing import List, Dict, Any
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, FragmentPost, SubcampaignFragmentPost, SubcampaignFragment, AuthPayload
from .middleware import Context
from .media import asset
from .fragments import fragment_by_id

from jsonschema import validate
import json


def subcampaign_fragment_from_db(fragment: Dict[str, Any]) -> SubcampaignFragment:
    return SubcampaignFragment(id=fragment['id'], subcampaign_id=fragment['subcampaign_id'],
                               fragment_id=fragment['fragment_id'], props=fragment['props'], weight=fragment['weight'])


async def subcampaign_fragment_by_id(info: strawberry.Info[Context],
                                     subcampaign_fragment_id: int) -> SubcampaignFragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    subcampaign_fragment = \
    supabase.postgrest.table("subcampaign_fragments").select('*').eq("id", subcampaign_fragment_id).execute().data[0]

    return subcampaign_fragment_from_db(subcampaign_fragment)


async def subcampaign_fragments_in_subcampaign(info: strawberry.Info[Context], subcampaign_id: int) -> List[
    SubcampaignFragment]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    subcampaign_fragments_db = supabase.postgrest.table("subcampaign_fragments").select('*').eq("subcampaign_id",
                                                                                                subcampaign_id).execute()

    subcampaign_fragments = []
    for subcampaign_fragment_db in subcampaign_fragments_db:
        subcampaign_fragments.append(subcampaign_fragment_from_db(subcampaign_fragment_db))

    return subcampaign_fragments


async def create_subcampaign_fragment(info: strawberry.Info[Context],
                                      fg: SubcampaignFragmentPost) -> SubcampaignFragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    fragment = await fragment_by_id(info, fg.fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if (fg.props is None and fragment.props is not None) or fg.props is not None and fragment.props is None:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE)

    if fg.props is not None and fg.props is not None:
        props = json.loads(fg.props)
        schema = json.loads(fragment.props)
        validate(instance=props, schema=schema)

    subcampaign_fragment = supabase.postgrest.table("subcampaign_fragments").insert(
        {'subcampaign_id': fg.subcampaign_id, 'fragment_id': fg.fragment_id, 'props': fg.props,
         'weight': fg.weight}).execute().data[0]

    return subcampaign_fragment_from_db(subcampaign_fragment)


async def update_subcampaign_fragment(info: strawberry.Info[Context],
                                      fg: SubcampaignFragmentPost) -> SubcampaignFragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    fragment = await fragment_by_id(info, fg.fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    data = {}
    if fg.props is not None:
        data['props'] = fg.props
    if fg.weight is None:
        data['weight'] = fg.weight
    subcampaign_fragment = supabase.postgrest.table("subcampaign_fragments").update(data
        ).execute().data[0]

    return subcampaign_fragment_from_db(subcampaign_fragment)
