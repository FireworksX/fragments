from typing import List, Optional
from datetime import datetime, UTC

from database import Session, Client, ClientHistory


async def create_client_db(db: Session) -> Client:
    client = Client()
    db.add(client)
    db.commit()
    db.refresh(client)
    return client


async def get_client_by_id_db(db: Session, client_id: int) -> Optional[Client]:
    return db.query(Client).filter(Client.id == client_id).first()


async def update_client_last_visited_db(db: Session, client_id: int) -> Client:
    client = await get_client_by_id_db(db, client_id)
    if client:
        client.last_visited_at = datetime.now(UTC)
        db.commit()
        db.refresh(client)
    return client


async def create_client_history_db(
    db: Session,
    client_id: int,
    device_type: int,
    os_type: int,
    browser: str,
    language: str,
    screen_width: int,
    screen_height: int,
    country: str,
    region: str,
    city: str,
    url: str = None,
    referrer: str = None,
    domain: str = None,
    subdomain: str = None,
    page_load_time: float = None
) -> ClientHistory:
    history = ClientHistory(
        client_id=client_id,
        device_type=device_type,
        os_type=os_type,
        browser=browser,
        language=language,
        screen_width=screen_width,
        screen_height=screen_height,
        country=country,
        region=region,
        city=city,
        url=url,
        referrer=referrer,
        domain=domain,
        subdomain=subdomain,
        page_load_time=page_load_time
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    await update_client_last_visited_db(db, client_id)
    return history


async def get_client_history_db(db: Session, client_id: int) -> List[ClientHistory]:
    return db.query(ClientHistory).filter(ClientHistory.client_id == client_id).all()


async def get_client_history_by_id_db(db: Session, history_id: int) -> Optional[ClientHistory]:
    return db.query(ClientHistory).filter(ClientHistory.id == history_id).first()
