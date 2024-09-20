from typing import List, Dict, Any
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import AuthPayload, SubCampaign, OSType, DeviceType, GeoLocationPost, TimeFramePost, SubCampaignIn, \
    GeoLocation, \
    TimeFrame
from .middleware import Context


def os_type_from_db(type_: Dict[str, Any]) -> OSType:
    return OSType(type_['os_type'])


def device_type_from_db(type_: Dict[str, Any]) -> DeviceType:
    return DeviceType(type_['device_type'])


def page_from_db(type_: Dict[str, Any]) -> str:
    return type_['page']


def location_from_db(type_: Dict[str, Any]) -> GeoLocation:
    return GeoLocation(country=type_['country'], city=type_['city'], region=type_['region'])


def time_from_db(type_: Dict[str, Any]) -> TimeFrame:
    return TimeFrame(from_time=type_['from'], to_time=type_['to'])


def save_device_types_to_db(device_types: List[DeviceType], campaign_id: int, subcampaign_id: str) -> List[
    Dict[str, Any]]:
    types = []
    try:
        for device_type in device_types:
            data = {'campaign_id': campaign_id, 'subcampaign_id': subcampaign_id, 'device_type': device_type}
            device_type_db = supabase.postgrest.table("subcampaign_device_type").insert(data).execute().data[0]
            types.append(device_type_db)
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return types


def save_os_types_to_db(os_types: List[OSType], campaign_id: int, subcampaign_id: str) -> List[Dict[str, Any]]:
    types = []
    try:
        for os_type in os_types:
            data = {'campaign_id': campaign_id, 'subcampaign_id': subcampaign_id, 'os_type': os_type}
            os_type_db = supabase.postgrest.table("subcampaign_os_types").insert(data).execute().data[0]
            types.append(os_type_db)
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return types


def save_pages_to_db(pages: List[str], campaign_id: int, subcampaign_id: str) -> List[Dict[str, Any]]:
    types = []
    try:
        for page in pages:
            data = {'campaign_id': campaign_id, 'subcampaign_id': subcampaign_id, 'page': page}
            page_db = supabase.postgrest.table("subcampaign_pages").insert(data).execute().data[0]
            types.append(page_db)
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return types


def save_locations_to_db(locations: List[GeoLocationPost], campaign_id: int, subcampaign_id: str) -> List[
    Dict[str, Any]]:
    types = []
    try:
        for location in locations:
            data = {'campaign_id': campaign_id, 'subcampaign_id': subcampaign_id, 'country': location.country,
                    'region': location, 'city': location.city}
            geo_location_db = supabase.postgrest.table("subcampaign_geo_locations").insert(data).execute().data[0]
            locations.append(geo_location_db)
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return types


def save_timeframes_to_db(times: List[TimeFramePost], campaign_id: int, subcampaign_id: str) -> List[Dict[str, Any]]:
    types = []
    try:
        for time in times:
            data = {'campaign_id': campaign_id, 'subcampaign_id': subcampaign_id, 'from': time.from_time,
                    'to': time.to_time}
            time_db = supabase.postgrest.table("subcampaign_time_frames").insert(data).execute().data[0]
            times.append(time_db)
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return types


def subcampaign_from_db(subcampaign: Dict[str, Any], os_types: List[Dict[str, Any]], device_types: List[Dict[str, Any]],
                        pages: List[Dict[str, Any]], locations: List[Dict[str, Any]],
                        times: List[Dict[str, Any]]) -> SubCampaign:
    return SubCampaign(id=subcampaign['id'], campaign_id=subcampaign['campaign_id'], name=subcampaign['name'],
                       active=subcampaign['active'],
                       deleted=subcampaign['deleted'],
                       os_type=list(map(lambda os_type: os_type_from_db(os_type), os_types)),
                       device_type=list(map(lambda device_type: device_type_from_db(device_type), device_types)),
                       pages=list(map(lambda page: page_from_db(page), pages)),
                       geoLocation=list(map(lambda location: location_from_db(location), locations)),
                       times=list(map(lambda time: time_from_db(time), times)),
                       weight=subcampaign['weight'])


def subcampaign_from_db_ext(subcampaign: Dict[str, Any]):
    subcampaign_id = subcampaign['id']
    os_types = supabase.postgrest.table("subcampaign_os_types").select("*").eq("subcampaign_id",
                                                                               subcampaign_id).execute()
    device_types = supabase.postgrest.table("subcampaign_device_type").select("*").eq("subcampaign_id",
                                                                                      subcampaign_id).execute()
    pages = supabase.postgrest.table("subcampaign_pages").select("*").eq("subcampaign_id",
                                                                         subcampaign_id).execute()
    locations = supabase.postgrest.table("subcampaign_geo_locations").select("*").eq("subcampaign_id",
                                                                                     subcampaign_id).execute()
    time_frames = supabase.postgrest.table("subcampaign_time_frames").select("*").eq("subcampaign_id",
                                                                                     subcampaign_id).execute()
    return SubCampaign(id=subcampaign['id'], campaign_id=subcampaign['campaign_id'], name=subcampaign['name'],
                       active=subcampaign['active'],
                       deleted=subcampaign['deleted'],
                       os_type=list(map(lambda os_type: os_type_from_db(os_type), os_types)),
                       device_type=list(map(lambda device_type: device_type_from_db(device_type), device_types)),
                       pages=list(map(lambda page: page_from_db(page), pages)),
                       geoLocation=list(map(lambda location: location_from_db(location), locations)),
                       times=list(map(lambda time: time_from_db(time), time_frames)),
                       weight=subcampaign['weight'])


async def create_subcampaign(info: strawberry.Info[Context], sub: SubCampaignIn) -> SubCampaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    project = supabase.postgrest.table("campaigns").select("*").eq("id", sub.campaign_id).execute().data[0]
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    try:
        data = {'campaign_id': sub.campaign_id, 'name': sub.name, 'active': sub.active, 'weight': sub.weight,
                'deleted': False}
        subcampaign = supabase.postgrest.table("subcampaigns").insert(data).execute().data[0]
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    subcampaign_id: str = subcampaign['id']
    os_types = save_os_types_to_db(sub.os_type, sub.campaign_id, subcampaign_id)
    device_types = save_device_types_to_db(sub.device_type, sub.campaign_id, subcampaign_id)
    pages = save_pages_to_db(sub.pages, sub.campaign_id, subcampaign_id)
    locations = save_locations_to_db(sub.geoLocation, sub.campaign_id, subcampaign_id)
    times = save_timeframes_to_db(sub.times, sub.campaign_id, subcampaign_id)

    return subcampaign_from_db(subcampaign, os_types, device_types, pages, locations, times)


async def update_subcampaign(info: strawberry.Info[Context], sub: SubCampaignIn) -> SubCampaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        subcampaign = supabase.postgrest.table("subcampaigns").select("*").eq("id", sub.id).execute().data[0]
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    update = {'id': sub.id}
    if sub.active is not None:
        update['active'] = sub.active
    if sub.weight is not None:
        update['weight'] = sub.weight
    if sub.name is not None:
        update['name'] = sub.name
    if sub.deleted is not None:
        update['deleted'] = sub.deleted

    subcampaign = supabase.postgrest.table("subcampaigns").update(update).eq("id", sub.id).execute().data[0]
    if sub.device_type is not None:
        supabase.postgrest.table("subcampaign_device_type").delete("*").eq("subcampaign_id", sub.id)
        save_device_types_to_db(sub.device_type, sub.campaign_id, str(sub.id))
    if sub.os_type is not None:
        supabase.postgrest.table("subcampaign_os_type").delete("*").eq("subcampaign_id", sub.id)
        save_os_types_to_db(sub.os_type, sub.campaign_id, str(sub.id))
    if sub.pages is not None:
        supabase.postgrest.table("subcampaign_pages").delete("*").eq("subcampaign_id", sub.id)
        save_pages_to_db(sub.pages, sub.campaign_id, str(sub.id))
    if sub.geoLocation is not None:
        supabase.postgrest.table("subcampaign_geo_locations").delete("*").eq("subcampaign_id", sub.id)
        save_locations_to_db(sub.geoLocation, sub.campaign_id, str(sub.id))
    if sub.times is not None:
        supabase.postgrest.table("subcampaign_time_frames").delete("*").eq("subcampaign_id", sub.id)
        save_timeframes_to_db(sub.times, sub.campaign_id, str(sub.id))

    return subcampaign_from_db_ext(subcampaign)


async def subcampaign_by_id(info: strawberry.Info[Context], subcampaign_id: int) -> SubCampaign:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        subcampaign = supabase.postgrest.table("subcampaigns").select("*").eq("id", subcampaign_id).execute().data[0]
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return subcampaign_from_db_ext(subcampaign)


async def subcampaigns_in_campaign(info: strawberry.Info[Context], campaign_id: int) -> List[SubCampaign]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    project = supabase.postgrest.table("campaigns").select("*").eq("id", campaign_id).execute().data[0]
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    subcampaigns = supabase.postgrest.table("subcampaigns").select("*").eq("campaign_id", campaign_id).execute().data
    if subcampaigns is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    out: List[SubCampaign] = []
    for subcampaign in subcampaigns:
        if subcampaign['deleted'] is not True:
            out.append(subcampaign_from_db_ext(subcampaign))

    return out


async def delete_subcampaign_from_db(info: strawberry.Info[Context], subcampaign_id: int) -> None:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    campaign: SubCampaignIn = SubCampaignIn(id=subcampaign_id, deleted=True, active=False)
    await update_subcampaign(info, campaign)


async def delete_subcampaigns_from_db(info: strawberry.Info[Context], campaign_id: int) -> None:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    subcampaings = await subcampaigns_in_campaign(info, campaign_id)
    for subcampaing in subcampaings:
        await delete_subcampaign_from_db(info, int(subcampaing.id))
