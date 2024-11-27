from typing import List, Optional, Union
from fastapi import HTTPException, status
import strawberry

from crud.stream import create_stream_db, update_stream_by_id_db, get_streams_by_campaign_id_db, get_stream_by_id_db
from crud.campaign import get_campaign_by_id_db
from database import Session, Stream, Campaign
from .schemas.filter import FilterOSTypeGet, FilterDeviceTypeGet, FilterGeoLocationGet, FilterTimeFrameGet, \
    FilterPageGet, FilterType
from .schemas.stream import StreamGet, StreamPost, StreamPatch
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def stream_db_to_stream(stream: Stream) -> StreamGet:
    filters: List[
        Union[FilterOSTypeGet | FilterDeviceTypeGet | FilterPageGet | FilterGeoLocationGet | FilterTimeFrameGet]] = []
    for os_type_filter in stream.os_types_filter:
        filters.append(FilterOSTypeGet(type=FilterType.OSType, toggled=os_type_filter.toggled, os_type=os_type_filter.os_type))
    for device_type_filter in stream.device_types_filter:
        filters.append(FilterDeviceTypeGet(type=FilterType.DeviceType, toggled=device_type_filter.toggled, device_type=device_type_filter.device_type))
    for page in stream.pages_filter:
        filters.append(FilterPageGet(type=FilterType.PageType, toggled=page.toggled, page=page.page))
    for geo_location in stream.geo_locations_filter:
        filters.append(FilterGeoLocationGet(type=FilterType.GeoLocationType, toggled=geo_location.toggled, country=geo_location.country, region=geo_location.region, city=geo_location.city))
    for frame in stream.time_frames_filter:
        filters.append(FilterTimeFrameGet(type=FilterType.PageType, toggled=frame.toggled, from_time=frame.from_time, to_time=frame.to_time))

    return StreamGet(id=stream.id, name=stream.name, deleted=stream.deleted,
                     active=stream.active,
                     campaign_id=stream.campaign_id, weight=stream.weight, filters=filters)


async def streams_in_campaign(info: strawberry.Info[Context], campaign_id: int, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[StreamGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to view streams')
    streams: List[Stream] = await get_streams_by_campaign_id_db(db, campaign_id, active, deleted)
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


async def create_stream_route(info: strawberry.Info[Context], strm: StreamPost) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, strm.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create streams')

    stream: Stream = await create_stream_db(db, strm.name, campaign.project_id, strm.campaign_id, strm.weight,
                                            strm.active, strm.deleted, strm.filters)

    return stream_db_to_stream(stream)


async def update_stream_route(info: strawberry.Info[Context], strm: StreamPatch) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, strm.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to create streams')

    stream: Stream = await update_stream_by_id_db(db, strm.__dict__, strm.filters)
    return stream_db_to_stream(stream)
