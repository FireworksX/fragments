import { useCampaignQuery } from '../queries/Campaign.generated'
import { useUpdateCampaignMutation } from '@/shared/api/stream/mutation/UpdateCampaign.generated'

export const useCampaignHeader = (campaignID: number) => {
  const { data } = useCampaignQuery({
    variables: {
      id: campaignID
    }
  })

  const [updateCampaign] = useUpdateCampaignMutation()

  const campaign = data?.campaign?.at(0)

  const rename = (name: string) => {
    updateCampaign({
      variables: {
        id: campaignID,
        name
      }
    })
  }

  return {
    campaign,
    rename
  }
}
