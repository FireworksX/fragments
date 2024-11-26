import strawberry


@strawberry.type
class MediaGet:
    id: int
    path: str
