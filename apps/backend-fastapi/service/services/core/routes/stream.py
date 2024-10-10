from typing import List
from fastapi import HTTPException, status
import strawberry

from crud.stream import create_stream_db, update_stream_by_id_db, get_streams_by_campaign_id_db, get_stream_by_id_db
from crud.campaign import get_campaign_by_id_db
from database import Session, Stream, Campaign
from .schemas import AuthPayload, CampaignGet, CampaignPost, RoleGet, StreamPost, StreamGet, DeviceTypeGet, OSTypeGet, \
    GeoLocationGet, TimeFrameGet
from .middleware import Context
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def stream_db_to_stream(stream: Stream) -> StreamGet:
    return StreamGet(id=stream.id, name=stream.name, deleted=stream.deleted,
                     active=stream.active,
                     campaign_id=stream.campaign_id, weight=stream.weight,
                     os_types=[OSTypeGet(relation.os_type.os_type) for relation in stream.os_types],
                     device_types=[DeviceTypeGet(relation.device_type.device_type) for relation in
                                   stream.device_types],
                     pages=[relation.page.page for relation in stream.pages], geo_locations=[
            GeoLocationGet(country=relation.geo_location.country, city=relation.geo_location.city,
                           region=relation.geo_location.region) for relation in stream.geo_locations],
                     time_frames=[
                         TimeFrameGet(to_time=relation.time_frame.to_time,
                                      from_time=relation.time_frame.from_time) for
                         relation in stream.time_frames])


async def streams_in_campaign(info: strawberry.Info[Context], campaign_id: int) -> List[StreamGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view streams')
    streams: List[Stream] = await get_streams_by_campaign_id_db(db, campaign_id)
    out: List[StreamGet] = []
    for stream in streams:
        out.append(stream_db_to_stream(stream))
    return out


async def stream_by_id(info: strawberry.Info[Context], stream_id: int) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, stream_id)
    if stream is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stream does not exist")

    campaign: Campaign = await get_campaign_by_id_db(db, stream.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view streams')

    return stream_db_to_stream(stream)


async def create_stream(info: strawberry.Info[Context], strm: StreamPost) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, strm.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create streams')

    stream: Stream = await create_stream_db(db, strm.name, strm.campaign_id, strm.weight,
                                            strm.active, strm.deleted, strm.os_types, strm.device_types, strm.pages,
                                            strm.geo_locations, strm.time_frames)

    return stream_db_to_stream(stream)


async def update_stream(info: strawberry.Info[Context], strm: StreamPost) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, strm.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create streams')

    stream: Stream = await update_stream_by_id_db(db, strm.__dict__, strm.os_types, strm.device_types, strm.pages,
                                                  strm.geo_locations, strm.time_frames)
    return stream_db_to_stream(stream)
