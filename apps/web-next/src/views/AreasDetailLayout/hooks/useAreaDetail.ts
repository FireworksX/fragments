import { useParams } from 'next/navigation'
import { useAreaDetailQuery } from '@/views/AreasDetailLayout/queries/AreaDetail.generated'
import { useUpdateAreaMutation } from '@/views/AreasDetailLayout/queries/UpdateArea.generated'
import { useChangeAreaActiveMutation } from '@/views/AreasDetailLayout/queries/ChangeAreaActive.generated'
import { isBrowser } from '@fragmentsx/utils'

export const useAreaDetail = () => {
  const { areaSlug, projectSlug, campaignSlug } = useParams()
  const [updateArea] = useUpdateAreaMutation()

  const { data: areaData } = useAreaDetailQuery({
    variables: { id: +areaSlug }
  })
  const area = areaData?.area

  const editDescription = (value: string) => {
    updateArea({
      variables: {
        id: +areaSlug,
        description: value
      }
    })
  }

  const editCode = (value: string) => {
    updateArea({
      variables: {
        id: +areaSlug,
        code: value
      }
    })
  }

  return {
    area,
    areaSlug,
    projectSlug,
    isCampaignRoute: !!campaignSlug,
    editCode,
    editDescription
  }
}
