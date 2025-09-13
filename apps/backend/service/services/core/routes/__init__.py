# pylint: disable=C0413

import strawberry
from fastapi import APIRouter, FastAPI, File, UploadFile
from strawberry.fastapi import GraphQLRouter
from strawberry.file_uploads import Upload

from .middleware import get_context
from .router import Mutation, Query

api: APIRouter = APIRouter()

schema = strawberry.Schema(query=Query, mutation=Mutation, scalar_overrides={UploadFile: Upload})  # type: ignore[dict-item]
graphql_app = GraphQLRouter(schema, context_getter=get_context, multipart_uploads_enabled=True)  # type: ignore[arg-type]

api.include_router(graphql_app, prefix='/graphql')
