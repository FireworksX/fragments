from datetime import datetime
from typing import Optional

import strawberry

from services.core.routes.schemas.filter import DeviceType, OSType
from services.core.routes.schemas.fragment import FragmentGet
from services.core.routes.schemas.stream import StreamGet


@strawberry.type
class LandingGet:
    id: int
    stream: StreamGet
    fragment: Optional[FragmentGet] = None
    props: Optional[strawberry.scalars.JSON] = None
    weight: Optional[float] = None
    name: str
    active: bool
    deleted: bool


@strawberry.input
class LandingPost:
    stream_id: int
    fragment_id: Optional[int] = None
    props: Optional[strawberry.scalars.JSON] = None
    weight: Optional[float] = None
    name: str
    active: Optional[bool] = None
    deleted: Optional[bool] = None


@strawberry.input
class LandingPatch:
    id: int
    props: Optional[strawberry.scalars.JSON] = None
    fragment_id: Optional[int] = None
    weight: Optional[float] = None
    name: Optional[str] = None
    active: Optional[bool] = None
    deleted: Optional[bool] = None


@strawberry.input
class ClientLanding:
    os_type: Optional[OSType]
    device_type: Optional[DeviceType]
    time_frame: Optional[datetime]
    page: Optional[str]
    ip_address: Optional[str]
