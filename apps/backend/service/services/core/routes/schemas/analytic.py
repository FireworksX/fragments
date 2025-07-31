import strawberry


@strawberry.type
class VariantStatsGet:
    last_views: int
    total_views: int
    percentage: float


@strawberry.type
class CampaignStatsGet:
    last_views: int
    total_views: int
    percentage: float
