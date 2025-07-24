from typing import Any, Callable, Dict, List

import ujson
from fastapi.exceptions import RequestValidationError
from fastapi.openapi.utils import get_openapi
from starlette.requests import Request
from starlette.responses import JSONResponse, Response, StreamingResponse

from starlette.middleware.base import BaseHTTPMiddleware

from conf.settings import logger
from conf import APP_NAME, APP_VERSION, DEBUG
from services.api import Error, make_app
from crud.project import get_all_allowed_origins_db
from database import Session
from crud.project import validate_project_public_api_key, Project

app = make_app()


class UJSONResponse(JSONResponse):
    def render(self, content: Any) -> bytes:
        assert ujson is not None, 'ujson must be installed to use UJSONResponse'
        return ujson.dumps(content, ensure_ascii=False).encode('utf-8')


@app.exception_handler(RequestValidationError)
def type_error_handler(request: Request, exc: RequestValidationError) -> UJSONResponse:
    return UJSONResponse(status_code=422, content={'ok': False, 'error': exc.args})


@app.exception_handler(Error)
def type_error_handler(request: Request, exc: Error) -> UJSONResponse:
    return exc.render()


@app.middleware('http')
async def log_and_trace(request: Request, call_next: Callable[[Request], Any]) -> Response:
    response: StreamingResponse = await call_next(request)
    # Here you can place logging, tracing headers
    return response


from .routes import *  # pylint: disable=C0413  # isort:skip

app.include_router(api, tags=['api'])


def json_api_schema() -> Dict[Any, Any]:
    if app.openapi_schema:
        return app.openapi_schema

    SUCCESS_CODES = ('200',)
    CORRECT_SCHEMA_CODES = ('200', '422')

    openapi_schema = get_openapi(
        title=APP_NAME,
        version=APP_VERSION,
        description='OpenAPI schema',
        routes=app.routes,
    )

    def process_responses(responses: List[Any]) -> None:
        for response_code in responses:
            if response_code not in CORRECT_SCHEMA_CODES:
                continue
            response = responses[response_code]
            schema = response['content']['application/json']['schema']

            new_schema = {'type': 'object'}
            if title := schema.pop('title', None):
                new_schema['title'] = title
            new_schema['properties'] = {  # type: ignore
                'ok': {'title': 'Ok', 'type': 'boolean', 'default': response_code in SUCCESS_CODES}
            }
            if len(schema) > 1:
                data = {'title': 'Data', **schema}
            else:
                data = schema
            if response_code in SUCCESS_CODES:
                field = 'data'
            else:
                field = 'error'
                new_schema['properties']['error_code'] = {
                    'title': 'Error code',
                    'type': 'string',
                    'default': 'ERROR_CODE',
                }
            new_schema['properties'][field] = data  # type: ignore

            response['content']['application/json']['schema'] = new_schema

    paths = openapi_schema['paths']
    for path in paths.values():
        for method in path.values():
            process_responses(method['responses'])

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = json_api_schema

class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        origin = request.headers.get("origin")

        authorization = request.headers.get('Authorization', None)
        if authorization is None:
            logger.warning('No authorization header provided')
            return response

        db = Session()
        try:
            public_key = authorization.split(' ')[1]  # format is 'Bearer token'
            project: Project = await validate_project_public_api_key(db, public_key)
        except IndexError:
            logger.debug('Malformed authorization header')
            return response
        except ValueError:
            logger.debug('Invalid public key format')
            return response

        allowed_origins = [origin.origin for origin in project.allowed_origins]
        logger.debug(f"Allowed origins: {allowed_origins}, origin: {origin}")
            
        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "*"
            response.headers["Access-Control-Allow-Headers"] = "*"
            response.headers["Access-Control-Expose-Headers"] = "*"
        return response

app.add_middleware(DynamicCORSMiddleware)