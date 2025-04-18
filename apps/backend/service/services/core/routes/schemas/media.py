from typing import Optional

import strawberry
from enum import Enum


@strawberry.enum
class MediaType(Enum):
    PROJECT_LOGO = 1
    FRAGMENT_ASSET = 2
    CAMPAIGN_LOGO = 3
    USER_LOGO = 4

@strawberry.input
class MediaPost:
    media_type: MediaType
    directory_id: Optional[int] = None
    target_id: Optional[int] = None

@strawberry.input
class MediaDelete:
    media_type: MediaType
    media_id: Optional[int] = None
    target_id: Optional[int] = None
