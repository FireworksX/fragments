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
    db: Session, area_id: int, variant_id: int, period: timedelta = timedelta(hours=24)
) -> VariantStatsGet:
    """
    Get view statistics for a variant in an area
    Returns VariantStatsGet
    """
    logger.debug(f"Getting stats for variant {variant_id} in area {area_id} for period {period}")

    # Get total views for all variants in this area
    total_views = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value)
    ).count()

    if total_views == 0:
        return VariantStatsGet(
            last_views=0,
            total_views=0,
            percentage=0.0
        )

    # Get views in last period
    period_ago = datetime.now(UTC) - period
    
    views_period = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.variant_id == variant_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= period_ago
    ).count()

    percentage = (views_period / total_views) * 100

    logger.debug(
        f"Variant {variant_id} stats: {period} views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return VariantStatsGet(
        last_views=views_period,
        total_views=total_views,
        percentage=percentage
    )

async def get_campaign_stats_db(
    db: Session, area_id: int, campaign_id: int, period: timedelta = timedelta(hours=24)
) -> CampaignStatsGet:
    """
    Get view statistics for a campaign in an area
    Returns CampaignStatsGet
    """
    logger.debug(f"Getting stats for campaign {campaign_id} in area {area_id} for period {period}")

    total_views = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value)
    ).count()

    if total_views == 0:
        return CampaignStatsGet(
            last_views=0,
            total_views=0,
            percentage=0.0
        )
    
    period_ago = datetime.now(UTC) - period
    
    views_period = db.query(ClientHistory).filter(
        ClientHistory.area_id == area_id,
        ClientHistory.campaign_id == campaign_id,
        ClientHistory.event_type == int(ClientHistoryEventType.VIEW.value),
        ClientHistory.created_at >= period_ago
    ).count()
    
    percentage = (views_period / total_views) * 100
    
    logger.debug(
        f"Campaign {campaign_id} stats: {period} views={views_period}, "
        f"total views={total_views}, percentage={percentage:.1f}%"
    )

    return CampaignStatsGet(
        last_views=views_period,
        total_views=total_views,
        percentage=percentage
    )