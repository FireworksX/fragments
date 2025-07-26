import { useParams } from 'next/navigation'
import { useCampaignDetailQuery } from '@/shared/api/campaign/query/CampaignDetail.generated'

export const useCampaignHeader = () => {
  const { campaignSlug, areaSlug, projectSlug } = useParams()

  const { data } = useCampaignDetailQuery({
    variables: {
      id: +campaignSlug
    }
  })
  const stream = data?.campaign?.at(0)

  return {
    campaignSlug,
    stream,
    projectSlug,
    areaSlug,
    releaseCondition: stream?.featureFlag?.releaseCondition
  }
}
