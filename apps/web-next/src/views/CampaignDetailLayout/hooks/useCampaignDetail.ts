import { useParams } from 'next/navigation'
import { useCampaignDetailQuery } from '@/views/CampaignDetailLayout/queries/CampaignDetail.generated'
import { useChangeCampaignActiveMutation } from '@/views/CampaignDetailLayout/queries/ChangeCampaignActive.generated'
import { useState } from 'react'
import { useUpdateCampaignMutation } from '@/views/CampaignDetailLayout/queries/UpdateCampaign.generated'

export const useCampaignDetail = () => {
  const { campaignSlug, projectSlug, streamSlug } = useParams()

  const [executeChangeCampaignActive, { loading: loadingChangeCampaignActive }] = useChangeCampaignActiveMutation()
  const [updateCampaign] = useUpdateCampaignMutation()

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

  const rename = (name: string) => {
    updateCampaign({
      variables: {
        campaignSlug: +campaignSlug,
        name
      }
    })
  }

  const editDescription = (value: string) => {
    updateCampaign({
      variables: {
        campaignSlug: +campaignSlug,
        description: value
      }
    })
  }

  return {
    loadingChangeCampaignActive,
    campaign,
    campaignSlug,
    projectSlug,
    toggleActive,
    isStreamRoute: !!streamSlug,
    rename,
    editDescription
  }
}
