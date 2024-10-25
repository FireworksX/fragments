import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { CAMPAIGN_DETAIL } from '@/shared/api/campaign/query/campaignDetail'
import { CHANGE_CAMPAIGN_ACTIVE } from '@/shared/api/campaign/mutation/changeCampaignActive'

export const useCampaignDetail = () => {
  const { campaignSlug, projectSlug, streamSlug } = useParams()

  const [executeChangeCampaignActive, { loading: loadingChangeCampaignActive }] = useMutation(CHANGE_CAMPAIGN_ACTIVE)
  const { data: campaignData } = useQuery(CAMPAIGN_DETAIL, {
    variables: { campaignSlug: +campaignSlug }
  })
  const campaign = campaignData?.campaign?.at(0)

  const toggleActive = () => {
    executeChangeCampaignActive({
      variables: {
        campaignSlug: +campaignSlug,
        active: !campaign?.active
      }
    })
  }

  return {
    loadingChangeCampaignActive,
    campaign,
    campaignSlug,
    projectSlug,
    toggleActive,
    isStreamRoute: !!streamSlug
  }
}
