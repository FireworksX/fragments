# pylint: disable=C0413

import strawberry
from fastapi import FastAPI, File, UploadFile
from strawberry.fastapi import GraphQLRouter
from strawberry.file_uploads import Upload

from services.api import Api

from .middleware import get_context
from .router import Mutation, Query

api: Api = Api()

schema = strawberry.Schema(query=Query, mutation=Mutation, scalar_overrides={UploadFile: Upload})
graphql_app = GraphQLRouter(schema, context_getter=get_context, multipart_uploads_enabled=True)

api.include_router(graphql_app, prefix='/graphql')
