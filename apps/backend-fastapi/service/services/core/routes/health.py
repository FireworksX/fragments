from typing import Any, Dict

from services.api import responses
from . import api

from services.dependencies import supabase
from gotrue.errors import AuthApiError

@api.get('/health', response_model=Any, responses=responses)
async def get_health() -> Dict[str, str]:
    return {"message": "good"}
