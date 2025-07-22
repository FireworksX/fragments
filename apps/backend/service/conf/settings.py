# pylint: disable=W0401,C0413,W0614

import os
import logging
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
    TELEGRAM_BOT_TOKEN: str = Field(default_factory=lambda: os.getenv('TELEGRAM_BOT_TOKEN'))
    TELEGRAM_CHAT_ID: str = Field(default_factory=lambda: os.getenv('TELEGRAM_CHAT_ID'))
    ACCESS_TOKEN_EXPIRE_TIME_MINUTES: float = Field(
        default_factory=lambda: os.getenv('ACCESS_TOKEN_EXPIRE_TIME_MINUTES')
    )
    ACCESS_TOKEN_SECRET_KEY: str = Field(
        default_factory=lambda: os.getenv('ACCESS_TOKEN_SECRET_KEY')
    )
    ALGORITHM: str = Field(default_factory=lambda: os.getenv('ALGORITHM'))
    REFRESH_TOKEN_EXPIRE_TIME_MINUTES: float = Field(
        default_factory=lambda: os.getenv('REFRESH_TOKEN_EXPIRE_TIME_MINUTES')
    )
    REFRESH_TOKEN_SECRET_KEY: str = Field(
        default_factory=lambda: os.getenv('REFRESH_TOKEN_SECRET_KEY')
    )
    MEDIA_STORAGE_PATH: str = Field(default_factory=lambda: os.getenv('MEDIA_STORAGE_PATH'))
    STATIC_SERVER_URL: str = Field(default_factory=lambda: os.getenv('STATIC_SERVER_URL'))


service_settings = ServiceSettings()


class PostgresSettings(BaseSettings):
    NAME: str = os.getenv('POSTGRES_NAME', 'postgres')
    USER: str = os.getenv('POSTGRES_USER', 'postgres')
    PASSWORD: str = os.getenv('POSTGRES_PASSWORD', 'password')
    HOST: str = os.getenv('POSTGRES_HOST', '  postgres')
    PORT: str = os.getenv('POSTGRES_PORT', '5432')

    class Config:
        env_prefix = ''


pg_settings = PostgresSettings()


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


make_pg_uri = uri_maker(pg_settings, 'postgresql+psycopg2')

PG_URI = make_pg_uri()


log_dir = '/opt/app/logs'
os.makedirs(log_dir, exist_ok=True)

logging.config.fileConfig('logging.conf')
logger = logging.getLogger('backend-core')
