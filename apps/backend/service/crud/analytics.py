from datetime import UTC, datetime, timedelta
from typing import List, Optional, Tuple

from sqlalchemy import func
from sqlalchemy.orm import Session

from conf.settings import logger
from database.models import ClientHistory
from services.core.routes.schemas.client import ClientHistoryEventType
from services.core.routes.schemas.campaign import CampaignStatsGet
from services.core.routes.schemas.variant import VariantStatsGet


async def get_variant_stats_db(
    db: Session,
    area_id: int,
    variant_id: int,
    from_ts: Optional[datetime] = None,
    to_ts: Optional[datetime] = None
) -> VariantStatsGet:
    """
    Get view statistics for a variant in an area between timestamps
    Returns VariantStatsGet
    
    Args:
        from_ts: Start timestamp, defaults to 24h ago
        to_ts: End timestamp, defaults to now
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    logger.debug(
        f"Getting stats for variant {variant_id} in area {area_id} "
        f"from {from_ts} to {to_ts}"
    )

    # Get total views for all variants in this area
    total_views = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= from_ts,
        ClientHistory.created_at <= to_ts
    ).count()

    if total_views == 0:
        return VariantStatsGet(
            last_views=0,
            total_views=0,
            percentage=0.0
        )

    # Get views for this variant in the period
    views_period = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.variant_id == variant_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= from_ts,
        ClientHistory.created_at <= to_ts
    ).count()

    percentage = (views_period / total_views) * 100

    logger.debug(
        f"Variant {variant_id} stats: views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return VariantStatsGet(
        last_views=views_period,
        total_views=total_views,
        percentage=percentage
    )

async def get_campaign_stats_db(
    db: Session, area_id: int, campaign_id: int, from_ts: Optional[datetime] = None, to_ts: Optional[datetime] = None
) -> CampaignStatsGet:
    """
    Get view statistics for a campaign in an area
    Returns CampaignStatsGet
    """
    if to_ts is None:
        to_ts = datetime.now(UTC)
    if from_ts is None:
        from_ts = to_ts - timedelta(hours=24)

    logger.debug(
        f"Getting stats for campaign {campaign_id} in area {area_id} "
        f"from {from_ts} to {to_ts}"
    )

    total_views = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= from_ts,
        ClientHistory.created_at <= to_ts
    ).count()

    if total_views == 0:
        return CampaignStatsGet(
            last_views=0,
            total_views=0,
            percentage=0.0
        )
    
    views_period = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.campaign_id == campaign_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= from_ts,
        ClientHistory.created_at <= to_ts
    ).count()
    
    percentage = (views_period / total_views) * 100
    
    logger.debug(
        f"Campaign {campaign_id} stats: views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return CampaignStatsGet(
        last_views=views_period,
        total_views=total_views,
        percentage=percentage
    )