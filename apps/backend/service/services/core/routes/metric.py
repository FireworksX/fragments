from datetime import datetime
from typing import List, Optional

import strawberry
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from crud.metric import get_landing_metric_by_id_db, get_landing_metrics_db
from database.models.models import LandingMetric
from .middleware import Context
from .schemas.filter import DeviceType, OSType
from .schemas.metric import LandingMetricGet


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
        created_at=metric.created_at
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Landing metric does not exist'
        )
        
    return await landing_metric_db_to_landing_metric(metric)

