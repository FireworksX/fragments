from typing import List, Optional, Union

import strawberry
from fastapi import HTTPException, status

from crud.campaign import get_campaign_by_id_db
from crud.stream import (
    create_stream_db,
    delete_stream_by_id_db,
    get_stream_by_id_db,
    get_streams_by_campaign_id_db,
    update_stream_by_id_db,
)
from database import Campaign, Session, Stream

from .middleware import Context
from .schemas.filter import (
    FilterDeviceTypeGet,
    FilterGeoLocationsGet,
    FilterOSTypeGet,
    FilterPageGet,
    FilterTimeFrameGet,
)
from .schemas.stream import StreamGet, StreamPatch, StreamPost
from .schemas.user import AuthPayload, RoleGet
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def stream_db_to_stream(stream: Stream) -> StreamGet:
    filters: List[
        Union[
            FilterOSTypeGet
            | FilterDeviceTypeGet
            | FilterPageGet
            | FilterGeoLocationsGet
            | FilterTimeFrameGet
        ]
    ] = []
    for os_type_filter in stream.os_types_filter:
        filters.append(FilterOSTypeGet(os_type=os_type_filter.os_types))
    for device_type_filter in stream.device_types_filter:
        filters.append(FilterDeviceTypeGet(device_type=device_type_filter.device_types))
    for page in stream.pages_filter:
        filters.append(FilterPageGet(page=page.pages))
    for geo_location in stream.geo_locations_filter:
        filters.append(
            FilterGeoLocationsGet(
                country=geo_location.country, region=geo_location.region, city=geo_location.city
            )
        )
    for frame in stream.time_frames_filter:
        filters.append(FilterTimeFrameGet(from_time=frame.from_time, to_time=frame.to_time))

    return StreamGet(
        id=stream.id,
        name=stream.name,
        deleted=stream.deleted,
        active=stream.active,
        campaign_id=stream.campaign_id,
        weight=stream.weight,
        filters=filters,
    )


async def streams_in_campaign(
    info: strawberry.Info[Context],
    campaign_id: int,
    active: Optional[bool] = None,
    deleted: Optional[bool] = None,
) -> List[StreamGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to view streams'
        )
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Stream does not exist')

    campaign: Campaign = await get_campaign_by_id_db(db, stream.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f'User is not allowed to view streams'
        )

    return stream_db_to_stream(stream)


async def create_stream_route(info: strawberry.Info[Context], stream_post: StreamPost) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    campaign: Campaign = await get_campaign_by_id_db(db, stream_post.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Campaign does not exist')

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to create streams',
        )

    stream: Stream = await create_stream_db(
        db,
        stream_post.name,
        campaign.project_id,
        stream_post.campaign_id,
        stream_post.weight,
        stream_post.active,
        stream_post.deleted,
        stream_post.filters,
    )

    return stream_db_to_stream(stream)


async def update_stream_route(
    info: strawberry.Info[Context], stream_patch: StreamPatch
) -> StreamGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, stream_patch.id)
    if stream is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Stream does not exist')

    permission: bool = await write_permission(db, user.user.id, stream.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to update streams',
        )

    stream: Stream = await update_stream_by_id_db(db, stream_patch.__dict__, stream_patch.filters)
    return stream_db_to_stream(stream)


async def delete_stream_route(info: strawberry.Info[Context], stream_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, stream_id)
    if stream is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Stream does not exist')
    permission: bool = await write_permission(db, user.user.id, stream.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to delete streams',
        )

    await delete_stream_by_id_db(db, stream_id)
