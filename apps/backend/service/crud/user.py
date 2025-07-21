from typing import Optional

from sqlalchemy.orm import Session

from crud.media import generate_default_media
from database.models import User

from conf.settings import logger


async def create_user_db(
    db: Session, email: str, first_name: str, last_name: Optional[str], hashed_password: str
) -> User:
    logger.info(f"Creating new user with email: {email}")
    default_user_avatar = await generate_default_media(db, f"{first_name}.png")
    user: User = User(
        email=email,
        first_name=first_name,
        last_name=last_name,
        hashed_password=hashed_password,
        avatar_id=default_user_avatar.id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    logger.info(f"Successfully created user with ID: {user.id}")
    return user


async def get_user_by_email_db(db: Session, email: str) -> Optional[User]:
    logger.info(f"Fetching user by email: {email}")
    user = db.query(User).filter(User.email == email).first()
    if user:
        logger.debug(f"Found user with ID: {user.id}")
    else:
        logger.debug(f"No user found with email: {email}")
    return user


async def get_user_by_id_db(db: Session, user_id: int) -> Optional[User]:
    logger.info(f"Fetching user by ID: {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        logger.debug(f"Found user: {user.email}")
    else:
        logger.debug(f"No user found with ID: {user_id}")
    return user
