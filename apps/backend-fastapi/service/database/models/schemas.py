from datetime import datetime

from pydantic import BaseModel, EmailStr
from typing import Optional
from gotrue import User, UserAttributes


class ORMModel(BaseModel):
    class Config:
        orm_mode = True


class UserModel(ORMModel):
    email: EmailStr
    first_name: str
    last_name: str | None = None


class Auth(ORMModel):
    email: EmailStr
    password: str


class FragmentIn(ORMModel):
    author: int
    name: str
    document: str


class FragmentOut(FragmentIn):
    id: int
    author: int
    created_at: datetime
    updated_at: datetime


# Shared properties
class Token(BaseModel):
    access_token: str | None = None
    refresh_token: str | None = None


# request
class UserIn(Token, User):
    pass


# Properties to receive via API on creation
# in
class UserCreate(BaseModel):
    pass


# Properties to receive via API on update
# in
class UserUpdate(UserAttributes):
    pass


# response


class UserInDBBase(BaseModel):
    pass


# Properties to return to client via api
# out
class UserOut(Token):
    pass


# Properties properties stored in DB
class UserInDB(User):
    pass
