from typing import List
from services.dependencies import supabase
from fastapi import HTTPException, status
import strawberry
from .schemas import Fragment, AuthPayload, FragmentIn
from .middleware import Context


async def fragments(info: strawberry.Info[Context]) -> List[Fragment]:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("fragments").select("*").eq("author", user.user.id).execute()

    fragments: List[Fragment] = []
    for fg in result.data:
        fragment: Fragment = Fragment(id=fg['id'], user=user.user, name=fg["name"],
                                      document=fg["document"])
        fragments.append(fragment)
    return fragments


async def fragment_by_id(info: strawberry.Info[Context], id_: str) -> Fragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    result = supabase.postgrest.from_table("fragments").select("*").eq("id", id_).execute()
    fragment: Fragment = Fragment(id=result.data[0]['id'], user=user.user, name=result.data[0]["name"],
                                  document=result.data[0]["document"])
    return fragment


async def create_fragment(info: strawberry.Info[Context], fg: FragmentIn) -> Fragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    fragment = supabase.postgrest.table("fragments").insert({'author': user.user.id, 'name': fg.name,
                                                             'document': fg.document}).execute()

    return Fragment(user=user.user, id=fragment.data[0]['id'], name=fg.name, document=fg.document)


async def update_fragment(info: strawberry.Info[Context], fg: FragmentIn) -> Fragment:
    user: AuthPayload = info.context.user()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    update = {'author': user.user.id, 'id': fg.id}
    if fg.document is not None:
        update['document'] = fg.document
    if fg.name is not None:
        update['name'] = fg.name
    fragment = supabase.postgrest.table("fragments").update(update).eq("id", fg.id).execute()

    return Fragment(user=user.user, id=fragment.data[0]['id'], name=fragment.data[0]['name'], document=fragment.data[0]['document'])