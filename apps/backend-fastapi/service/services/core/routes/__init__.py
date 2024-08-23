# pylint: disable=C0413

from services.api import Api
from strawberry.fastapi import GraphQLRouter
from .middleware import get_context
from fastapi import FastAPI, File, UploadFile
from strawberry.file_uploads import Upload

api: Api = Api()

# Import routes here
# from .module import *  # isort:skip

from .health import * # isort:skip
from .router import Query, Mutation
import strawberry

schema = strawberry.Schema(query=Query, mutation=Mutation, scalar_overrides={UploadFile: Upload})
graphql_app = GraphQLRouter(schema, context_getter=get_context)

api.include_router(graphql_app, prefix="/graphql")
