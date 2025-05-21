from typing import List

import strawberry
from fastapi import HTTPException, status

from crud.area import (
    create_area_db,
    delete_area_by_id_db,
    get_area_by_id_db,
    get_areas_by_project_id_db,
    update_area_by_id_db,
)
from crud.project import get_project_by_id_db
from database import Area, Project, Session

from .campaign import campaign_db_to_campaign
from .middleware import Context
from .schemas.area import AreaGet, AreaPatch, AreaPost
from .schemas.user import AuthPayload, RoleGet
from .user import user_db_to_user
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.DESIGNER


def area_db_to_area(area: Area) -> AreaGet:
    # Find default campaign and remove it from campaigns list
    default_campaign = None
    campaigns = []

    for campaign in area.campaigns:
        if campaign.default:
            default_campaign = campaign_db_to_campaign(campaign)
        else:
            campaigns.append(campaign_db_to_campaign(campaign))

    return AreaGet(
        id=area.id,
        area_code=area.area_code,
        name=area.name,
        project_id=area.project_id,
        description=area.description,
        author=user_db_to_user(area.author),
        campaigns=campaigns,
        default_campaign=default_campaign,
    )


async def create_area_route(info: strawberry.Info[Context], area: AreaPost) -> AreaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, area.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to create areas'
        )

    area_db: Area = await create_area_db(
        db, area.name, area.project_id, user.user.id, area.area_code, area.description
    )
    return area_db_to_area(area_db)


async def get_areas_route(info: strawberry.Info[Context], project_id: int) -> List[AreaGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to view areas'
        )

    areas: List[Area] = await get_areas_by_project_id_db(db, project_id)
    return [area_db_to_area(area) for area in areas]


async def get_area_by_id_route(info: strawberry.Info[Context], area_id: int) -> AreaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    project: Project = await get_project_by_id_db(db, area.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to view areas'
        )

    return area_db_to_area(area)


async def update_area_route(info: strawberry.Info[Context], area: AreaPatch) -> AreaGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area_db: Area = await get_area_by_id_db(db, area.id)
    if area_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area_db.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to update areas'
        )

    area_db: Area = await update_area_by_id_db(db, area.__dict__)
    return area_db_to_area(area_db)


async def delete_area_route(info: strawberry.Info[Context], area_id: int) -> None:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    permission: bool = await write_permission(db, user.user.id, area.project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not allowed to delete areas'
        )

    await delete_area_by_id_db(db, area_id)
