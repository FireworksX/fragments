from typing import List, Optional
import datetime
import re
import random

import strawberry
from fastapi import HTTPException, status

from crud.client import (
    create_client_history_db,
    create_client_project_goal_db,
    get_last_viewed_variant_in_area_db,
    get_client_by_id_db,
    get_client_history_db,
    get_client_project_goals_by_project_and_goal_db,
    get_clients_by_project_id_db,
)
from crud.variant import get_variant_by_id_db
from crud.ipgetter import get_location_by_ip
from crud.project import (
    get_project_by_id_db,
    get_project_goal_by_target_action_db,
)
from database import Area, Campaign, Client, ClientHistory, ClientProjectGoal, ProjectGoal, Session
from database.models import Project

from .campaign import get_area_by_id_db, get_campaigns_by_area_id_db, CampaignStatus
from .middleware import ClientInfo, Context
from .project import get_user_role_in_project, project_db_to_project, project_goal_db_to_goal
from .schemas.client import ClientGet, ClientHistoryGet, ClientHistoryEventType
from .schemas.feature_flag import FragmentVariantGet, RotationType, VariantStatus
from .schemas.project import ClientProjectGoalGet
from .schemas.user import AuthPayload, RoleGet
from .schemas.release_condition import FilterType
from .fragment import fragment_db_to_fragment


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


def client_history_db_to_history(history: ClientHistory) -> ClientHistoryGet:
    return ClientHistoryGet(
        id=history.id,
        client_id=history.client_id,
        device_type=history.device_type,
        os_type=history.os_type,
        browser=history.browser,
        language=history.language,
        screen_width=history.screen_width,
        screen_height=history.screen_height,
        country=history.country,
        region=history.region,
        city=history.city,
        url=history.url,
        referrer=history.referrer,
        domain=history.domain,
        subdomain=history.subdomain,
        page_load_time=history.page_load_time,
        created_at=history.created_at.isoformat(),
        event_type=ClientHistoryEventType(history.event_type),
    )


def client_db_to_client(client: Client, history: List[ClientHistory]) -> ClientGet:
    return ClientGet(
        id=client.id,
        created_at=client.created_at.isoformat(),
        updated_at=client.updated_at.isoformat(),
        last_visited_at=client.last_visited_at.isoformat() if client.last_visited_at else None,
        history=[client_history_db_to_history(h) for h in history],
    )


async def init_client_session_route(info: strawberry.Info[Context]) -> None:
    client: Client = await info.context.client()
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    await create_client_history_db(
        db=db,
        client_id=client.id,
        device_type=client_info.device_type.value if client_info.device_type else None,
        os_type=client_info.os_type.value if client_info.os_type else None,
        browser=None,
        language=None,
        screen_width=None,
        screen_height=None,
        country=location.country,
        region=location.region,
        city=location.city,
        event_type=int(ClientHistoryEventType.INIT.value),
        url='',
        referrer='',
        domain='',
        subdomain='',
    )

    info.context.response.set_cookie(
        key='user_id',  # Cookie name to identify the client
        value=str(client.id),  # Client ID converted to string
        httponly=False,  # Prevents JavaScript access for security if True
        max_age=3600,  # Cookie expires in 1 hour (3600 seconds)
        samesite='Lax',  # Moderate CSRF protection while allowing normal navigation
    )


async def release_client_session_route(info: strawberry.Info[Context]) -> None:
    client: Client = await info.context.client()
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    await create_client_history_db(
        db=db,
        client_id=client.id,
        device_type=client_info.device_type.value if client_info.device_type else None,
        os_type=client_info.os_type.value if client_info.os_type else None,
        browser=None,
        language=None,
        screen_width=None,
        screen_height=None,
        country=location.country,
        region=location.region,
        city=location.city,
        event_type=int(ClientHistoryEventType.RELEASE.value),
        url='',
        referrer='',
        domain='',
        subdomain='',
    )

    info.context.response.set_cookie(
        key='user_id',  # Cookie name to identify the client
        value=str(client.id),  # Client ID converted to string
        httponly=False,  # Prevents JavaScript access for security if True
        max_age=3600,  # Cookie expires in 1 hour (3600 seconds)
        samesite='Lax',  # Moderate CSRF protection while allowing normal navigation
    )


async def contribute_to_project_goal_route(
    info: strawberry.Info[Context], target_action: str
) -> None:
    db: Session = info.context.session()
    client: Client = await info.context.client()
    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)
    project: Project = await info.context.project()
    project_goal: ProjectGoal = await get_project_goal_by_target_action_db(
        db, project.id, target_action
    )
    if project_goal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Project goal does not exist'
        )
    await create_client_history_db(
        db=db,
        client_id=client.id,
        device_type=client_info.device_type.value if client_info.device_type else None,
        os_type=client_info.os_type.value if client_info.os_type else None,
        browser=None,
        language=None,
        screen_width=None,
        screen_height=None,
        country=location.country,
        region=location.region,
        city=location.city,
        event_type=int(ClientHistoryEventType.CONTRIBUTE.value),
        url='',
        referrer='',
        domain='',
        subdomain='',
    )
    await create_client_project_goal_db(db, client.id, project_goal.id, project.id)


async def get_contributions_to_project_goal_route(
    info: strawberry.Info[Context], project_id: int, project_goal_id: int
) -> List[ClientProjectGoalGet]:
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view client goals',
        )

    goals: List[ClientProjectGoal] = await get_client_project_goals_by_project_and_goal_db(
        db, project_id, project_goal_id
    )

    result = []
    for goal in goals:
        client = goal.client
        client_history = goal.client.history
        project_goal = goal.project_goal

        result.append(
            ClientProjectGoalGet(
                id=goal.id,
                client=client_db_to_client(client, client_history),
                project_goal=project_goal_db_to_goal(project_goal),
                project=await project_db_to_project(info, db, project),
                created_at=goal.created_at.isoformat(),
            )
        )

    return result


async def get_clients_by_project_id_route(
    info: strawberry.Info[Context], project_id: int
) -> List[ClientGet]:
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view clients',
        )

    clients: List[Client] = await get_clients_by_project_id_db(db, project_id)
    return [client_db_to_client(c, await get_client_history_db(db, c.id)) for c in clients]


async def get_client_route(info: strawberry.Info[Context], client_id: int) -> ClientGet:
    db: Session = info.context.session()
    client: Client = await get_client_by_id_db(db, client_id)

    if client is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Client not found')

    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    return client_db_to_client(client, history)


async def get_client_history_route(
    info: strawberry.Info[Context], client_id: int
) -> List[ClientHistoryGet]:
    db: Session = info.context.session()

    client: Client = await get_client_by_id_db(db, client_id)
    if client is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Client not found')

    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    return [client_history_db_to_history(h) for h in history]


async def client_fragment_variant_route(
    info: strawberry.Info[Context], area_id: int
) -> Optional[FragmentVariantGet]:
    db: Session = info.context.session()

    client: Client = await info.context.client()
    project: Project = await info.context.project()

    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    area: Area = await get_area_by_id_db(db, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    if area.project_id != project.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view campaigns',
        )


    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(db, area_id, CampaignStatus.ACTIVE)
    best_campaign = None
    max_matched_filters = -1

    for campaign in campaigns:
        if not campaign.feature_flag or not campaign.feature_flag.release_condition:
            continue

        has_active_variant = False
        if campaign.feature_flag.variants:
            for variant in campaign.feature_flag.variants:
                if variant.status == VariantStatus.ACTIVE:
                    has_active_variant = True
                    break
        if not has_active_variant:
            continue

        for condition_set in campaign.feature_flag.release_condition.condition_sets:
            matched_filters = 0
            all_conditions_met = True

            for condition in condition_set.conditions:
                condition_met = False

                if condition.filter_type == FilterType.PAGE and condition.page_filter:
                    if client_info.page and re.match(condition.page_filter.page, client_info.page):
                        condition_met = True
                elif condition.filter_type == FilterType.DEVICE_TYPE and condition.device_type_filter:
                    if client_info.device_type and client_info.device_type.value == condition.device_type_filter.device_type:
                        condition_met = True 
                elif condition.filter_type == FilterType.OS_TYPE and condition.os_type_filter:
                    if client_info.os_type and client_info.os_type.value == condition.os_type_filter.os_type:
                        condition_met = True
                elif condition.filter_type == FilterType.GEO_LOCATION and condition.geo_location_filter:
                    if (location.country == condition.geo_location_filter.country and
                        (not condition.geo_location_filter.region or location.region == condition.geo_location_filter.region) and
                        location.city == condition.geo_location_filter.city):
                        condition_met = True
                elif condition.filter_type == FilterType.TIME_FRAME and condition.time_frame_filter:
                    current_time = datetime.now()
                    if condition.time_frame_filter.from_time <= current_time <= condition.time_frame_filter.to_time:
                        condition_met = True

                if condition_met:
                    matched_filters += 1
                else:
                    all_conditions_met = False
                    break

            if all_conditions_met and matched_filters > max_matched_filters:
                max_matched_filters = matched_filters
                best_campaign = campaign

    if not best_campaign or not best_campaign.feature_flag or not best_campaign.feature_flag.variants:
        return None
    
    fragmentVariant: Optional[FragmentVariantGet] = None

    if best_campaign.feature_flag.rotation_type == int(RotationType.KEEP.value):
        last_viewed_variant = await get_last_viewed_variant_in_area_db(db, client.id, area_id)
        if last_viewed_variant:
            variant = await get_variant_by_id_db(db, last_viewed_variant.variant_id)
            if variant:
                fragmentVariant = FragmentVariantGet(
                    fragment=fragment_db_to_fragment(variant.fragment), props=variant.props
                )
    

    if fragmentVariant is None:
        active_variants = [v for v in best_campaign.feature_flag.variants if v.status == VariantStatus.ACTIVE]
        weights = [v.rollout_percentage for v in active_variants]

        if active_variants:
            variant = random.choices(active_variants, weights=weights, k=1)[0]
            fragmentVariant = FragmentVariantGet(
                fragment=fragment_db_to_fragment(variant.fragment), props=variant.props
            )
    
    
    await create_client_history_db(
        db=db,
        client_id=client.id,
        device_type=client_info.device_type.value if client_info.device_type else None,
        os_type=client_info.os_type.value if client_info.os_type else None,
        browser=None,
        language=None,
        screen_width=None,
        screen_height=None,
        country=location.country,
        region=location.region,
        city=location.city,
        event_type=int(ClientHistoryEventType.VIEW.value),
        url='',
        referrer='',
        domain='',
        subdomain='',
        fragment_variant=fragmentVariant,
    )
        
    return fragmentVariant
