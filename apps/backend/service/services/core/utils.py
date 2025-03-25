from datetime import datetime, timedelta
import jwt
from conf.settings import service_settings
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_refresh_token(data: dict, expiry_time: timedelta | None = None):
    to_encode = data.copy()
    if expiry_time:
        expire = datetime.utcnow() + expiry_time
    else:
        expire = datetime.utcnow() + timedelta(minutes=service_settings.REFRESH_TOKEN_EXPIRE_TIME_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, service_settings.REFRESH_TOKEN_SECRET_KEY, algorithm=service_settings.ALGORITHM)


def create_access_token(data: dict, expiry_time: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expiry_time:
        expire = datetime.utcnow() + expiry_time
    else:
        expire = datetime.utcnow() + timedelta(minutes=service_settings.ACCESS_TOKEN_EXPIRE_TIME_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, service_settings.ACCESS_TOKEN_SECRET_KEY, algorithm=service_settings.ALGORITHM)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)
