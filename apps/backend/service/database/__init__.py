# pylint: disable=C0413

from typing import Any, Optional

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from conf import PG_URI

SQLALCHEMY_DATABASE_URL = PG_URI
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_size=100, max_overflow=0, connect_args={'connect_timeout': 300})
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base: Any = declarative_base()

from .models import *  # isort:skip

__all__ = [
    'Base',
    'Session',
]