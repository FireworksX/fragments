
from typing import List, Optional

import strawberry


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


@strawberry.type
class ClientGet:
    id: int
    created_at: str
    updated_at: str
    last_visited_at: Optional[str]
    history: List[ClientHistoryGet]

@strawberry.input
class ClientHistoryInput:
    client_id: int
    device_type: int
    os_type: int
    browser: str
    language: str
    screen_width: int
    screen_height: int
    country: str
    region: str
    city: str
