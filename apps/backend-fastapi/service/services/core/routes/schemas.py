from strawberry.fastapi import GraphQLRouter, BaseContext
import strawberry
from typing import Optional, List
from enum import Enum
from pydantic import BaseModel, field_validator


@strawberry.type
class User:
    id: int
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
    id: int
    project_id: int
    project: str
    name: str
    user: User
    document: strawberry.scalars.JSON
    props: strawberry.scalars.JSON


@strawberry.input
class FragmentPost:
    id: Optional[int] = None
    project_id: Optional[int] = None
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None
    props: Optional[strawberry.scalars.JSON] = None

@strawberry.type
class Project:
    id: int
    name: str
    logo_id: str
    owner: User

@strawberry.input
class ProjectPost:
    id: Optional[int] = None
    name: Optional[str] = None
    logo_id: Optional[str] = None


@strawberry.type
class Media:
    id: int
    path: str


@strawberry.type
class Campaign:
    id: int
    project_id: int
    name: str
    logo: Media
    user: User
    description: str
    active: bool
    deleted: bool


@strawberry.input
class CampaignPost:
    id: Optional[int] = None
    project_id: Optional[int] = None
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
    id: int
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

@strawberry.type
class SubcampaignFragment:
    id: int
    subcampaign_id: int
    fragment_id: int
    props: Optional[strawberry.scalars.JSON] = None
    weight: float

@strawberry.input
class SubcampaignFragmentPost:
    id: Optional[int] = None
    subcampaign_id: Optional[int] = None
    fragment_id: Optional[int] = None
    props: Optional[strawberry.scalars.JSON] = None
    weight: Optional[float] = None