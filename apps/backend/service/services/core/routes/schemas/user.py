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


@strawberry.type
class UserRoleGet(UserGet):
    role: RoleGet


@strawberry.type
class AuthPayload:
    user: UserGet
    access_token: str
    refresh_token: str
