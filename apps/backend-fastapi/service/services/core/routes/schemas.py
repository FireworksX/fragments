import strawberry
from typing import Optional, List
from enum import Enum
import datetime


@strawberry.enum
class RoleGet(Enum):
    OWNER = 1
    ADMIN = 2
    MANAGER = 3
    DESIGNER = 4


@strawberry.type
class UserGet:
    id: int
    email: str
    first_name: str
    last_name: Optional[str]
    logo: Optional[str]


@strawberry.type
class UserRoleGet(UserGet):
    role: RoleGet


@strawberry.type
class AuthPayload:
    user: UserGet
    access_token: str
    refresh_token: str


@strawberry.input
class FragmentPost:
    project_id: int
    name: str
    document: strawberry.scalars.JSON
    props: Optional[strawberry.scalars.JSON] = None

@strawberry.input
class FragmentPatch:
    id: int
    project_id: int
    name: Optional[str] = None
    document: Optional[strawberry.scalars.JSON] = None
    props: Optional[strawberry.scalars.JSON] = None


@strawberry.type
class CampaignGet:
    id: int
    project_id: int
    name: str
    logo_id: Optional[int] = None
    author: UserGet
    description: str
    active: bool
    deleted: bool


@strawberry.type
class ProjectGet:
    id: int
    name: str
    logo: Optional[str] = None
    owner: UserGet
    members: List[UserRoleGet]
    campaigns: List[CampaignGet]


@strawberry.type
class FragmentGet:
    id: int
    project: ProjectGet
    name: str
    author: UserGet
    document: strawberry.scalars.JSON
    props: strawberry.scalars.JSON


@strawberry.input
class ProjectPost:
    name: str
    logo: Optional[str] = None


@strawberry.input
class ProjectPatch:
    id: int
    name: Optional[str] = None


@strawberry.type
class MediaGet:
    id: int
    path: str


@strawberry.input
class CampaignPost:
    project_id: int
    name: str
    logo_id: Optional[int] = None
    description: Optional[str] = None
    active: bool
    deleted: bool


@strawberry.input
class CampaignPatch:
    id: int
    name: Optional[str] = None
    logo_id: Optional[int] = None
    description: Optional[str] = None
    active: Optional[bool] = None
    deleted: Optional[bool] = None


@strawberry.enum
class OSTypeGet(Enum):
    ANDROID = 1
    IOS = 2
    WINDOWS = 3
    LINUX = 4
    MACOS = 5


@strawberry.enum
class DeviceTypeGet(Enum):
    TABLET = 1
    DESKTOP = 2
    MOBILE = 3


@strawberry.type
class GeoLocationGet:
    country: str
    region: str
    city: str


@strawberry.type
class TimeFrameGet:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.input
class TimeFramePost:
    from_time: datetime.datetime
    to_time: datetime.datetime


@strawberry.type
class StreamGet:
    id: int
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    os_types: List[OSTypeGet]
    device_types: List[DeviceTypeGet]
    pages: List[str]
    geo_locations: List[GeoLocationGet]
    time_frames: List[TimeFrameGet]
    weight: float


@strawberry.input
class GeoLocationPost:
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None


@strawberry.input
class StreamPost:
    campaign_id: int
    active: bool
    deleted: bool
    name: str
    os_types: Optional[List[OSTypeGet]] = None
    device_types: Optional[List[DeviceTypeGet]] = None
    pages: Optional[List[str]] = None
    geo_locations: Optional[List[GeoLocationPost]] = None
    time_frames: Optional[List[TimeFramePost]] = None
    weight: float


@strawberry.input
class StreamPatch:
    id: int
    campaign_id: int
    active: Optional[bool] = None
    deleted: Optional[bool] = None
    name: Optional[str] = None
    os_types: Optional[List[OSTypeGet]] = None
    device_types: Optional[List[DeviceTypeGet]] = None
    pages: Optional[List[str]] = None
    geo_locations: Optional[List[GeoLocationPost]] = None
    time_frames: Optional[List[TimeFramePost]] = None
    weight: Optional[float] = None


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


@strawberry.type
class StreamFragmentGet:
    id: int
    stream_id: int
    fragment_id: int
    props: Optional[strawberry.scalars.JSON] = None
    weight: float
    name: str


@strawberry.input
class StreamFragmentPost:
    stream_id: int
    fragment_id: int
    props: Optional[strawberry.scalars.JSON] = None
    weight: float
    name: str


@strawberry.input
class StreamFragmentPatch:
    id: int
    fragment_id: int
    props: Optional[strawberry.scalars.JSON] = None
    weight: Optional[float] = None
    name: Optional[str] = None
