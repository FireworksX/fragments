from typing import Any, Dict

from postgrest import APIResponse

from services.api import responses
from . import api
from database.models.schemas import UserModel
from services.dependencies import supabase
from gotrue.errors import AuthApiError
from typing import Annotated

from fastapi import Header
from postgrest.exceptions import APIError


@api.get('/users', response_model=Any, responses=responses)
async def get_users(token: Annotated[str | None, Header()]) -> Dict[str, str]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        users = supabase.postgrest.from_table("users").select("*").execute()
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": users}


@api.get('/user_by_email', response_model=Any, responses=responses)
async def get_user_by_email(token: Annotated[str | None, Header()], email: str) -> Dict[str, str]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        users = supabase.postgrest.from_table("users").select("*").eq("email", email).execute()
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": users}


@api.post('/create_user', response_model=Any, responses=responses)
async def create_user(token: Annotated[str | None, Header()], user: UserModel) -> dict[str, str | None] | dict[str, APIResponse[Any]]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        user = supabase.table("users").insert(user.dict()).execute()
    except APIError as e:
        return {"error": "already exists" if "already exists" in e.message else e.message}
    return {"message": user}
