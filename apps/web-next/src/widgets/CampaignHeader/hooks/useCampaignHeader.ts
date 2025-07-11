import { useCampaignQuery } from '../queries/Campaign.generated'
import { useUpdateCampaignMutation } from '@/shared/api/stream/mutation/UpdateCampaign.generated'
import { CampaignStatus } from '@/__generated__/types'

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
  const toggleActive = (name: string) => {
    updateCampaign({
      variables: {
        id: campaignID,
        status: campaign?.status === CampaignStatus.Active ? CampaignStatus.Inactive : CampaignStatus.Active
      }
    })
  }

  return {
    campaign,
    toggleActive,
    rename
  }
}
