import datetime
import json
import random
import re
from typing import List, Optional

import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from crud.area import get_area_by_code_db
from crud.client import create_client_history_db, get_last_viewed_variant_in_area_db
from crud.ipgetter import get_location_by_ip
from crud.project import get_project_goal_by_target_action_db
from crud.variant import get_variant_by_id_db
from database import Area, Campaign, Client, ProjectGoal, Session
from database.models import Project

from .campaign import CampaignStatus, get_campaigns_by_area_id_db
from .middleware import ClientInfo, Context
from .project import get_user_role_in_project
from .schemas.client import ClientAreaGet, ClientHistoryEventType, ClientHistoryPost
from .schemas.feature_flag import RotationType
from .schemas.user import RoleGet
from .schemas.variant import VariantGet, VariantStatus
from .variant import variant_db_to_variant


async def read_permission(db: Session, user_id: int, project_id: int) -> bool:
    logger.info(f"Checking read permission for user {user_id} in project {project_id}")
    role: Optional[RoleGet] = await get_user_role_in_project(db, user_id, project_id)
    return role is not None


def set_user_id_cookie(info: strawberry.Info[Context], client: Client, max_age: int = 3600) -> None:
    logger.debug(f"Setting user_id cookie for client {client.id}")
    if info.context.response:
        info.context.response.set_cookie(
            key='user_id',  # Cookie name to identify the client
            value=str(client.id),  # Client ID converted to string
            httponly=False,  # Prevents JavaScript access for security if True
            max_age=max_age,  # Cookie expires in 1 hour (3600 seconds)
            samesite='lax',  # Moderate CSRF protection while allowing normal navigation
        )


async def init_client_session_route(info: strawberry.Info[Context]) -> None:
    logger.info('Initializing client session')
    client: Client = await info.context.client()
    set_user_id_cookie(info, client, 3600)
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address if client_info.ip_address else '')

    logger.debug(f"Creating init history record for client {client.id}")
    await create_client_history_db(
        db=db,
        client_history=ClientHistoryPost(
            client_id=client.id,
            device_type=client_info.device_type.value if client_info.device_type else None,
            os_type=client_info.os_type.value if client_info.os_type else None,
            browser=client_info.browser,
            language=client_info.language,
            screen_width=client_info.screen_width,
            screen_height=client_info.screen_height,
            country=location.country,
            region=location.region,
            city=location.city,
            event_type=ClientHistoryEventType.INIT,
            url='',
            referrer='',
            domain='',
            subdomain='',
            area_id=None,
            variant_id=None,
            page=client_info.page,
        ),
    )


async def release_client_session_route(info: strawberry.Info[Context]) -> None:
    logger.info('Releasing client session')
    client: Client = await info.context.client()
    set_user_id_cookie(info, client, 3600)
    db: Session = info.context.session()
    client_info = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address if client_info.ip_address else '')

    logger.debug(f"Creating release history record for client {client.id}")
    await create_client_history_db(
        db=db,
        client_history=ClientHistoryPost(
            client_id=client.id,
            event_type=ClientHistoryEventType.RELEASE,
            device_type=client_info.device_type.value if client_info.device_type else None,
            os_type=client_info.os_type.value if client_info.os_type else None,
            browser=client_info.browser,
            language=client_info.language,
            screen_width=client_info.screen_width,
            screen_height=client_info.screen_height,
            country=location.country,
            region=location.region,
            city=location.city,
            url='',
            referrer='',
            domain='',
            subdomain='',
            area_id=None,
            variant_id=None,
            page=client_info.page,
        ),
    )


async def contribute_to_project_goal_route(
    info: strawberry.Info[Context], target_action: str
) -> None:
    logger.info(f"Contributing to project goal with target action: {target_action}")
    db: Session = info.context.session()
    client: Client = await info.context.client()
    set_user_id_cookie(info, client, 3600)
    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address if client_info.ip_address else '')
    project: Project = await info.context.project()
    project_goal: Optional[ProjectGoal] = await get_project_goal_by_target_action_db(
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
        client_history=ClientHistoryPost(
            client_id=client.id,
            event_type=ClientHistoryEventType.GOAL_CONTRIBUTE,
            device_type=client_info.device_type.value if client_info.device_type else None,
            os_type=client_info.os_type.value if client_info.os_type else None,
            browser=client_info.browser,
            language=client_info.language,
            screen_width=client_info.screen_width,
            screen_height=client_info.screen_height,
            country=location.country,
            region=location.region,
            city=location.city,
            url='',
            referrer='',
            domain='',
            subdomain='',
            area_id=None,
            variant_id=None,
            goal_id=project_goal.id,
            page=client_info.page,
        ),
    )


async def client_area_route(
    info: strawberry.Info[Context], area_code: str
) -> Optional[ClientAreaGet]:
    logger.info(f"Getting area variant for area code {area_code}")
    db: Session = info.context.session()

    client: Client = await info.context.client()
    set_user_id_cookie(info, client, 3600)
    project: Project = await info.context.project()

    if project is None:
        logger.error(f"Project not found for client {client.id}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project not found')

    client_info: ClientInfo = await info.context.client_info()
    location = get_location_by_ip(client_info.ip_address if client_info.ip_address else '')

    area: Optional[Area] = await get_area_by_code_db(db, area_code)
    if area is None:
        logger.error(f"Area with code {area_code} not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Area does not exist')

    if area.project_id != project.id:
        logger.warning(f"Area {area_code} does not belong to project {project.id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='User is not allowed to view campaigns',
        )

    logger.debug(f"Getting active campaigns for area {area.id}")
    campaigns: List[Campaign] = await get_campaigns_by_area_id_db(
        db, area.id, CampaignStatus.ACTIVE
    )
    best_campaign = None
    max_matched_filters = -1
    logger.debug('Starting campaign selection process')

    for campaign in campaigns:
        logger.debug(f"Evaluating campaign {campaign.id}")
        if not campaign.feature_flag or not campaign.feature_flag.release_condition:
            logger.debug(
                f"Campaign {campaign.id} has no feature flag or release condition, skipping"
            )
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

                if condition.page_filters:
                    if client_info.page:
                        for page_filter in condition.page_filters:
                            if re.match(page_filter.page, client_info.page):
                                logger.debug(
                                    f"Page condition met: {client_info.page} matches {page_filter.page}"
                                )
                                condition_met = True
                                break
                if condition.device_type_filters:
                    if client_info.device_type:
                        for device_type_filter in condition.device_type_filters:
                            if int(client_info.device_type.value) == device_type_filter.device_type:
                                logger.debug(
                                    f"Device type condition met: {client_info.device_type.value}"
                                )
                                condition_met = True
                                break
                if condition.os_type_filters:
                    if client_info.os_type:
                        for os_type_filter in condition.os_type_filters:
                            if int(client_info.os_type.value) == os_type_filter.os_type:
                                logger.debug(f"OS type condition met: {client_info.os_type.value}")
                                condition_met = True
                                break
                if condition.geo_location_filters:
                    for geo_location_filter in condition.geo_location_filters:
                        if (
                            location.country == geo_location_filter.country
                            and (
                                not geo_location_filter.region
                                or location.region == geo_location_filter.region
                            )
                            and (
                                not geo_location_filter.city
                                or location.city == geo_location_filter.city
                            )
                        ):
                            logger.debug(
                                f"Geo location condition met: {location.country}/{location.region}/{location.city}"
                            )
                            condition_met = True
                            break
                if condition.time_frame_filters:
                    current_time = datetime.datetime.now(datetime.UTC)
                    for time_frame_filter in condition.time_frame_filters:
                        if time_frame_filter.from_time <= current_time <= time_frame_filter.to_time:
                            logger.debug(f"Time frame condition met: current time {current_time}")
                            condition_met = True
                            break

                if condition_met:
                    matched_filters += 1
                    logger.debug(f"Condition met, matched filters now: {matched_filters}")
                else:
                    all_conditions_met = False
                    logger.debug('Condition not met, breaking condition evaluation')
                    break

            if all_conditions_met and matched_filters > max_matched_filters:
                logger.debug(
                    f"New best campaign found: {campaign.id} with {matched_filters} matched filters"
                )
                max_matched_filters = matched_filters
                best_campaign = campaign

    if (
        not best_campaign
        or not best_campaign.feature_flag
        or not best_campaign.feature_flag.variants
    ):
        logger.debug('No suitable campaign found')
        return None

    variantFragment: Optional[VariantGet] = None

    if best_campaign.feature_flag.rotation_type == int(RotationType.KEEP.value):
        logger.debug('Using KEEP rotation type - checking last viewed variant')
        last_viewed_variant = await get_last_viewed_variant_in_area_db(
            db, client.id, area.id, best_campaign.id
        )
        if last_viewed_variant:
            variant = await get_variant_by_id_db(db, last_viewed_variant.variant_id)
            if variant:
                variantFragment = variant_db_to_variant(variant)

    if variantFragment is None:
        logger.debug('Selecting random variant based on weights')
        active_variants = [
            v
            for v in best_campaign.feature_flag.variants
            if v.status == int(VariantStatus.ACTIVE.value)
        ]
        weights = [v.rollout_percentage for v in active_variants]

        if active_variants:
            variant = random.choices(active_variants, weights=weights, k=1)[0]
            variantFragment = variant_db_to_variant(variant)

    if variantFragment:
        logger.debug(
            f"Creating view history record for client {client.id} and variant {variantFragment.id}"
        )
        await create_client_history_db(
            db=db,
            client_history=ClientHistoryPost(
                client_id=client.id,
                event_type=ClientHistoryEventType.VIEW,
                device_type=client_info.device_type.value if client_info.device_type else None,
                os_type=client_info.os_type.value if client_info.os_type else None,
                browser=client_info.browser,
                language=client_info.language,
                screen_width=client_info.screen_width,
                screen_height=client_info.screen_height,
                country=location.country,
                region=location.region,
                city=location.city,
                url='',
                referrer='',
                domain='',
                subdomain='',
                area_id=area.id,
                variant_id=variantFragment.id,
                campaign_id=best_campaign.id,
                feature_flag_id=best_campaign.feature_flag.id,
                page=client_info.page,
            ),
        )

        if (
            variantFragment.fragment
            and variantFragment.fragment.fragment
            and variantFragment.fragment.fragment.linked_goals
        ):
            logger.debug(
                f"Creating goal view history records for {len(variantFragment.fragment.fragment.linked_goals)} goals"
            )
            for goal_id in variantFragment.fragment.fragment.linked_goals:
                await create_client_history_db(
                    db=db,
                    client_history=ClientHistoryPost(
                        client_id=client.id,
                        event_type=ClientHistoryEventType.GOAL_VIEW,
                        device_type=(
                            client_info.device_type.value if client_info.device_type else None
                        ),
                        os_type=client_info.os_type.value if client_info.os_type else None,
                        browser=client_info.browser,
                        language=client_info.language,
                        screen_width=client_info.screen_width,
                        screen_height=client_info.screen_height,
                        country=location.country,
                        region=location.region,
                        city=location.city,
                        url='',
                        referrer='',
                        domain='',
                        subdomain='',
                        area_id=area.id,
                        variant_id=variantFragment.id,
                        campaign_id=best_campaign.id,
                        feature_flag_id=best_campaign.feature_flag.id,
                        goal_id=goal_id,
                        page=client_info.page,
                    ),
                )

        return ClientAreaGet(
            variant=variantFragment,
            area_properties=json.loads(area.properties) if area.properties else None,
        )
    return None
