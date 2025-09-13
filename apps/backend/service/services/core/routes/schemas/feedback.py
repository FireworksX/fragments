from enum import Enum
from typing import Optional

import strawberry


@strawberry.enum
class FeelLevelGet(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


@strawberry.input
class FeedbackPost:
    feel: FeelLevelGet
    content: Optional[str] = None
    page: str


@strawberry.type
class FeedbackGet:
    feel: FeelLevelGet
    content: Optional[str] = None
    page: str
