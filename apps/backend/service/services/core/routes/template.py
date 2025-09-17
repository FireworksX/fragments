from typing import List

import strawberry

from crud.template import get_default_templates_db
from database import Session
from database.models import Fragment

from .fragment import fragment_db_to_fragment
from .middleware import Context
from .schemas.fragment import FragmentGet


async def get_default_templates(info: strawberry.Info[Context]) -> List[FragmentGet]:
    await info.context.user()
    db: Session = info.context.session()
    fragments: List[Fragment] = await get_default_templates_db(db)
    return [fragment_db_to_fragment(fragment) for fragment in fragments]
