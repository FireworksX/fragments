# pylint: disable=W0401,C0413,W0614

import os
from typing import Optional

from pydantic_settings import BaseSettings
from pydantic.fields import Field

APP_NAME = os.getenv('APP_NAME', 'Server')
APP_VERSION = os.getenv('APP_VERSION', '0.1.0')


class Level:
    DEV = 'dev'
    PROD = 'prod'


RUN_LEVEL = os.getenv('RUN_LEVEL', Level.PROD)

from conf.envs.prod import *  # isort: ignore

if RUN_LEVEL == Level.DEV:
    from conf.envs.dev import *  # isort: ignore


class ServiceSettings(BaseSettings):
    MAX_LIMIT: int = 20
    SUPABASE_URL: str = Field(default_factory=lambda: os.getenv("SUPABASE_URL"))
    SUPABASE_KEY: str = Field(default_factory=lambda: os.getenv("SUPABASE_KEY"))
    SUPERUSER_EMAIL: str = Field(default_factory=lambda: os.getenv("SUPERUSER_EMAIL"))
    SUPERUSER_PASSWORD: str = Field(default=lambda: os.getenv("SUPERUSER_PASSWORD"))


service_settings = ServiceSettings()


def uri_maker(conf_object, driver):
    def make_uri(
        user: Optional[str] = conf_object.USER,
        password: Optional[str] = conf_object.PASSWORD,
        host: str = conf_object.HOST,
        port: str = conf_object.PORT,
        db: Optional[str] = getattr(conf_object, 'NAME', None),
    ) -> str:
        if user:
            if password:
                auth = f'{user}:{password}'
            else:
                auth = user
            auth += '@'
        else:
            auth = ''

        connection_string = f'{driver}://{auth}{host}:{port}'
        if db:
            connection_string += f'/{db}'
        return connection_string
    
    return make_uri
