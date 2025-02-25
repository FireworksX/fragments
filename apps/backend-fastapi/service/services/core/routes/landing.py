from typing import List, Optional
import strawberry
from cfgv import ValidationError
from fastapi import HTTPException
from starlette import status
from jsonschema import validate
import json

from crud.campaign import get_campaign_by_id_db
from crud.project import get_project_by_id_db
from crud.stream import get_stream_by_id_db
from crud.landing import create_landing_db, get_landings_by_stream_id_db, \
    get_landing_by_id_db, update_landing_by_id_db, get_best_landing
from .fragment import fragment_by_id
from .schemas.landing import LandingGet, LandingPost, LandingPatch, ClientLanding
from .schemas.user import RoleGet, AuthPayload
from .middleware import Context
from crud.fragment import Fragment, get_fragment_by_id_db
from database import Session, Project, Landing, Stream, Campaign
from .utils import get_user_role_in_project


async def landing_db_to_landing(info, landing_db: Landing) -> LandingGet:
    return LandingGet(id=landing_db.id, name=landing_db.name,
                      props=landing_db.props, weight=landing_db.weight,
                      fragment=await fragment_by_id(info, landing_db.fragment.id), stream=landing_db.stream, active=landing_db.active,
                      deleted=landing_db.deleted)


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.ADMIN


async def create_landing_route(info: strawberry.Info[Context], landing_in: LandingPost) -> LandingGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, landing_in.stream_id)
    project_id: int = stream.project_id

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add landing')

    if landing_in.fragment_id is not None:
        fragment: Fragment = await get_fragment_by_id_db(db, landing_in.fragment_id)
        if fragment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")

        if (
                landing_in.props is None and fragment.props is not None) or landing_in.props is not None and fragment.props is None:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f'Cant validate props for landing')

        if landing_in.props is not None and fragment.props is not None:
            try:
                props = json.loads(landing_in.props)
                schema = json.loads(fragment.props)
                validate(instance=props, schema=schema)
            except ValidationError as e:
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                    detail=f'Cant validate props for landing {str(e)}')
    else:
        landing_in.active = False

    landing: Landing = await create_landing_db(db, landing_in.name, project_id, landing_in.stream_id,
                                               landing_in.fragment_id, landing_in.props, landing_in.weight, landing_in.active, landing_in.deleted)
    return await landing_db_to_landing(info, landing)


async def landings_in_stream(info: strawberry.Info[Context], stream_id: int) -> List[LandingGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, stream_id)
    if stream is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stream does not exist")

    project: Project = await get_project_by_id_db(db, stream.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, stream.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to get landings')

    landings: List[Landing] = await get_landings_by_stream_id_db(db, stream_id)
    out: List[LandingGet] = []
    for landing in landings:
        out.append(await landing_db_to_landing(info, landing))
    return out


async def landing_by_id(info: strawberry.Info[Context], landing_id: int) -> LandingGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    landing: Landing = await get_landing_by_id_db(db, landing_id)
    if landing is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Landing does not exist")

    fragment: Fragment = await get_fragment_by_id_db(db, landing.fragment.id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to get landings')

    return await landing_db_to_landing(info, landing)


async def update_landing_route(info: strawberry.Info[Context], landing_patch: LandingPatch) -> LandingGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    landing: Landing = await get_landing_by_id_db(db, landing_patch.id)
    if landing is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Landing does not exist")

    project: Project = await get_project_by_id_db(db, landing.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, landing.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to update landings')

    if landing_patch.fragment_id is not None:
        fragment: Fragment = await get_fragment_by_id_db(db, landing_patch.fragment_id)
        if fragment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")
        if landing_patch.props is not None and fragment.props is None:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f'Cant validate props for landing')

        if landing_patch.props is not None and fragment.props is not None:
            try:
                props = json.loads(landing_patch.props)
                schema = json.loads(fragment.props)
                validate(instance=props, schema=schema)
            except ValidationError as e:
                raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                    detail=f'Cant validate props for landing {str(e)}')
    else:
        if landing_patch.active is not None and landing_patch.active is True:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                detail=f'Cant activate landing without fragment')


    landing: Landing = await update_landing_by_id_db(db, values=landing_patch.__dict__)

    return await landing_db_to_landing(info, landing)


async def get_client_landing(info: strawberry.Info[Context], client_landing: ClientLanding) -> Optional[LandingGet]:
    project: Project = await info.context.project()
    db: Session = info.context.session()

    landing = await get_best_landing(db, client_landing, project.id)
    return None if landing is None else await landing_db_to_landing(info, landing)