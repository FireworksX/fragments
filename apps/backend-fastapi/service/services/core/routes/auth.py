from typing import Any, Dict

from postgrest import APIResponse

from services.api import responses
from . import api
from database.models.schemas import Auth
from services.dependencies import supabase
from gotrue.errors import AuthApiError
from typing import Annotated

from fastapi import Header
from postgrest.exceptions import APIError


@api.post('/auth/sign_in', response_model=Any, responses=responses)
async def sign_in(auth: Auth) -> Dict[str, str]:
    try:
        user = supabase.auth.sign_in_with_password({"email": auth.email, "password": auth.password})
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": user}


@api.post('/auth/sign_up', response_model=Any, responses=responses)
async def sign_up(auth: Auth) -> Dict[str, str]:
    try:
        user = supabase.auth.sign_up({"email": auth.email, "password": auth.password})
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": user}


@api.get('/auth/user', response_model=Any, responses=responses)
async def get_user(token: Annotated[str | None, Header()]) -> dict[str, str | None] | dict[str, APIResponse[Any]]:
    try:
        user = supabase.auth.get_user(token)
    except APIError as e:
        return {"error": e.message}
    return {"message": user}
