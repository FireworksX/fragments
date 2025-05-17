import { useParams } from 'next/navigation'
import { useCampaignDetailQuery } from '@/views/AreasDetailLayout/queries/CampaignDetail.generated'
import { useChangeCampaignActiveMutation } from '@/views/AreasDetailLayout/queries/ChangeCampaignActive.generated'
import { useState } from 'react'
import { useUpdateCampaignMutation } from '@/views/AreasDetailLayout/queries/UpdateCampaign.generated'

export const useCampaignDetail = () => {
  const { areaSlug, projectSlug, streamSlug } = useParams()

  const [executeChangeCampaignActive, { loading: loadingChangeCampaignActive }] = useChangeCampaignActiveMutation()
  const [updateCampaign] = useUpdateCampaignMutation()

  const { data: campaignData } = useCampaignDetailQuery({
    variables: { campaignSlug: +areaSlug }
  })
  const campaign = campaignData?.campaign?.at(0)

  const toggleActive = () => {
    executeChangeCampaignActive({
      variables: {
        campaignSlug: +areaSlug,
        active: !campaign?.active
      }
    })
  }

  const rename = (name: string) => {
    updateCampaign({
      variables: {
        campaignSlug: +areaSlug,
        name
      }
    })
  }

  const editDescription = (value: string) => {
    updateCampaign({
      variables: {
        campaignSlug: +areaSlug,
        description: value
      }
    })
  }

  return {
    loadingChangeCampaignActive,
    campaign,
    areaSlug,
    projectSlug,
    toggleActive,
    isStreamRoute: !!streamSlug,
    rename,
    editDescription
  }
}
