import { useUpdateAreaMutation } from '@/shared/api/area/mutation/UpdateArea.generated'
import { useParams } from 'next/navigation'
import { useAreaDetailQuery } from '@/shared/api/area/query/AreaDetail.generated'

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
