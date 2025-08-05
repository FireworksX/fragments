from typing import Any, Callable

from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, StreamingResponse

from conf import DEBUG
from conf.settings import logger
from database import Session


def make_app(*args: Any, **kwargs: Any) -> FastAPI:
    kwargs.setdefault('docs_url', '/api')
    kwargs.setdefault('debug', DEBUG)
    kwargs.setdefault('openapi_url', '/api/openapi.json')
    return FastAPI(*args, **kwargs)


app = make_app()


@app.middleware('http')
async def log_and_trace(request: Request, call_next: Callable[[Request], Any]) -> Response:
    response: StreamingResponse = await call_next(request)
    # Here you can place logging, tracing headers
    return response


from .routes import *  # pylint: disable=C0413  # isort:skip

app.include_router(api, tags=['api'])


class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable[[Request], Any]) -> Response:
        response: Response = await call_next(request)

        origin = request.headers.get('origin')

        authorization = request.headers.get('Authorization', None)
        if authorization is None:
            logger.warning('No authorization header provided')
            return response

        db = Session()
        from crud.project import Project, validate_project_public_api_key

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

        if origin and origin in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            response.headers['Access-Control-Allow-Methods'] = '*'
            response.headers['Access-Control-Allow-Headers'] = '*'
            response.headers['Access-Control-Expose-Headers'] = '*'
        return response


app.add_middleware(DynamicCORSMiddleware)
