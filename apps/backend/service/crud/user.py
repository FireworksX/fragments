from typing import Optional

from sqlalchemy.orm import Session

from database.models import User


async def create_user_db(
    db: Session, email: str, first_name: str, last_name: Optional[str], hashed_password: str
) -> User:
    user: User = User(
        email=email, first_name=first_name, last_name=last_name, hashed_password=hashed_password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


async def get_user_by_email_db(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()


async def get_user_by_id_db(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()
