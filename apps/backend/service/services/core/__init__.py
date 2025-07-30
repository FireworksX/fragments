from typing import Any, Callable

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, StreamingResponse

from conf.settings import logger
from crud.project import Project, validate_project_public_api_key
from database import Session
from services.api import make_app

app = make_app()


@app.middleware('http')
async def log_and_trace(request: Request, call_next: Callable[[Request], Any]) -> Response:
    response: StreamingResponse = await call_next(request)
    # Here you can place logging, tracing headers
    return response


from .routes import *  # pylint: disable=C0413  # isort:skip

app.include_router(api, tags=['api'])


class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        origin = request.headers.get('origin')

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
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            response.headers['Access-Control-Allow-Methods'] = '*'
            response.headers['Access-Control-Allow-Headers'] = '*'
            response.headers['Access-Control-Expose-Headers'] = '*'
        return response


app.add_middleware(DynamicCORSMiddleware)
