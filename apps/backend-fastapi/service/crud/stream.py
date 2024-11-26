from database import StreamOSTypeFilter, StreamDeviceTypeFilter, StreamPageFilter, GeoLocation, StreamTimeFrameFilter, StreamGeoLocationFilter
from database.models import Stream, StreamOSTypeFilter, StreamDeviceTypeFilter, StreamTimeFrameFilter, StreamGeoLocationFilter, StreamPageFilter
from sqlalchemy.orm import Session
from typing import Optional, List

from services.core.routes.schemas import OSTypFilterGet, DeviceTypeFilterGet, TimeFrameFilterPost, \
    GeoLocationFilterPost


def add_os_types_to_stream(db: Session, stream: Stream, os_types: List[OSTypFilterGet], toggled: bool) -> None:
    for os_type in os_types:
        relation: StreamOSTypeFilter = StreamOSTypeFilter(stream_id=stream.id, os_type=int(os_type.value))
        relation.stream = stream
        relation.toggled = toggled


def add_device_types_to_stream(db: Session, stream: Stream, device_types: List[DeviceTypeFilterGet], toggled: bool) -> None:
    for device_type in device_types:
        relation: StreamDeviceTypeFilter = StreamDeviceTypeFilter(stream_id=stream.id, device_type=int(device_type.value))
        relation.stream = stream
        relation.toggled = toggled


def add_pages_to_stream(db: Session, stream: Stream, pages: List[str], toggled: bool) -> None:
    for page in pages:
        relation: StreamPageFilter = StreamPageFilter(stream_id=stream.id, page=page)
        relation.stream = stream
        relation.toggled = toggled

def add_geolocations_to_stream(db: Session, stream: Stream, geo_locations: List[GeoLocationFilterPost], toggled: bool) -> None:
    for geo_location in geo_locations:
        relation: StreamGeoLocationFilter = StreamGeoLocationFilter(stream_id=stream.id, country=geo_location.country,
                                                   region=geo_location.region, city=geo_location.city)
        relation.stream = stream
        relation.toggled = toggled


def add_time_frames_to_stream(db: Session, stream: Stream, time_frames: List[TimeFrameFilterPost], toggled: bool) -> None:
    for time_frame in time_frames:
        relation: StreamTimeFrameFilter = StreamTimeFrameFilter(stream_id=stream.id, to_time=time_frame.to_time,
                                             from_time=time_frame.from_time)
        relation.stream = stream
        relation.toggled = toggled


async def create_stream_db(db: Session, name: str, project_id: int, campaign_id: int, weight: float,
                           active: bool, deleted: bool, os_types: Optional[List[OSTypFilterGet]],
                           device_types: Optional[List[DeviceTypeFilterGet]], pages: Optional[List[str]],
                           geo_locations: Optional[List[GeoLocationFilterPost]],
                           time_frames: Optional[List[TimeFrameFilterPost]]) -> Stream:
    stream: Stream = Stream(name=name, project_id=project_id, campaign_id=campaign_id, weight=weight, active=active, deleted=deleted)
    db.add(stream)
    db.commit()
    db.refresh(stream)
    if os_types is not None:
        add_os_types_to_stream(db, stream, os_types)
    if device_types is not None:
        add_device_types_to_stream(db, stream, device_types)
    if pages is not None:
        add_pages_to_stream(db, stream, pages)
    if geo_locations is not None:
        add_geolocations_to_stream(db, stream, geo_locations)
    if time_frames is not None:
        add_time_frames_to_stream(db, stream, time_frames)
    return stream


async def get_stream_by_id_db(db: Session, stream_id: int) -> Optional[Stream]:
    return db.query(Stream).filter(Stream.id == stream_id).first()


async def get_streams_by_campaign_id_db(db: Session, campaign_id: int, active: Optional[bool] = None, deleted: Optional[bool] = None) -> List[Stream]:
    query = db.query(Stream).filter(Stream.campaign_id == campaign_id)
    if active is not None:
        query = query.filter(Stream.active == active)
    if deleted is not None:
        query = query.filter(Stream.deleted == deleted)
    return query.all()


async def update_stream_by_id_db(db: Session, values: dict, os_types: Optional[List[OSTypFilterGet]],
                                 device_types: Optional[List[DeviceTypeFilterGet]], pages: Optional[List[str]],
                                 geo_locations: Optional[List[GeoLocationFilterPost]],
                                 time_frames: Optional[List[TimeFrameFilterPost]]) -> Stream:
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
    if os_types is not None:
        stream.os_types_filter.clear()
        add_os_types_to_stream(db, stream, os_types)
    if device_types is not None:
        stream.device_types_filter.clear()
        add_device_types_to_stream(db, stream, device_types)
    if pages is not None:
        stream.pages_filter.clear()
        add_pages_to_stream(db, stream, pages)
    if geo_locations is not None:
        stream.geo_locations_filter.clear()
        add_geolocations_to_stream(db, stream, geo_locations)
    if time_frames is not None:
        stream.time_frames_filter.clear()
        add_time_frames_to_stream(db, stream, time_frames)
    db.commit()
    db.refresh(stream)
    return stream
