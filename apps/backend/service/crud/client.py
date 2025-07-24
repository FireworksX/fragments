from datetime import UTC, datetime
from typing import List, Optional

from conf.settings import logger
from database import Client, ClientHistory, ClientProjectGoal, Session


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


async def update_client_last_visited_db(db: Session, client_id: int) -> Client:
    logger.debug(f"Updating last_visited_at for client_id={client_id}")
    client = await get_client_by_id_db(db, client_id)
    if client:
        client.last_visited_at = datetime.now(UTC)
        db.commit()
        db.refresh(client)
    return client


async def get_clients_by_project_id_db(db: Session, project_id: int) -> List[Client]:
    logger.debug(f"Getting all clients for project_id={project_id}")
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
    campaign_id: int = None,
) -> ClientHistory:
    logger.info(f"Creating client history for client_id={client_id}")
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
        campaign_id=campaign_id,
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    await update_client_last_visited_db(db, client_id)
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


async def get_client_history_db(db: Session, client_id: int) -> List[ClientHistory]:
    logger.debug(f"Getting all history for client_id={client_id}")
    return db.query(ClientHistory).filter(ClientHistory.client_id == client_id).all()


async def get_client_history_by_id_db(db: Session, history_id: int) -> Optional[ClientHistory]:
    logger.debug(f"Getting client history with id={history_id}")
    return db.query(ClientHistory).filter(ClientHistory.id == history_id).first()


async def create_client_project_goal_db(
    db: Session, client_id: int, project_goal_id: int, project_id: int
) -> ClientProjectGoal:
    logger.info(
        f"Creating project goal for client_id={client_id}, project_id={project_id}, goal_id={project_goal_id}"
    )
    goal = ClientProjectGoal(
        client_id=client_id, project_goal_id=project_goal_id, project_id=project_id
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)
    logger.debug(f"Created client project goal with id={goal.id}")
    return goal


async def get_client_project_goals_by_project_and_goal_db(
    db: Session, project_id: int, project_goal_id: int
) -> List[ClientProjectGoal]:
    logger.debug(f"Getting project goals for project_id={project_id} and goal_id={project_goal_id}")
    return (
        db.query(ClientProjectGoal)
        .filter(
            ClientProjectGoal.project_id == project_id,
            ClientProjectGoal.project_goal_id == project_goal_id,
        )
        .all()
    )


async def get_client_project_goals_db(db: Session, client_id: int) -> List[ClientProjectGoal]:
    logger.debug(f"Getting all project goals for client_id={client_id}")
    return db.query(ClientProjectGoal).filter(ClientProjectGoal.client_id == client_id).all()


async def get_client_project_goal_by_id_db(
    db: Session, goal_id: int
) -> Optional[ClientProjectGoal]:
    logger.debug(f"Getting project goal with id={goal_id}")
    return db.query(ClientProjectGoal).filter(ClientProjectGoal.id == goal_id).first()


async def delete_client_project_goal_db(db: Session, goal_id: int) -> None:
    logger.info(f"Deleting project goal with id={goal_id}")
    goal = await get_client_project_goal_by_id_db(db, goal_id)
    if goal:
        db.delete(goal)
        db.commit()
