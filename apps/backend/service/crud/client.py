from datetime import UTC, datetime
from typing import Optional

from conf.settings import logger
from database import Client, ClientHistory, Session
from services.core.routes.schemas.client import ClientHistoryPost


async def create_client_db(db: Session, project_id: int) -> Client:
    logger.info(f"Creating new client for project_id={project_id}")
    client = Client(project_id=project_id)
    db.add(client)
    db.commit()
    db.refresh(client)
    logger.debug(f"Created client with id={client.id}")
    return client


async def get_client_by_id_db(db: Session, client_id: int) -> Optional[Client]:
    logger.debug(f"Getting client with id={client_id}")
    return db.query(Client).filter(Client.id == client_id).first()


async def update_client_last_visited_db(db: Session, client_id: int) -> None:
    logger.debug(f"Updating last_visited_at for client_id={client_id}")
    client = await get_client_by_id_db(db, client_id)
    if client:
        client.last_visited_at = datetime.now(UTC)
        db.commit()
        db.refresh(client)


async def create_client_history_db(
    db: Session,
    client_history: ClientHistoryPost,
) -> ClientHistory:
    logger.info(f"Creating client history for client_id={client_history.client_id}")
    history = ClientHistory(
        client_id=client_history.client_id,
        device_type=client_history.device_type,
        os_type=client_history.os_type,
        browser=client_history.browser,
        language=client_history.language,
        screen_width=client_history.screen_width,
        screen_height=client_history.screen_height,
        country=client_history.country,
        country_code=client_history.country_code,
        region=client_history.region,
        city=client_history.city,
        event_type=int(client_history.event_type.value),
        url=client_history.url,
        referrer=client_history.referrer,
        domain=client_history.domain,
        subdomain=client_history.subdomain,
        page_load_time=client_history.page_load_time,
        area_id=client_history.area_id,
        variant_id=client_history.variant_id,
        campaign_id=client_history.campaign_id,
        feature_flag_id=client_history.feature_flag_id,
        goal_id=client_history.goal_id,
        page=client_history.page,
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    await update_client_last_visited_db(db, client_history.client_id)
    logger.debug(f"Created client history with id={history.id}")
    return history


async def get_last_viewed_variant_in_area_db(
    db: Session, client_id: int, area_id: int, campaign_id: int
) -> Optional[ClientHistory]:
    logger.debug(f"Getting last viewed variant for client_id={client_id} in area_id={area_id}")
    return (
        db.query(ClientHistory)
        .filter(
            ClientHistory.client_id == client_id,
            ClientHistory.area_id == area_id,
            ClientHistory.campaign_id == campaign_id,
            ClientHistory.variant_id.isnot(None),
        )
        .order_by(ClientHistory.created_at.desc())
        .first()
    )
