from datetime import datetime
from typing import List, Optional

import strawberry
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from crud.ipgetter import get_location_by_ip
from crud.metric import (
    create_landing_metric_db,
    get_landing_metric_by_id_db,
    get_landing_metrics_db,
)
from crud.project import Project
from database.models.models import LandingMetric

from .middleware import Context
from .schemas.filter import DeviceType, OSType
from .schemas.landing import ClientInfo
from .schemas.metric import LandingMetricGet, LandingMetricPost


async def landing_metric_db_to_landing_metric(metric: LandingMetric) -> LandingMetricGet:
    return LandingMetricGet(
        id=metric.id,
        landing_id=metric.landing_id,
        campaign_id=metric.campaign_id,
        url=metric.url,
        referrer=metric.referrer,
        domain=metric.domain,
        subdomain=metric.subdomain,
        page_load_time=metric.page_load_time,
        device_type=metric.device_type,
        os_type=metric.os_type,
        browser=metric.browser,
        language=metric.language,
        screen_width=metric.screen_width,
        screen_height=metric.screen_height,
        country=metric.country,
        region=metric.region,
        city=metric.city,
        created_at=metric.created_at,
        event=metric.event,
    )


async def get_landing_metrics(
    info: strawberry.Info[Context], landing_id: Optional[int] = None
) -> List[LandingMetricGet]:
    project: Project = await info.context.project()
    db: Session = info.context.session()
    metrics = await get_landing_metrics_db(db, landing_id)
    return [await landing_metric_db_to_landing_metric(metric) for metric in metrics]


async def get_landing_metric(
    info: strawberry.Info[Context], metric_id: int
) -> Optional[LandingMetricGet]:
    project: Project = await info.context.project()
    db: Session = info.context.session()
    metric = await get_landing_metric_by_id_db(db, metric_id)

    if metric is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Landing metric does not exist'
        )

    return await landing_metric_db_to_landing_metric(metric)


async def create_landing_metric(
    info: strawberry.Info[Context], metric: LandingMetricPost
) -> LandingMetricGet:
    client_landing: ClientInfo = await info.context.client_info()
    project: Project = await info.context.project()
    db: Session = info.context.session()
    location = get_location_by_ip(client_landing.ip_address)
    metric = await create_landing_metric_db(
        db=db,
        landing_id=metric.landing_id,
        campaign_id=metric.campaign_id,
        url=metric.url,
        domain=metric.domain,
        subdomain=metric.subdomain,
        page_load_time=metric.page_load_time,
        device_type=client_landing.device_type.value if client_landing.device_type else None,
        os_type=client_landing.os_type.value if client_landing.os_type else None,
        country=location.country,
        region=location.region,
        city=location.city,
        browser=metric.browser,
        language=metric.language,
        screen_width=metric.screen_width,
        screen_height=metric.screen_height,
        event=metric.event,
    )
    return await landing_metric_db_to_landing_metric(metric)
