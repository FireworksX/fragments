from database import Stream
from database.models import Landing
from sqlalchemy.orm import Session
from typing import Optional, List

from services.core.routes.schemas.landing import ClientLanding


async def create_landing_db(db: Session, name: str, project_id: int, stream_id: int, fragment_id: Optional[int] = None,
                            props: Optional[str] = None, weight: Optional[float] = None, active: Optional[bool] = True,
                            deleted: Optional[bool] = False) -> Landing:
    landing: Landing = Landing(name=name, project_id=project_id, stream_id=stream_id,
                               fragment_id=fragment_id, props=props, weight=weight, active=active, deleted=deleted)

    db.add(landing)
    db.commit()
    db.refresh(landing)
    return landing


async def get_landing_by_id_db(db: Session, landing_id: int) -> Optional[Landing]:
    return db.query(Landing).filter(Landing.id == landing_id).first()


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


def stream_matches_client(stream: Stream, client: ClientLanding) -> bool:
    """
    Returns True if the stream's toggled filters match the client input.
    If a filter group has no toggled filters, that group is considered non-restrictive.
    """
    # Check pages filter: if any toggled page filters exist, client.page must match one
    if stream.pages_filter:
        toggled_pages = [pf for pf in stream.pages_filter if pf.toggled]
        if toggled_pages and not any(client.page == pf.page for pf in toggled_pages):
            return False

    # Check device type filter: if any toggled device filters exist, client.device_type must match one
    if stream.device_types_filter:
        toggled_devices = [df for df in stream.device_types_filter if df.toggled]
        if toggled_devices and not any(client.device_type.value == df.device_type for df in toggled_devices):
            # Assuming client.device_type is an enum and stored value is comparable
            return False

    # Check OS type filter: if any toggled OS filters exist, client.os_type must match one
    if stream.os_types_filter:
        toggled_os = [osf for osf in stream.os_types_filter if osf.toggled]
        if toggled_os and not any(client.os_type.value == osf.os_type for osf in toggled_os):
            return False

    # Check time frame filter: if any toggled time frame filters exist, client.time_frame must fall within one
    if stream.time_frames_filter:
        toggled_time_frames = [tf for tf in stream.time_frames_filter if tf.toggled]
        if toggled_time_frames and not any(
                tf.from_time <= client.time_frame <= tf.to_time for tf in toggled_time_frames):
            return False

    # (Optional) Check geo location filter:
    # You might need to resolve the client's IP address to a country/region/city,
    # and then check against toggled geo location filters.
    # For simplicity, we skip geo-location matching in this example.

    return True


def get_best_landing(db: Session, client: ClientLanding, project_id: int) -> Optional[Landing]:
    """
    For the given project and client landing input, this function:
      1. Queries all active streams for the project.
      2. For each stream, checks if its toggled filters match the client input.
      3. For matching streams, fetches the Landing records and selects the one with the highest weight.
      4. Returns the overall best Landing (by weight) among all candidate streams.
    Returns None if no stream matches the client filters or if no landing is found.
    """
    # 1. Query active streams for the project
    streams = db.query(Stream).filter(
        Stream.project_id == project_id,
        Stream.active == True,
        Stream.deleted == False
    ).all()

    candidate_landings = []
    for stream in streams:
        # 2. Check if the stream's toggled filters match the client input
        if not stream_matches_client(stream, client):
            continue

        # 3. Query Landing records for this stream
        landings = db.query(Landing).filter(
            Landing.project_id == project_id,
            Landing.stream_id == stream.id,
            Landing.active == True,
            Landing.deleted == False
        ).all()

        if not landings:
            continue

        # For this stream, choose the Landing with the highest weight
        best_for_stream = max(landings, key=lambda l: l.weight)
        candidate_landings.append(best_for_stream)

    if not candidate_landings:
        return None

    # 4. Choose the overall best Landing among all candidate streams
    overall_best = max(candidate_landings, key=lambda l: l.weight)
    return overall_best
