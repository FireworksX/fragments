from typing import List, Optional

from sqlalchemy.orm import Session

from database.models.models import LandingMetric


async def create_landing_metric_db(
    db: Session,
    landing_id: Optional[int] = None,
    campaign_id: Optional[int] = None,
    url: Optional[str] = None,
    domain: Optional[str] = None,
    device_type: Optional[int] = None,
    referrer: Optional[str] = None,
    subdomain: Optional[str] = None,
    page_load_time: Optional[float] = None,
    os_type: Optional[int] = None,
    browser: Optional[str] = None,
    language: Optional[str] = None,
    screen_width: Optional[int] = None,
    screen_height: Optional[int] = None,
    country: Optional[str] = None,
    region: Optional[str] = None,
    city: Optional[str] = None,
    event: Optional[str] = None,
) -> LandingMetric:
    db_metric = LandingMetric(
        landing_id=landing_id,
        campaign_id=campaign_id,
        url=url,
        referrer=referrer,
        domain=domain,
        subdomain=subdomain,
        page_load_time=page_load_time,
        device_type=device_type,
        os_type=os_type,
        browser=browser,
        language=language,
        screen_width=screen_width,
        screen_height=screen_height,
        country=country,
        region=region,
        city=city,
        event=event,
    )
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric


async def get_landing_metric_by_id_db(db: Session, metric_id: int) -> Optional[LandingMetric]:
    return db.query(LandingMetric).filter(LandingMetric.id == metric_id).first()


async def get_landing_metrics_db(db: Session, skip: int = 0, limit: int = 100) -> List[LandingMetric]:
    return db.query(LandingMetric).offset(skip).limit(limit).all()


async def get_landing_metrics_by_landing_db(
    db: Session, landing_id: int, skip: int = 0, limit: int = 100
) -> List[LandingMetric]:
    return (
        db.query(LandingMetric)
        .filter(LandingMetric.landing_id == landing_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


async def get_landing_metrics_by_campaign(
    db: Session, campaign_id: int, skip: int = 0, limit: int = 100
) -> List[LandingMetric]:
    return (
        db.query(LandingMetric)
        .filter(LandingMetric.campaign_id == campaign_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


async def delete_landing_metric(db: Session, metric_id: int) -> bool:
    metric = db.query(LandingMetric).filter(LandingMetric.id == metric_id).first()
    if metric:
        db.delete(metric)
        db.commit()
        return True
    return False
