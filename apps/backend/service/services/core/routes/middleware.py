from datetime import datetime, timezone
from typing import Optional

import jwt
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError
from strawberry.fastapi import BaseContext
from user_agents import parse as user_agent_parser

from conf.settings import service_settings
from crud.project import get_project_by_id_db, validate_project_public_api_key
from crud.user import get_user_by_email_db
from database import Session
from database.models import Project, User, Client
from services.core.utils import create_access_token, create_refresh_token
from services.dependencies import get_db
from crud.client import get_client_by_id_db, create_client_db
from .schemas.filter import DeviceType, OSType
from .schemas.landing import ClientInfo
from .schemas.user import AuthPayload


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate credentials',
    headers={'Authorization': 'token'},
)


class UserAgentInfo:
    device_type: Optional[DeviceType] = None
    os_type: Optional[OSType] = None

    def __init__(self, user_agent: str) -> None:
        user_agent_info = user_agent_parser(user_agent)
        if user_agent_info.is_mobile:
            self.device_type = DeviceType.MOBILE
        elif user_agent_info.is_tablet:
            self.device_type = DeviceType.TABLET
        elif user_agent_info.is_pc:
            self.device_type = DeviceType.DESKTOP
        else:
            print('unknown device type', user_agent_info)
            self.device_type = None

        if user_agent_info.os.family == 'Android':
            self.os_type = OSType.ANDROID
        elif user_agent_info.os.family in ['Windows', 'Chrome OS']:
            self.os_type = OSType.WINDOWS
        elif user_agent_info.os.family == 'Mac OS X':
            self.os_type = OSType.MACOS
        elif 'Linux' in user_agent_info.ua_string and 'X11' in user_agent_info.ua_string:
            self.os_type = OSType.LINUX
        elif user_agent_info.device.family in ['iPhone', 'iOS-Device']:
            self.os_type = OSType.IOS
        else:
            print('unknown OS type', user_agent_info)
            self.os_type = None


class Context(BaseContext):
    async def user(self) -> AuthPayload | None:
        if not self.request:
            return None

        authorization = self.request.headers.get('Authorization', None)
        refresh = self.request.headers.get('Refresh', None)

        if authorization is None:
            raise credentials_exception

        try:
            authorization = authorization.split(' ')[1]  # format is 'Bearer token'
            payload = jwt.decode(
                authorization,
                service_settings.ACCESS_TOKEN_SECRET_KEY,
                algorithms=[service_settings.ALGORITHM],
            )
            email: str = payload.get('sub')
            if email is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception
        except IndexError:
            raise credentials_exception
        user: User = await get_user_by_email_db(self.session(), email)
        if user is None:
            raise credentials_exception
        if refresh is None:
            refresh = create_refresh_token(data={'sub': user.email})
        return AuthPayload(user=user, access_token=authorization, refresh_token=refresh)

    async def project(self) -> Project | None:
        if not self.request:
            return None

        authorization = self.request.headers.get('Authorization', None)
        if authorization is None:
            raise credentials_exception

        try:
            public_key = authorization.split(' ')[1]  # format is 'Bearer token'
            project: Project = await validate_project_public_api_key(self.session(), public_key)
            if project is None:
                raise credentials_exception
        except IndexError:
            raise credentials_exception
        except ValueError:
            raise credentials_exception
        else:
            return project

    async def client_info(self) -> ClientInfo:
        agent_header = self.request.headers.get('User-Agent', None)
        user_agent: UserAgentInfo = UserAgentInfo(agent_header)

        user_ip: Optional[str] = self.request.headers.get('X-User-Ip', None)
        if user_ip is None:
            user_ip = self.request.headers.get('X-Forwarded-For', self.request.client.host)
        page: Optional[str] = self.request.headers.get('Referrer', None)
        gmt_time = datetime.now(timezone.utc)

        print(
            f'os_type={user_agent.os_type}, device_type={user_agent.device_type}, time_frame={gmt_time}, page={page}, ip_address={user_ip}'
        )
        return ClientInfo(
            os_type=user_agent.os_type,
            device_type=user_agent.device_type,
            time_frame=gmt_time,
            page=page,
            ip_address=user_ip,
        )
    
    async def client(self) -> Client:
        agent_header = self.request.headers.get('User-Agent', None)
        user_agent: UserAgentInfo = UserAgentInfo(agent_header)
        
        user_ip: Optional[str] = self.request.headers.get('X-User-Ip', None)
        if user_ip is None:
            user_ip = self.request.headers.get('X-Forwarded-For', self.request.client.host)
        
        page: Optional[str] = self.request.headers.get('Referrer', None)
        
        print(
            f'os_type={user_agent.os_type}, device_type={user_agent.device_type}, page={page}, ip_address={user_ip}'
        )

        user_id: Optional[str] = None
        if self.request.cookies:
            user_id = self.request.cookies.get('user_id')
            
        if user_id is None:
            return await create_client_db(self.session())
        else:
            try:
                return await get_client_by_id_db(self.session(), int(user_id))
            except:
                raise HTTPException(status_code=400, detail="Invalid user_id format")
        
        
        

    async def refresh_user(self) -> AuthPayload | None:
        if not self.request:
            return None

        refresh = self.request.headers.get('Refresh', None)
        try:
            payload = jwt.decode(
                refresh,
                service_settings.REFRESH_TOKEN_SECRET_KEY,
                algorithms=[service_settings.ALGORITHM],
            )
            email: str = payload.get('sub')
            if email is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception
        user: User = await get_user_by_email_db(self.session(), email)
        if user is None:
            raise credentials_exception
        return AuthPayload(
            user=user,
            access_token=create_access_token(data={'sub': user.email}),
            refresh_token=refresh,
        )

    def session(self) -> Session:
        return next(get_db())


async def get_context() -> Context:
    return Context()
