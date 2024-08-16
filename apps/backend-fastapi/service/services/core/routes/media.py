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
from fastapi import FastAPI, File, UploadFile


@api.post("/upload_media/")
async def upload_media(token: Annotated[str | None, Header()], file: UploadFile, id_: int):
    try:
        user = supabase.auth.get_user(token)
    except AuthApiError as e:
        return {"error": e.message}

    supabase.storage.from_("project").upload(file=file, path=path_on_supastorage,
                                                file_options={"content-type": "audio/mpeg"})

    return {"filename": file.filename}
