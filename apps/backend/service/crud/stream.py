from database.models import Stream, StreamOSTypeFilter, StreamDeviceTypeFilter, StreamTimeFrameFilter, \
    StreamGeoLocationFilter, StreamPageFilter
from sqlalchemy.orm import Session
from typing import Optional, List, Union

from services.core.routes.schemas.filter import FilterOSTypePost, FilterPagePost, FilterTimeFramePost, \
    FilterDeviceTypePost, FilterGeoLocationPost, FilterType
from services.core.routes.schemas.stream import FiltersPost


def add_os_type_filter_to_stream(stream: Stream, os_type_filter: FilterOSTypePost) -> None:
    relation: StreamOSTypeFilter = StreamOSTypeFilter(stream_id=stream.id,
                                                      os_type=int(os_type_filter.os_type.value),
                                                      toggled=os_type_filter.toggled)
    relation.stream = stream
    relation.toggled = os_type_filter.toggled


def add_device_type_filter_to_stream(stream: Stream, device_type_filter: FilterDeviceTypePost) -> None:
    relation: StreamDeviceTypeFilter = StreamDeviceTypeFilter(stream_id=stream.id,
                                                              device_type=int(device_type_filter.device_type.value),
                                                              toggled=device_type_filter.toggled)
    relation.stream = stream
    relation.toggled = device_type_filter.toggled


def add_page_filter_to_stream(stream: Stream, page_filter: FilterPagePost) -> None:
    relation: StreamPageFilter = StreamPageFilter(stream_id=stream.id, page=page_filter.page)
    relation.stream = stream
    relation.toggled = page_filter.toggled


def add_geolocation_filter_to_stream(stream: Stream, geo_location_filter: FilterGeoLocationPost) -> None:
    relation: StreamGeoLocationFilter = StreamGeoLocationFilter(stream_id=stream.id,
                                                                country=geo_location_filter.country,
                                                                region=geo_location_filter.region,
                                                                city=geo_location_filter.city,
                                                                toggled=geo_location_filter.toggled)
    relation.stream = stream
    relation.toggled = geo_location_filter.toggled


def add_time_frame_filter_to_stream(stream: Stream, time_frame_filter: FilterTimeFramePost) -> None:
    relation: StreamTimeFrameFilter = StreamTimeFrameFilter(stream_id=stream.id,
                                                            to_time=time_frame_filter.to_time,
                                                            from_time=time_frame_filter.from_time,
                                                            toggled=time_frame_filter.toggled)
    relation.stream = stream
    relation.toggled = time_frame_filter.toggled


async def create_stream_db(db: Session, name: str, project_id: int, campaign_id: int, weight: float,
                           active: bool, deleted: bool, filters: Optional[FiltersPost]) -> Stream:
    stream: Stream = Stream(name=name, project_id=project_id, campaign_id=campaign_id, weight=weight, active=active,
                            deleted=deleted)
    db.add(stream)
    db.commit()
    db.refresh(stream)

    if filters is not None:
        for os_type in filters.os_types:
            add_os_type_filter_to_stream(stream, os_type)
        for device_type in filters.device_types:
            add_device_type_filter_to_stream(stream, device_type)
        for page in filters.pages:
            add_page_filter_to_stream(stream, page)
        for geo_location in filters.geolocations:
            add_geolocation_filter_to_stream(stream, geo_location)
        for time_frame in filters.time_frames:
            add_time_frame_filter_to_stream(stream, time_frame)

    db.commit()
    db.refresh(stream)
    return stream


async def get_stream_by_id_db(db: Session, stream_id: int) -> Optional[Stream]:
    return db.query(Stream).filter(Stream.id == stream_id).first()


async def delete_stream_by_id_db(db: Session, stream_id: int) -> None:
    db.delete(get_stream_by_id_db(db, stream_id))


async def get_streams_by_campaign_id_db(db: Session, campaign_id: int, active: Optional[bool] = None,
                                        deleted: Optional[bool] = None) -> List[Stream]:
    query = db.query(Stream).filter(Stream.campaign_id == campaign_id)
    if active is not None:
        query = query.filter(Stream.active == active)
    if deleted is not None:
        query = query.filter(Stream.deleted == deleted)
    return query.all()


async def update_stream_by_id_db(db: Session, values: dict, filters: Optional[FiltersPost]) -> Stream:
    stream: Stream = await get_stream_by_id_db(db, values['id'])
    if values.get('active') is not None:
        stream.active = values['active']
    if values.get('deleted') is not None:
        stream.deleted = values['deleted']
    if values.get('name') is not None:
        stream.name = values['name']
    if values.get('weight') is not None:
        stream.weight = values['weight']
    db.merge(stream)
    db.commit()

    if filters is not None:
        stream.os_types_filter.clear()
        stream.device_types_filter.clear()
        stream.pages_filter.clear()
        stream.geo_locations_filter.clear()
        stream.time_frames_filter.clear()

        for os_type in filters.os_types:
            add_os_type_filter_to_stream(stream, os_type)
        for device_type in filters.device_types:
            add_device_type_filter_to_stream(stream, device_type)
        for page in filters.pages:
            add_page_filter_to_stream(stream, page)
        for geo_location in filters.geolocations:
            add_geolocation_filter_to_stream(stream, geo_location)
        for time_frame in filters.time_frames:
            add_time_frame_filter_to_stream(stream, time_frame)
    db.commit()
    db.refresh(stream)
    return stream
