from database import OSType, DeviceType, Page, GeoLocation, TimeFrame
from database.models import Stream, StreamOSType, StreamDeviceType, StreamTimeFrame, StreamGeoLocation, StreamPage
from sqlalchemy.orm import Session
from typing import Optional, List

from services.core.routes.schemas import OSTypeGet, DeviceTypeGet, GeoLocationPost, TimeFramePost


def add_os_types_to_stream(db: Session, stream: Stream, os_types: List[OSTypeGet]) -> None:
    for os_type in os_types:
        os_type_db: OSType = OSType(stream_id=stream.id, os_type=int(os_type.value))
        db.add(os_type_db)
        db.commit()
        db.refresh(os_type_db)
        relation: StreamOSType = StreamOSType(stream_id=stream.id, os_type_id=os_type_db.id)
        relation.stream = stream
        relation.os_type = os_type_db


def add_device_types_to_stream(db: Session, stream: Stream, device_types: List[DeviceTypeGet]) -> None:
    for device_type in device_types:
        device_type_db: DeviceType = DeviceType(stream_id=stream.id, device_type=int(device_type.value))
        db.add(device_type_db)
        db.commit()
        db.refresh(device_type_db)
        relation: StreamDeviceType = StreamDeviceType(stream_id=stream.id, device_type_id=device_type_db.id)
        relation.stream = stream
        relation.device_type = device_type_db


def add_pages_to_stream(db: Session, stream: Stream, pages: List[str]) -> None:
    for page in pages:
        page_db: Page = Page(stream_id=stream.id, page=page)
        db.add(page_db)
        db.commit()
        db.refresh(page_db)
        relation: StreamPage = StreamPage(stream_id=stream.id, page_id=page_db.id)
        relation.stream = stream
        relation.page = page_db


def add_geolocations_to_stream(db: Session, stream: Stream, geo_locations: List[GeoLocationPost]) -> None:
    for geo_location in geo_locations:
        geo_location_db: GeoLocation = GeoLocation(stream_id=stream.id, country=geo_location.country,
                                                   region=geo_location.region, city=geo_location.city)
        db.add(geo_location_db)
        db.commit()
        db.refresh(geo_location_db)
        relation: StreamGeoLocation = StreamGeoLocation(stream_id=stream.id, geo_location_id=geo_location_db.id)
        relation.stream = stream
        relation.geo_location = geo_location_db


def add_time_frames_to_stream(db: Session, stream: Stream, time_frames: List[TimeFramePost]) -> None:
    for time_frame in time_frames:
        time_frame_db: TimeFrame = TimeFrame(stream_id=stream.id, to_time=time_frame.to_time,
                                             from_time=time_frame.from_time)
        db.add(time_frame_db)
        db.commit()
        db.refresh(time_frame_db)
        relation: StreamTimeFrame = StreamTimeFrame(stream_id=stream.id, time_frame_id=time_frame_db.id)
        relation.stream = stream
        relation.time_frame = time_frame_db


async def create_stream_db(db: Session, name: str, campaign_id: int, weight: float,
                           active: bool, deleted: bool, os_types: Optional[List[OSTypeGet]],
                           device_types: Optional[List[DeviceTypeGet]], pages: Optional[List[str]],
                           geo_locations: Optional[List[GeoLocationPost]],
                           time_frames: Optional[List[TimeFramePost]]) -> Stream:
    stream: Stream = Stream(name=name, campaign_id=campaign_id, weight=weight, active=active, deleted=deleted)
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


async def get_streams_by_campaign_id_db(db: Session, campaign_id: int) -> List[Stream]:
    return db.query(Stream).filter(Stream.campaign_id == campaign_id).all()


async def update_stream_by_id_db(db: Session, values: dict, os_types: Optional[List[OSTypeGet]],
                                 device_types: Optional[List[DeviceTypeGet]], pages: Optional[List[str]],
                                 geo_locations: Optional[List[GeoLocationPost]],
                                 time_frames: Optional[List[TimeFramePost]]) -> Stream:
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
        stream.os_types.clear()
        add_os_types_to_stream(db, stream, os_types)
    if device_types is not None:
        stream.device_types.clear()
        add_device_types_to_stream(db, stream, device_types)
    if pages is not None:
        stream.pages.clear()
        add_pages_to_stream(db, stream, pages)
    if geo_locations is not None:
        stream.geo_locations.clear()
        add_geolocations_to_stream(db, stream, geo_locations)
    if time_frames is not None:
        stream.time_frames.clear()
        add_time_frames_to_stream(db, stream, time_frames)
    db.commit()
    db.refresh(stream)
    return stream
