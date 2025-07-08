from datetime import UTC, datetime
from typing import List, Optional

from database import Client, ClientHistory, ClientProjectGoal, Session


async def create_client_db(db: Session, project_id: int) -> Client:
    client = Client(project_id=project_id)
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


async def get_clients_by_project_id_db(db: Session, project_id: int) -> List[Client]:
    return db.query(Client).filter(Client.project_id == project_id).all()


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
    event_type: int,
    url: str = None,
    referrer: str = None,
    domain: str = None,
    subdomain: str = None,
    page_load_time: float = None,
    area_id: int = None,
    variant_id: int = None,
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
        event_type=event_type,
        url=url,
        referrer=referrer,
        domain=domain,
        subdomain=subdomain,
        page_load_time=page_load_time,
        area_id=area_id,
        variant_id=variant_id,
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    await update_client_last_visited_db(db, client_id)
    return history

async def get_last_viewed_variant_in_area_db(db: Session, client_id: int, area_id: int) -> Optional[ClientHistory]:
    return (
        db.query(ClientHistory)
        .filter(
            ClientHistory.client_id == client_id,
            ClientHistory.area_id == area_id,
            ClientHistory.variant_id.isnot(None)
        )
        .order_by(ClientHistory.created_at.desc())
        .first()
    )


async def get_client_history_db(db: Session, client_id: int) -> List[ClientHistory]:
    return db.query(ClientHistory).filter(ClientHistory.client_id == client_id).all()


async def get_client_history_by_id_db(db: Session, history_id: int) -> Optional[ClientHistory]:
    return db.query(ClientHistory).filter(ClientHistory.id == history_id).first()


async def create_client_project_goal_db(
    db: Session, client_id: int, project_goal_id: int, project_id: int
) -> ClientProjectGoal:
    goal = ClientProjectGoal(
        client_id=client_id, project_goal_id=project_goal_id, project_id=project_id
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


async def get_client_project_goals_by_project_and_goal_db(
    db: Session, project_id: int, project_goal_id: int
) -> List[ClientProjectGoal]:
    return (
        db.query(ClientProjectGoal)
        .filter(
            ClientProjectGoal.project_id == project_id,
            ClientProjectGoal.project_goal_id == project_goal_id,
        )
        .all()
    )


async def get_client_project_goals_db(db: Session, client_id: int) -> List[ClientProjectGoal]:
    return db.query(ClientProjectGoal).filter(ClientProjectGoal.client_id == client_id).all()


async def get_client_project_goal_by_id_db(
    db: Session, goal_id: int
) -> Optional[ClientProjectGoal]:
    return db.query(ClientProjectGoal).filter(ClientProjectGoal.id == goal_id).first()


async def delete_client_project_goal_db(db: Session, goal_id: int) -> None:
    goal = await get_client_project_goal_by_id_db(db, goal_id)
    if goal:
        db.delete(goal)
        db.commit()
