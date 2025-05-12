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