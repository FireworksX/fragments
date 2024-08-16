from typing import Any, Dict

from postgrest import APIResponse

from services.api import responses
from . import api
from database.models.schemas import UserModel, FragmentIn, FragmentOut
from services.dependencies import supabase
from gotrue.errors import AuthApiError
from typing import Annotated

from fastapi import Header
from postgrest.exceptions import APIError


@api.get('/fragments', response_model=Any, responses=responses)
async def get_fragments_by_user_id(token: Annotated[str | None, Header()], id_: str) -> Dict[str, str]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        fragments = supabase.postgrest.from_table("fragments").select("*").eq("author", id_).execute()
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": fragments}


@api.get('/fragment/{fragment_id}', response_model=Any, responses=responses)
async def get_fragment(token: Annotated[str | None, Header()], fragment_id: str) -> dict[str, str] | \
                                                                                    dict[str, APIResponse[Any]]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        fragments = supabase.postgrest.from_table("fragments").select("*").eq("id", fragment_id).execute()
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": fragments}


@api.post('/fragment', response_model=Any, responses=responses)
async def create_fragment(token: Annotated[str | None, Header()], in_: FragmentIn) -> dict[str, str] | \
                                                                                      dict[str, APIResponse[Any]]:
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    try:
        fragments = supabase.table("fragments").insert(in_.dict()).execute()
    except AuthApiError as e:
        return {"message": e.message}
    return {"message": fragments}
