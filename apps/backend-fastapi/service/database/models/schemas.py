from datetime import datetime

from pydantic import BaseModel, EmailStr
from typing import Optional
from gotrue import User, UserAttributes


class ORMModel(BaseModel):
    class Config:
        orm_mode = True
