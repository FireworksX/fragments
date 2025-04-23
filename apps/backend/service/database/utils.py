from sqlalchemy import inspect
from sqlalchemy.dialects.postgresql import insert

from . import Base, Session


def upsert(db: Session, model: Base, **values):
    table = model.__table__
    stmt = insert(table).values(**values)

    primary_keys = [key.name for key in inspect(table).primary_key]
    update_dict = {c: values[c] for c in values if c not in primary_keys}  # pylint: disable=C0206

    if not update_dict:
        raise ValueError('insert_or_update resulted in an empty update_dict')

    stmt = stmt.on_conflict_do_update(index_elements=primary_keys, set_=update_dict)

    db.connection().execute(stmt)


def bulk_upsert_mappings(db: Session, model: Base, values, pk='id', del_not_included=False):
    entries_to_update = []
    values_ids = list(values.keys())
    for each in db.query(getattr(model, pk)).filter(getattr(model, pk).in_(values_ids)).all():
        entry = values.pop(getattr(each, pk), None)
        if entry:
            entries_to_update.append(entry)

    entries_to_put = values.values()

    db.bulk_insert_mappings(model, entries_to_put)
    db.bulk_update_mappings(model, entries_to_update)

    if del_not_included:
        delete_not_included(db, model, values_ids, pk)
    db.commit()


def delete_not_included(db: Session, model: Base, values_ids, pk='id'):
    db.query(model).filter(getattr(model, pk).not_in(values_ids)).delete()


def delete_by_pks(db: Session, model, values_ids, pk='id'):
    db.query(model).filter(getattr(model, pk).in_(values_ids)).delete()
