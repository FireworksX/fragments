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

from crud.area import get_area_by_code_db

from .campaign import get_campaigns_by_area_id_db, CampaignStatus
from .middleware import ClientInfo, Context
from .project import get_user_role_in_project, project_db_to_project, project_goal_db_to_goal
from .schemas.client import ClientGet, ClientHistoryGet, ClientHistoryEventType
from .schemas.feature_flag import FragmentVariantGet, RotationType, VariantGet, VariantStatus
from .schemas.project import ClientProjectGoalGet
from .schemas.user import AuthPayload, RoleGet
from .schemas.release_condition import FilterType
from .fragment import fragment_db_to_fragment
from .variant import variant_db_to_variant
from .area import area_db_to_area
from conf.settings import logger


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: RoleGet = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


def client_history_db_to_history(history: ClientHistory) -> ClientHistoryGet:
    logger.debug(f"Converting client history {history.id} to schema")
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
        area = area_db_to_area(history.area) if history.area else None,
        variant = variant_db_to_variant(history.variant) if history.variant else None
    )


def client_db_to_client(client: Client, history: List[ClientHistory]) -> ClientGet:
    logger.debug(f"Converting client {client.id} to schema with {len(history)} history records")
    return ClientGet(
        id=client.id,
        created_at=client.created_at.isoformat(),
        updated_at=client.updated_at.isoformat(),
        last_visited_at=client.last_visited_at.isoformat() if client.last_visited_at else None,
        history=[client_history_db_to_history(h) for h in history],
    )


async def init_client_session_route(info: strawberry.Info[Context]) -> None:
    logger.info("Initializing client session")
    client: Client = await info.context.client()
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    logger.debug(f"Creating init history record for client {client.id}")
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
        area_id=None,
        variant_id=None,
    )

    logger.debug(f"Setting user_id cookie for client {client.id}")
    info.context.response.set_cookie(
        key='user_id',  # Cookie name to identify the client
        value=str(client.id),  # Client ID converted to string
        httponly=False,  # Prevents JavaScript access for security if True
        max_age=3600,  # Cookie expires in 1 hour (3600 seconds)
        samesite='Lax',  # Moderate CSRF protection while allowing normal navigation
    )


async def release_client_session_route(info: strawberry.Info[Context]) -> None:
    logger.info("Releasing client session")
    client: Client = await info.context.client()
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    logger.debug(f"Creating release history record for client {client.id}")
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
        area_id=None,
        variant_id=None,
    )

    logger.debug(f"Setting user_id cookie for client {client.id}")
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
    logger.info(f"Contributing to project goal with target action: {target_action}")
    db: Session = info.context.session()
    client: Client = await info.context.client()
    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)
    project: Project = await info.context.project()
    project_goal: ProjectGoal = await get_project_goal_by_target_action_db(
        db, project.id, target_action
    )
    if project_goal is None:
        logger.error(f"Project goal not found for target action {target_action}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Project goal does not exist'
        )
    
    logger.debug(f"Creating contribute history record for client {client.id}")
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
        area_id=None,
        variant_id=None,
    )
    
    logger.debug(f"Creating client project goal record for client {client.id}")
    await create_client_project_goal_db(db, client.id, project_goal.id, project.id)


async def get_contributions_to_project_goal_route(
    info: strawberry.Info[Context], project_id: int, project_goal_id: int
) -> List[ClientProjectGoalGet]:
    logger.info(f"Getting contributions for project {project_id} and goal {project_goal_id}")
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view client goals for project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view client goals',
        )

    goals: List[ClientProjectGoal] = await get_client_project_goals_by_project_and_goal_db(
        db, project_id, project_goal_id
    )

    logger.debug(f"Found {len(goals)} contributions")
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
    logger.info(f"Getting clients for project {project_id}")
    db: Session = info.context.session()
    user: AuthPayload = await info.context.user()

    project: Project = await get_project_by_id_db(db, project_id)
    if project is None:
        logger.error(f"Project {project_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project does not exist')

    permission: bool = await read_permission(db, user.user.id, project_id)
    if not permission:
        logger.warning(f"User {user.user.id} unauthorized to view clients for project {project_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view clients',
        )

    clients: List[Client] = await get_clients_by_project_id_db(db, project_id)
    logger.debug(f"Found {len(clients)} clients")
    return [client_db_to_client(c, await get_client_history_db(db, c.id)) for c in clients]


async def get_client_route(info: strawberry.Info[Context], client_id: int) -> ClientGet:
    logger.info(f"Getting client {client_id}")
    db: Session = info.context.session()
    client: Client = await get_client_by_id_db(db, client_id)

    if client is None:
        logger.error(f"Client {client_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Client not found')

    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    logger.debug(f"Found {len(history)} history records for client {client_id}")
    return client_db_to_client(client, history)


async def get_client_history_route(
    info: strawberry.Info[Context], client_id: int
) -> List[ClientHistoryGet]:
    logger.info(f"Getting history for client {client_id}")
    db: Session = info.context.session()

    client: Client = await get_client_by_id_db(db, client_id)
    if client is None:
        logger.error(f"Client {client_id} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Client not found')

    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    logger.debug(f"Found {len(history)} history records")
    return [client_history_db_to_history(h) for h in history]


async def client_area_route(
    info: strawberry.Info[Context], area_code: str
) -> Optional[VariantGet]:
    logger.info(f"Getting area variant for area code {area_code}")
    db: Session = info.context.session()

    client: Client = await info.context.client()
    project: Project = await info.context.project()

    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address)

    area: Area = await get_area_by_code_db(db, area_code)
    if area is None:
        logger.error(f"Area with code {area_code} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    if area.project_id != project.id:
        logger.warning(f"Area {area_code} does not belong to project {project.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'User is not allowed to view campaigns',
        )

    logger.debug(f"Getting active campaigns for area {area.id}")
    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(db, area.id, CampaignStatus.ACTIVE)
    best_campaign = None
    max_matched_filters = -1
    logger.debug("Starting campaign selection process")

    for campaign in campaigns:
        logger.debug(f"Evaluating campaign {campaign.id}")
        if not campaign.feature_flag or not campaign.feature_flag.release_condition:
            logger.debug(f"Campaign {campaign.id} has no feature flag or release condition, skipping")
            continue

        has_active_variant = False
        if campaign.feature_flag.variants:
            for variant in campaign.feature_flag.variants:
                if variant.status == int(VariantStatus.ACTIVE.value):
                    has_active_variant = True
                    logger.debug(f"Found active variant in campaign {campaign.id}")
                    break
        if not has_active_variant:
            logger.debug(f"Campaign {campaign.id} has no active variants, skipping")
            continue

        if campaign.default is True:
            logger.debug(f"Campaign {campaign.id} is default, setting as fallback")
            best_campaign = campaign
        
        for condition_set in campaign.feature_flag.release_condition.condition_sets:
            matched_filters = 0
            all_conditions_met = True
            logger.debug(f"Evaluating condition set for campaign {campaign.id}")

            for condition in condition_set.conditions:
                condition_met = False

                if condition.pages:
                    if client_info.page:
                        for page in condition.pages:
                            if re.match(page, client_info.page):
                                logger.debug(f"Page condition met: {client_info.page} matches {page}")
                                condition_met = True
                                break
                elif condition.device_types:
                    if client_info.device_type and client_info.device_type.value in condition.device_types:
                        logger.debug(f"Device type condition met: {client_info.device_type.value}")
                        condition_met = True 
                elif condition.os_types:
                    if client_info.os_type and client_info.os_type.value in condition.os_types:
                        logger.debug(f"OS type condition met: {client_info.os_type.value}")
                        condition_met = True
                elif condition.geo_locations:
                    for geo_location in condition.geo_locations:
                        if (location.country == geo_location.country and
                            (not geo_location.region or location.region == geo_location.region) and
                            (not geo_location.city or location.city == geo_location.city)):
                            logger.debug(f"Geo location condition met: {location.country}/{location.region}/{location.city}")
                            condition_met = True
                            break
                elif condition.time_frames:
                    current_time = datetime.now()
                    for time_frame in condition.time_frames:
                        if time_frame.from_time <= current_time <= time_frame.to_time:
                            logger.debug(f"Time frame condition met: current time {current_time}")
                            condition_met = True
                            break

                if condition_met:
                    matched_filters += 1
                    logger.debug(f"Condition met, matched filters now: {matched_filters}")
                else:
                    all_conditions_met = False
                    logger.debug("Condition not met, breaking condition evaluation")
                    break

            if all_conditions_met and matched_filters > max_matched_filters:
                logger.debug(f"New best campaign found: {campaign.id} with {matched_filters} matched filters")
                max_matched_filters = matched_filters
                best_campaign = campaign

    if not best_campaign or not best_campaign.feature_flag or not best_campaign.feature_flag.variants:
        logger.debug("No suitable campaign found")
        return None
    
    variantFragment: Optional[VariantGet] = None

    if best_campaign.feature_flag.rotation_type == int(RotationType.KEEP.value):
        logger.debug("Using KEEP rotation type - checking last viewed variant")
        last_viewed_variant = await get_last_viewed_variant_in_area_db(db, client.id, area.id)
        if last_viewed_variant:
            variant = await get_variant_by_id_db(db, last_viewed_variant.variant_id)
            if variant:
                variantFragment = variant_db_to_variant(variant)
    

    if variantFragment is None:
        logger.debug("Selecting random variant based on weights")
        active_variants = [v for v in best_campaign.feature_flag.variants if v.status == int(VariantStatus.ACTIVE.value)]
        weights = [v.rollout_percentage for v in active_variants]

        if active_variants:
            variant = random.choices(active_variants, weights=weights, k=1)[0]
            variantFragment = variant_db_to_variant(variant)
    
    if variantFragment:
        logger.debug(f"Creating view history record for client {client.id} and variant {variantFragment.id}")
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
            area_id=area.id,
            variant_id=variantFragment.id
        )
        
    return variantFragment
