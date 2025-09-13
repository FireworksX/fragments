from datetime import datetime, timezone
from typing import Optional

import jwt
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError
from strawberry.fastapi import BaseContext
from user_agents import parse as user_agent_parser

from conf.settings import logger, service_settings
from crud.client import create_client_db, get_client_by_id_db
from crud.project import validate_project_public_api_key
from crud.user import get_user_by_email_db
from database import Session
from database.models import Client, Project, User
from services.core.utils import create_access_token, create_refresh_token
from services.dependencies import get_db

from .schemas.client import ClientInfo
from .schemas.media import MediaGet, MediaType
from .schemas.release_condition import DeviceType, OSType
from .schemas.user import AuthPayload, UserGet

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate credentials',
    headers={'Authorization': 'token'},
)


def user_db_to_user(user: User) -> UserGet:
    return UserGet(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        logo=MediaGet(
            media_id=user.avatar_id,
            media_type=MediaType.USER_LOGO,
            public_path=user.avatar.public_path,
        ),
    )


class UserAgentInfo:
    device_type: Optional[DeviceType] = None
    os_type: Optional[OSType] = None
    browser: Optional[str] = None

    def __init__(self, user_agent: str) -> None:
        user_agent_info = user_agent_parser(user_agent)
        if user_agent_info.is_mobile:
            self.device_type = DeviceType.MOBILE
        elif user_agent_info.is_tablet:
            self.device_type = DeviceType.TABLET
        elif user_agent_info.is_pc:
            self.device_type = DeviceType.DESKTOP
        else:
            logger.warning('Unknown device type: %s', user_agent_info)
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
            logger.warning('Unknown OS type: %s', user_agent_info)
            self.os_type = None

        self.browser = user_agent_info.browser.family


class Context(BaseContext):
    def _extract_authorization_header(self) -> tuple[str, Optional[str]]:
        """Validate and extract authorization header and refresh token."""
        if not self.request:
            logger.warning('No request object provided')
            raise credentials_exception

        authorization = self.request.headers.get('Authorization', None)
        refresh = self.request.headers.get('Refresh', None)

        if authorization is None:
            logger.warning('No authorization header provided')
            raise credentials_exception

        return authorization, refresh

    def _decode_token(self, authorization: str) -> str:
        """Decode JWT token and extract email."""
        try:
            token = authorization.split(' ')[1]  # format is 'Bearer token'
            payload = jwt.decode(
                token,
                service_settings.ACCESS_TOKEN_SECRET_KEY,
                algorithms=[service_settings.ALGORITHM],
            )
            email: str = payload.get('sub')
            if email is None:
                logger.error('No email in token payload')
                raise credentials_exception
            return email
        except InvalidTokenError as exc:
            logger.error('Invalid token provided')
            raise credentials_exception from exc
        except IndexError as exc:
            logger.error('Malformed authorization header')
            raise credentials_exception from exc

    async def user(self) -> AuthPayload:
        authorization, refresh = self._extract_authorization_header()
        email = self._decode_token(authorization)

        user: Optional[User] = await get_user_by_email_db(self.session(), email)
        if user is None:
            logger.error('User not found: %s', email)
            raise credentials_exception

        if refresh is None:
            refresh = create_refresh_token(data={'sub': user.email})

        logger.info('User authenticated: %s', email)
        return AuthPayload(
            user=user_db_to_user(user), access_token=authorization, refresh_token=refresh
        )

    async def project(self) -> Project:
        if not self.request:
            logger.warning('No request object provided')
            raise credentials_exception

        authorization = self.request.headers.get('Authorization', None)
        if authorization is None:
            logger.warning('No authorization header provided')
            raise credentials_exception

        try:
            public_key = authorization.split(' ')[1]  # format is 'Bearer token'
            project: Project = await validate_project_public_api_key(self.session(), public_key)
        except IndexError as exc:
            logger.error('Malformed authorization header')
            raise credentials_exception from exc
        except ValueError as exc:
            logger.error('Invalid public key format')
            raise credentials_exception from exc

        logger.info('Project authenticated: %s', project.id)
        return project

    async def client_info(self) -> ClientInfo:
        agent_header = self.request.headers.get('User-Agent', None) if self.request else None
        user_agent: UserAgentInfo = UserAgentInfo(agent_header if agent_header else '')

        user_ip: Optional[str] = (
            self.request.headers.get('X-User-Ip', None) if self.request else None
        )
        if user_ip is None:
            if (
                self.request
                and self.request.client
                and self.request.client.host
                and self.request.headers
            ):
                user_ip = self.request.headers.get('X-Forwarded-For', self.request.client.host)
            else:
                user_ip = ''
        page: Optional[str] = self.request.headers.get('Referrer', None) if self.request else None
        gmt_time = datetime.now(timezone.utc)

        language = self.request.headers.get('Accept-Language', None) if self.request else None
        try:
            if self.request:
                screen_width = int(self.request.headers.get('Screen-Width', None) or 0)
                screen_height = int(self.request.headers.get('Screen-Height', None) or 0)
            else:
                screen_width = None
                screen_height = None
        except ValueError:
            screen_width = None
            screen_height = None
        browser = user_agent.browser
        logger.info(
            'Client info - os_type=%s, device_type=%s, time_frame=%s, page=%s, ip_address=%s, browser=%s, language=%s, screen_width=%s, screen_height=%s',
            user_agent.os_type,
            user_agent.device_type,
            gmt_time,
            page,
            user_ip,
            browser,
            language,
            screen_width,
            screen_height,
        )
        return ClientInfo(
            os_type=user_agent.os_type,
            device_type=user_agent.device_type,
            time_frame=gmt_time,
            page=page,
            ip_address=user_ip,
            browser=browser,
            language=language,
            screen_width=screen_width,
            screen_height=screen_height,
        )

    async def client(self) -> Client:
        project: Project = await self.project()

        user_id: Optional[str] = None
        if self.request and self.request.cookies:
            user_id = self.request.cookies.get('user_id')

        if user_id is None:
            logger.info('Creating new client for project %s', project.id)
            return await create_client_db(self.session(), project_id=project.id)
        try:
            logger.info('Getting existing client %s', user_id)
            client: Optional[Client] = await get_client_by_id_db(self.session(), int(user_id))
            if client is None:
                return await create_client_db(self.session(), project_id=project.id)
            return client
        except ValueError as exc:
            logger.error('Invalid user_id format: %s', user_id)
            raise HTTPException(status_code=400, detail='Invalid user_id format') from exc

    async def refresh_user(self) -> AuthPayload:
        if not self.request:
            raise credentials_exception

        refresh = self.request.headers.get('Refresh', None)
        if refresh is None:
            raise credentials_exception
        try:
            payload = jwt.decode(
                refresh,
                service_settings.REFRESH_TOKEN_SECRET_KEY,
                algorithms=[service_settings.ALGORITHM],
            )
            email: str = payload.get('sub')
            if email is None:
                logger.error('No email in refresh token payload')
                raise credentials_exception
        except InvalidTokenError as exc:
            logger.error('Invalid refresh token')
            raise credentials_exception from exc
        user: Optional[User] = await get_user_by_email_db(self.session(), email)
        if user is None:
            logger.error('User not found: %s', email)
            raise credentials_exception
        logger.info('User refreshed: %s', email)
        return AuthPayload(
            user=user_db_to_user(user),
            access_token=create_access_token(data={'sub': user.email}),
            refresh_token=refresh,
        )

    def session(self) -> Session:
        return next(get_db())


async def get_context() -> Context:
    return Context()
