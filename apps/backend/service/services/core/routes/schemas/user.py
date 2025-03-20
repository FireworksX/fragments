from enum import Enum
from typing import Optional

import strawberry


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

    _sa_instance_state: strawberry.Private[object]
    hashed_password: strawberry.Private[object]
    avatar_id: strawberry.Private[object]
    avatar: strawberry.Private[object]


@strawberry.type
class UserRoleGet(UserGet):
    role: RoleGet


@strawberry.type
class AuthPayload:
    user: UserGet
    access_token: str
    refresh_token: str
