from datetime import datetime
from enum import Enum
from typing import List, Optional

import strawberry
from strawberry.scalars import JSON

from services.core.routes.schemas.feature_flag import VariantGet
from services.core.routes.schemas.release_condition import DeviceType, OSType


@strawberry.enum
class ClientHistoryEventType(Enum):
    GOAL_CONTRIBUTE = 3
    VIEW = 5
    GOAL_VIEW = 6


@strawberry.type
class ClientHistoryPost:
    client_id: int
    event_type: ClientHistoryEventType
    device_type: Optional[int] = None
    os_type: Optional[int] = None
    browser: Optional[str] = None
    language: Optional[str] = None
    screen_width: Optional[int] = None
    screen_height: Optional[int] = None
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    url: Optional[str] = None
    referrer: Optional[str] = None
    domain: Optional[str] = None
    subdomain: Optional[str] = None
    page_load_time: Optional[float] = None
    area_id: Optional[int] = None
    variant_id: Optional[int] = None
    campaign_id: Optional[int] = None
    feature_flag_id: Optional[int] = None
    goal_id: Optional[int] = None
    page: Optional[str] = None


@strawberry.input
class ClientInfo:
    os_type: Optional[OSType]
    device_type: Optional[DeviceType]
    time_frame: Optional[datetime]
    page: Optional[str]
    ip_address: Optional[str]
    browser: Optional[str]
    language: Optional[str]
    screen_width: Optional[int]
    screen_height: Optional[int]


@strawberry.type
class ClientAreaGet:
    variant: VariantGet
    area_properties: Optional[List[JSON]] = None  # type: ignore[valid-type]
