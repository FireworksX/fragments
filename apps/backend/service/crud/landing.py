from typing import List, Optional

from sqlalchemy.orm import Session

from database import Stream
from database.models import Landing
from services.core.routes.schemas.landing import ClientInfo

from .ipgetter import GeoLocation, get_location_by_ip


async def create_landing_db(
    db: Session,
    name: str,
    project_id: int,
    stream_id: int,
    fragment_id: Optional[int] = None,
    props: Optional[str] = None,
    weight: Optional[float] = None,
    active: Optional[bool] = True,
    deleted: Optional[bool] = False,
) -> Landing:
    landing: Landing = Landing(
        name=name,
        project_id=project_id,
        stream_id=stream_id,
        fragment_id=fragment_id,
        props=props,
        weight=weight,
        active=active,
        deleted=deleted,
    )

    db.add(landing)
    db.commit()
    db.refresh(landing)
    return landing


async def get_landing_by_id_db(db: Session, landing_id: int) -> Optional[Landing]:
    return db.query(Landing).filter(Landing.id == landing_id).first()


async def delete_landing_by_id_db(db: Session, landing_id: int) -> None:
    db.query(Landing).filter(Landing.id == landing_id).delete()


async def get_landings_by_stream_id_db(db: Session, stream_id: int) -> List[Landing]:
    return db.query(Landing).filter(Landing.stream_id == stream_id).all()


async def update_landing_by_id_db(db: Session, values: dict) -> Landing:
    landing: Landing = await get_landing_by_id_db(db, values['id'])
    if values.get('name') is not None:
        landing.name = values['name']
    if values.get('weight') is not None:
        landing.weight = values['weight']
    if values.get('props') is not None:
        landing.props = values['props']
    if values.get('active') is not None:
        landing.active = values['active']
    if values.get('deleted') is not None:
        landing.deleted = values['deleted']
    if values.get('fragment_id') is not None:
        landing.fragment_id = values['fragment_id']
    db.merge(landing)
    db.commit()
    db.refresh(landing)
    return landing


async def stream_matches_client(stream: Stream, client: ClientInfo) -> bool:
    client_location: GeoLocation = get_location_by_ip(client.ip_address)
    if stream.pages_filter:
        if not any(client.page == pf.pages for pf in stream.pages_filter):
            return False

    if stream.device_types_filter:
        if not any(
            client.device_type.value == df.device_types for df in stream.device_types_filter
        ):
            # Assuming client.device_type is an enum and stored value is comparable
            return False

    if stream.os_types_filter:
        if not any(client.os_type.value == osf.os_types for osf in stream.os_types_filter):
            return False

    if stream.time_frames_filter:
        if not any(
            tf.from_time <= client.time_frame <= tf.to_time for tf in stream.time_frames_filter
        ):
            return False

    if stream.geo_locations_filter:
        match_found = any(
            client_location.country == gf.country
            and (gf.region is None or client_location.region == gf.region)
            and (gf.city is None or client_location.city == gf.city)
            for gf in stream.geo_locations_filter
        )
        if not match_found:
            return False
    return True


async def get_best_landing(
    db: Session, client: ClientInfo, project_id: int
) -> Optional[Landing]:
    streams = (
        db.query(Stream)
        .filter(Stream.project_id == project_id, Stream.active == True, Stream.deleted == False)
        .all()
    )

    candidate_landings = []
    for stream in streams:
        if not stream_matches_client(stream, client):
            continue

        landings = (
            db.query(Landing)
            .filter(
                Landing.project_id == project_id,
                Landing.stream_id == stream.id,
                Landing.active == True,
                Landing.deleted == False,
            )
            .all()
        )

        if not landings:
            continue

        best_for_stream = max(landings, key=lambda l: l.weight)
        candidate_landings.append(best_for_stream)

    if not candidate_landings:
        return None

    overall_best = max(candidate_landings, key=lambda l: l.weight)
    return overall_best
