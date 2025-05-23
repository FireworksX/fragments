import { useParams } from 'next/navigation'
import { useAreaDetailQuery } from '@/views/AreasDetailLayout/queries/AreaDetail.generated'
import { useUpdateAreaMutation } from '@/views/AreasDetailLayout/queries/UpdateArea.generated'
import { useChangeAreaActiveMutation } from '@/views/AreasDetailLayout/queries/ChangeAreaActive.generated'
import { isBrowser } from '@fragmentsx/utils'

export const useAreaDetail = () => {
  const { areaSlug, projectSlug, streamSlug } = useParams()

  const [executeChangeCampaignActive, { loading: loadingChangeCampaignActive }] = useChangeAreaActiveMutation()
  const [updateCampaign] = useUpdateAreaMutation()

  const { data: campaignData } = useAreaDetailQuery({
    variables: { id: +areaSlug }
  })
  const area = campaignData?.area

  const toggleActive = () => {
    executeChangeCampaignActive({
      variables: {
        defaultCampaignId: campaignData?.area?.defaultCampaign?.id,
        active: !area?.defaultCampaign?.active
      }
    })
  }

  const rename = (name: string) => {
    updateCampaign({
      variables: {
        id: +areaSlug,
        name
      }
    })
  }

  const editDescription = (value: string) => {
    updateCampaign({
      variables: {
        id: +areaSlug,
        description: value
      }
    })
  }

  const editCode = (value: string) => {
    updateCampaign({
      variables: {
        id: +areaSlug,
        code: value
      }
    })
  }

  return {
    loadingChangeCampaignActive,
    area,
    areaSlug,
    projectSlug,
    toggleActive,
    isStreamRoute: !!streamSlug,
    rename,
    editCode,
    editDescription
  }
}
