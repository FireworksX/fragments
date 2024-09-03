from strawberry.fastapi import GraphQLRouter, BaseContext
import strawberry
from typing import Optional, Literal
from enum import Enum

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
class Project:
    id: str
    name: str
    logo: Media
    user: User


@strawberry.input
class ProjectIn:
    id: Optional[str] = None
    name: Optional[str] = None
    logo: Optional[str] = None


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
