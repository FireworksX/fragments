from typing import List
import strawberry
from cfgv import ValidationError
from fastapi import HTTPException
from starlette import status
from jsonschema import validate
import json

from crud.campaign import get_campaign_by_id_db
from crud.project import get_project_by_id_db
from crud.stream import get_stream_by_id_db
from crud.stream_fragment import create_stream_fragment_db, get_stream_fragments_by_stream_id_db, \
    get_stream_fragment_by_id_db, update_stream_fragment_by_id_db
from .schemas import FragmentGet, AuthPayload, FragmentPost, ProjectGet, RoleGet, StreamFragmentPost, StreamFragmentGet, \
    StreamFragmentPatch
from .middleware import Context
from crud.fragment import create_fragment_db, Fragment, get_fragments_by_project_id_db, get_fragment_by_id_db, \
    update_fragment_by_id_db
from database import Session, Project, StreamFragment, Stream, Campaign
from .project import project_by_id
from .utils import get_user_role_in_project


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


async def write_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None and role is not RoleGet.ADMIN


async def create_stream_fragment_route(info: strawberry.Info[Context], stream_fragment_in: StreamFragmentPost) -> StreamFragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    fragment: Fragment = await get_fragment_by_id_db(db, stream_fragment_in.fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add stream fragments')

    if (stream_fragment_in.props is None and fragment.props is not None) or stream_fragment_in.props is not None and fragment.props is None:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f'Cant validate props for stream fragment')

    if stream_fragment_in.props is not None and stream_fragment_in.props is not None:
        try:
            props = json.loads(stream_fragment_in.props)
            schema = json.loads(fragment.props)
            validate(instance=props, schema=schema)
        except ValidationError as e:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                detail=f'Cant validate props for stream fragment {str(e)}')

    stream_fragment: StreamFragment = await create_stream_fragment_db(db, stream_fragment_in.name, fragment.project_id, stream_fragment_in.stream_id,
                                                                      stream_fragment_in.fragment_id, stream_fragment_in.props, stream_fragment_in.weight)
    return StreamFragmentGet(id=stream_fragment.id, name=stream_fragment.name,
                             props=stream_fragment.props, weight=stream_fragment.weight,
                             fragment_id=stream_fragment.fragment_id, stream_id=stream_fragment.stream_id)


async def stream_fragments_in_stream(info: strawberry.Info[Context], stream_id: int) -> List[StreamFragmentGet]:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream: Stream = await get_stream_by_id_db(db, stream_id)
    if stream is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stream does not exist")

    campaign: Campaign = await get_campaign_by_id_db(db, stream.campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign does not exist")

    project: Project = await get_project_by_id_db(db, campaign.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, campaign.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add stream fragments')

    stream_fragments: List[StreamFragmentGet] = await get_stream_fragments_by_stream_id_db(db, stream_id)
    out: List[StreamFragmentGet] = []
    for stream_fragment in stream_fragments:
        out.append(StreamFragmentGet(id=stream_fragment.id, name=stream_fragment.name,
                             props=stream_fragment.props, weight=stream_fragment.weight,
                             fragment_id=stream_fragment.fragment_id, stream_id=stream_fragment.stream_id))
    return out


async def stream_fragment_by_id(info: strawberry.Info[Context], stream_fragment_id: int) -> StreamFragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream_fragment: StreamFragmentGet = await get_stream_fragment_by_id_db(db, stream_fragment_id)
    if stream_fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stream Fragment does not exist")

    fragment: Fragment = await get_fragment_by_id_db(db, stream_fragment.fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add stream fragments')

    return StreamFragmentGet(id=stream_fragment.id, name=stream_fragment.name,
                             props=stream_fragment.props, weight=stream_fragment.weight,
                             fragment_id=stream_fragment.fragment_id, stream_id=stream_fragment.stream_id)


async def update_stream_fragment_route(info: strawberry.Info[Context], fg: StreamFragmentPatch) -> StreamFragmentGet:
    user: AuthPayload = await info.context.user()
    db: Session = info.context.session()

    stream_fragment: StreamFragment = await get_stream_fragment_by_id_db(db, fg.id)
    if stream_fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stream Fragment does not exist")

    fragment: Fragment = await get_fragment_by_id_db(db, stream_fragment.fragment_id)
    if fragment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fragment does not exist")

    project: Project = await get_project_by_id_db(db, fragment.project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project does not exist")

    permission: bool = await write_permission(db, user.user.id, fragment.project_id)
    if not permission:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'User is not allowed to add stream fragments')

    stream_fragment: StreamFragmentGet = await update_stream_fragment_by_id_db(db, values=fg.__dict__)

    return StreamFragmentGet(id=stream_fragment.id, name=stream_fragment.name,
                             props=stream_fragment.props, weight=stream_fragment.weight,
                             fragment_id=stream_fragment.fragment_id, stream_id=stream_fragment.stream_id)
