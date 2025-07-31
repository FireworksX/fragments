import json
from typing import List, Optional

import strawberry
from fastapi import HTTPException, UploadFile, status

from conf.settings import logger
from crud.area import (
    create_area_db,
    delete_area_by_id_db,
    get_area_by_id_db,
    get_areas_by_project_id_db,
    update_area_by_id_db,
)
from crud.media import create_media_db, delete_media_by_id_db, generate_default_media
from crud.project import get_project_by_id_db
from database import Area, Media, Project, Session

from .campaign import campaign_db_to_campaign
from .middleware import Context
from .schemas.area import AreaGet, AreaPatch, AreaPost
from .schemas.media import MediaGet, MediaType
from .schemas.user import AuthPayload, RoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking write permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def area_db_to_area(area: Area) -> AreaGet:
    logger.debug(f"Converting area {area.id} to schema")
    # Find default campaign and remove it from campaigns list
    default_campaign = None
    campaigns = []

    for campaign in area.campaigns:
        if campaign.deleted_at is not None:
            continue
        if campaign.default:
            default_campaign = campaign_db_to_campaign(campaign)
        else:
            campaigns.append(campaign_db_to_campaign(campaign))

    return AreaGet(
        id=area.id,
        area_code=area.area_code,
        project_id=area.project_id,
        description=area.description,
        author=user_db_to_user(area.author),
        campaigns=campaigns,
        default_campaign=default_campaign,
        logo=MediaGet(
            media_id=area.logo_id, media_type=MediaType.AREA_LOGO, public_path=area.logo.public_path
        ),
        properties=json.loads(area.properties) if area.properties else None,
    )


async def create_area_route(info: strawberry.Info[Context], area: AreaPost) -> AreaGet:
    logger.info(f"Creating area in project {area.project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, area.project_id)
    if project is None:
        logger.error(f"Project {area.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(
            f"User {user.user.id} unauthorized to create areas in project {area.project_id}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to create areas'
        )

    area_db: Area = await create_area_db(db, user.user.id, area)
    logger.debug(f"Created area {area_db.id}")
    return area_db_to_area(area_db)


async def get_areas_route(info: strawberry.Info[Context], project_id: int) -> List[AreaGet]:
    logger.info(f"Getting areas for project {project_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view areas in project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to view areas'
        )

    areas: List[Area] = await get_areas_by_project_id_db(db, project_id)
    logger.debug(f"Found {len(areas)} areas")
    return [area_db_to_area(area) for area in areas]


async def get_area_by_id_route(info: strawberry.Info[Context], area_id: int) -> AreaGet:
    logger.info(f"Getting area {area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    project: Project = await get_project_by_id_db(db, area.project_id)
    if project is None:
        logger.error(f"Project {area.project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to view areas'
        )

    return area_db_to_area(area)


async def update_area_route(info: strawberry.Info[Context], area: AreaPatch) -> AreaGet:
    logger.info(f"Updating area {area.id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area_db: Area = await get_area_by_id_db(db, area.id)
    if area_db is None:
        logger.error(f"Area {area.id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area_db.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to update area {area.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to update areas'
        )

    area_db = await update_area_by_id_db(db, area)
    logger.debug(f"Updated area {area_db.id}")
    return area_db_to_area(area_db)


async def delete_area_route(info: strawberry.Info[Context], area_id: int) -> None:
    logger.info(f"Deleting area {area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to delete areas'
        )

    await delete_area_by_id_db(db, area_id)
    logger.debug(f"Deleted area {area_id}")


async def add_area_logo_route(
    info: strawberry.Info[Context], file: UploadFile, area_id: int
) -> MediaGet:
    logger.info(f"Adding logo for area {area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to add logo to area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to add area logo'
        )

    media: Media = await create_media_db(db, file)
    if media is None:
        logger.error(f"Failed to create media file for area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Failed to create media file'
        )
    area.logo_id = media.id
    db.commit()
    logger.debug(f"Added logo {media.id} to area {area_id}")

    return MediaGet(
        media_id=media.id, media_type=MediaType.AREA_LOGO, public_path=media.public_path
    )


async def delete_area_logo_route(info: strawberry.Info[Context], area_id: int) -> None:
    logger.info(f"Deleting logo for area {area_id}")
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        logger.error(f"Area {area_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to delete logo from area {area_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to delete area logo',
        )

    await delete_media_by_id_db(db, area.logo_id)
    default_logo = await generate_default_media(db, f"{area.area_code}.png")
    area.logo_id = default_logo.id
    db.commit()
    logger.debug(f"Deleted logo from area {area_id} and set default logo {default_logo.id}")
