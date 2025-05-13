import datetime
from typing import Optional

import strawberry

from services.core.routes.schemas.filter import DeviceType, OSType

@strawberry.type
class LandingMetricGet:
    id: int
    landing_id: Optional[int]
    campaign_id: Optional[int]
    url: Optional[str]
    referrer: Optional[str] 
    domain: Optional[str]
    subdomain: Optional[str]
    page_load_time: Optional[float]
    device_type: Optional[DeviceType]
    os_type: Optional[OSType]
    browser: Optional[str]
    language: Optional[str]
    screen_width: Optional[int] 
    screen_height: Optional[int]
    country: Optional[str]
    region: Optional[str]
    city: Optional[str]
    created_at: datetime.datetime
    event: Optional[str]

@strawberry.input
class LandingMetricPost:
    landing_id: Optional[int] = None
    campaign_id: Optional[int] = None
    url: Optional[str] = None
    referrer: Optional[str] = None
    domain: Optional[str] = None
    subdomain: Optional[str] = None
    page_load_time: Optional[float] = None
    browser: Optional[str] = None
    language: Optional[str] = None
    screen_width: Optional[int] = None
    screen_height: Optional[int] = None
    event: Optional[str] = None
