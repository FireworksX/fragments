import { useParams } from 'next/navigation'
import { useCampaignDetailQuery } from '@/views/CampaignDetailLayout/queries/CampaignDetail.generated'
import { useChangeCampaignActiveMutation } from '@/views/CampaignDetailLayout/queries/ChangeCampaignActive.generated'

export const useCampaignDetail = () => {
  const { campaignSlug, projectSlug, streamSlug } = useParams()

  const [executeChangeCampaignActive, { loading: loadingChangeCampaignActive }] = useChangeCampaignActiveMutation()
  const { data: campaignData } = useCampaignDetailQuery({
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
