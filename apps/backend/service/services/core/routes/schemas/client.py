
from typing import List, Optional

import strawberry


@strawberry.type
class ClientHistoryGet:
    id: int
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


@strawberry.type
class ClientGet:
    id: int
    last_visited: Optional[str]
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
