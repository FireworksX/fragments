from strawberry.fastapi import GraphQLRouter, BaseContext
import strawberry
from typing import Optional, List
from enum import Enum
from pydantic import BaseModel, field_validator


@strawberry.type
class User:
    id: str
    email: str
    first_name: str
    last_name: Optional[str]


@strawberry.type
class AuthPayload:
    user: User
    access_token: str
    refresh_token: str


@strawberry.type
class Fragment:
    id: str
    name: str
    user: User
    document: strawberry.scalars.JSON


@strawberry.input
class FragmentIn:
    id: Optional[str] = None
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None


@strawberry.type
class Media:
    id: str
    path: str


@strawberry.type
class Campaign:
    id: str
    name: str
    logo: Media
    user: User
    description: str
    active: bool
    deleted: bool


@strawberry.input
class CampaignIn:
    id: Optional[str] = None
    name: Optional[str] = None
    logo: Optional[str] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    deleted: Optional[bool] = None


@strawberry.enum
class OSType(Enum):
    ANDROID = 1
    IOS = 2
    WINDOWS = 3
    LINUX = 4
    MACOS = 5


@strawberry.enum
class DeviceType(Enum):
    TABLET = 1
    DESKTOP = 2
    MOBILE = 3


@strawberry.type
class GeoLocation:
    country: str
    region: str
    city: str

@strawberry.type
class TimeFrame:
    from_time: int
    to_time: int

@strawberry.input
class TimeFramePost:
    from_time: int
    to_time: int

@strawberry.type
class SubCampaign:
    id: str
    campaign_id: int
    active: bool
    name: str
    os_types: List[OSType]
    device_types: List[DeviceType]
    pages: List[str]
    geo_locations: List[GeoLocation]
    time_frames: List[TimeFrame]
    weight: float


@strawberry.input
class GeoLocationPost:
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
@strawberry.input
class SubCampaignIn:
    id: Optional[int] = None
    campaign_id: Optional[int] = None
    active: Optional[bool] = None
    deleted: Optional[bool] = None
    name: Optional[str] = None
    os_type: Optional[List[OSType]] = None
    device_type: Optional[List[DeviceType]] = None
    pages: Optional[List[str]] = None
    geoLocation: Optional[List[GeoLocationPost]] = None
    times: Optional[List[TimeFramePost]] = None
    weight: Optional[float] = None


@strawberry.enum
class FeelLevel(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


@strawberry.input
class FeedbackIn:
    feel: Optional[FeelLevel] = None
    content: str
    page: str


@strawberry.type
class Feedback:
    feel: Optional[FeelLevel] = None
    content: str
    page: str
    user: User
