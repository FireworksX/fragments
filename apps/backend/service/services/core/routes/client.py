from typing import List, Optional

import strawberry
from fastapi import HTTPException, status

from database import Session, Client, ClientHistory
from crud.client import (
    create_client_db,
    get_client_by_id_db,
    update_client_last_visited_db,
    create_client_history_db,
    get_client_history_db,
    get_client_history_by_id_db
)
from crud.ipgetter import GeoLocation, get_location_by_ip

from .middleware import Context
from .schemas.client import ClientGet, ClientHistoryGet


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
        created_at=history.created_at.isoformat()
    )


def client_db_to_client(client: Client, history: List[ClientHistory]) -> ClientGet:
    return ClientGet(
        id=client.id,
        created_at=client.created_at.isoformat(),
        updated_at=client.updated_at.isoformat(),
        last_visited_at=client.last_visited_at.isoformat() if client.last_visited_at else None,
        history=[client_history_db_to_history(h) for h in history]
    )

async def init_client_session(info: strawberry.Info[Context]) -> None:
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
        url="",
        referrer="",
        domain="",
        subdomain=""
    )

    info.context.response.set_cookie(
        key="user_id",  # Cookie name to identify the client
        value=str(client.id),  # Client ID converted to string
        httponly=False,  # Prevents JavaScript access for security if True
        max_age=3600,  # Cookie expires in 1 hour (3600 seconds)
        samesite="Lax"  # Moderate CSRF protection while allowing normal navigation
    )

async def create_client_route(info: strawberry.Info[Context]) -> ClientGet:
    db: Session = info.context.session()
    client: Client = await create_client_db(db)
    history: List[ClientHistory] = await get_client_history_db(db, client.id)
    return client_db_to_client(client, history)


async def get_client_route(info: strawberry.Info[Context], client_id: int) -> ClientGet:
    db: Session = info.context.session()
    client: Client = await get_client_by_id_db(db, client_id)
    
    if client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
        
    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    return client_db_to_client(client, history)


async def update_client_last_visited_route(
    info: strawberry.Info[Context], client_id: int
) -> ClientGet:
    db: Session = info.context.session()
    client: Client = await update_client_last_visited_db(db, client_id)
    
    if client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
        
    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    return client_db_to_client(client, history)


async def get_client_history_route(
    info: strawberry.Info[Context], client_id: int
) -> List[ClientHistoryGet]:
    db: Session = info.context.session()
    
    client: Client = await get_client_by_id_db(db, client_id)
    if client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
        
    history: List[ClientHistory] = await get_client_history_db(db, client_id)
    return [client_history_db_to_history(h) for h in history]
