from datetime import datetime
from enum import Enum
from typing import List, Optional

import strawberry

from services.core.routes.schemas.area import AreaGet
from services.core.routes.schemas.feature_flag import VariantGet
from services.core.routes.schemas.release_condition import DeviceType, OSType


@strawberry.enum
class ClientHistoryEventType(Enum):
    INIT = 1
    RELEASE = 2
    CONTRIBUTE = 3
    FEEDBACK = 4
    VIEW = 5


@strawberry.type
class ClientHistoryGet:
    id: int
    client_id: int
    device_type: Optional[int]
    os_type: Optional[int]
    browser: Optional[str]
    language: Optional[str]
    screen_width: Optional[int]
    screen_height: Optional[int]
    country: Optional[str]
    region: Optional[str]
    city: Optional[str]
    url: Optional[str]
    referrer: Optional[str]
    domain: Optional[str]
    subdomain: Optional[str]
    page_load_time: Optional[float]
    created_at: str
    event_type: ClientHistoryEventType
    area: Optional[AreaGet]
    variant: Optional[VariantGet]


@strawberry.type
class ClientGet:
    id: int
    created_at: str
    updated_at: str
    last_visited_at: Optional[str]
    history: List[ClientHistoryGet]


@strawberry.input
class ClientInfo:
    os_type: Optional[OSType]
    device_type: Optional[DeviceType]
    time_frame: Optional[datetime]
    page: Optional[str]
    ip_address: Optional[str]


@strawberry.type
class ClientAreaGet:
    variant: VariantGet
    area_properties: Optional[List[strawberry.scalars.JSON]] = None
