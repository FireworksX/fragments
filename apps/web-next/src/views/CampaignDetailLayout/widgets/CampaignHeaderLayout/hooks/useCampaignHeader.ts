import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import {
  UpdateCampaignMutationVariables,
  useUpdateCampaignMutation
} from '@/shared/api/stream/mutation/UpdateCampaign.generated'
import { useDeleteCampaignMutation } from '@/shared/api/stream/mutation/DeleteCampaign.generated'
import { useCampaignDetailQuery } from '@/views/CampaignDetailLayout/widgets/CampaignHeaderLayout/queries/CampaignDetail.generated'

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
