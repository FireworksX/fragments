from database.models import StreamFragment
from sqlalchemy.orm import Session
from typing import Optional, List


async def create_stream_fragment_db(db: Session, name: str, project_id: int, stream_id: int, fragment_id: int,
                                    props: str, weight: float) -> StreamFragment:
    stream_fragment: StreamFragment = StreamFragment(name=name, project_id=project_id, stream_id=stream_id,
                                                     fragment_id=fragment_id, props=props, weight=weight)
    db.add(stream_fragment)
    db.commit()
    db.refresh(stream_fragment)
    return stream_fragment


async def get_stream_fragment_by_id_db(db: Session, stream_fragment_id: int) -> Optional[StreamFragment]:
    return db.query(StreamFragment).filter(StreamFragment.id == stream_fragment_id).first()


async def get_stream_fragments_by_stream_id_db(db: Session, stream_id: int) -> List[StreamFragment]:
    return db.query(StreamFragment).filter(StreamFragment.stream_id == stream_id).all()


async def update_stream_fragment_by_id_db(db: Session, values: dict) -> StreamFragment:
    stream_fragment: StreamFragment = await get_stream_fragment_by_id_db(db, values['id'])
    if values.get('name') is not None:
        stream_fragment.name = values['name']
    if values.get('weight') is not None:
        stream_fragment.weight = values['weight']
    if values.get('props') is not None:
        stream_fragment.props = values['props']
    db.merge(stream_fragment)
    db.commit()
    db.refresh(stream_fragment)
    return stream_fragment
