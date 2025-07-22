import { useUpdateAreaMutation } from '@/shared/api/area/mutation/UpdateArea.generated'
import { useParams, useRouter } from 'next/navigation'
import { useAreaDetailQuery } from '@/shared/api/area/query/AreaDetail.generated'
import { useDeleteAreaMutation } from '@/shared/api/area/mutation/DeleteArea.generated'
import { useCallback } from 'react'
import { useLink } from '@/shared/ui/Link'

export const useAreaDetail = () => {
  const { areaSlug, projectSlug, campaignSlug } = useParams()
  const { href: areasHref } = useLink({
    type: 'areas'
  })
  const { push } = useRouter()
  const [updateArea] = useUpdateAreaMutation()
  const [deleteArea, { loading: deleteLoading }] = useDeleteAreaMutation()

  const { data: areaData } = useAreaDetailQuery({
    variables: { id: +areaSlug }
  })
  const area = areaData?.area?.at(0)

  const editDescription = (value: string) => {
    if (value !== area?.description) {
      updateArea({
        variables: {
          id: +areaSlug,
          description: value
        }
      })
    }
  }

  const editCode = (value: string) => {
    if (value !== area?.code) {
      updateArea({
        variables: {
          id: +areaSlug,
          code: value
        }
      })
    }
  }

  const handleDelete = useCallback(async () => {
    await deleteArea({
      variables: {
        id: +areaSlug
      }
    })

    if (areasHref) {
      push(areasHref)
    }
  }, [deleteArea])

  return {
    area,
    areaSlug,
    projectSlug,
    isCampaignRoute: !!campaignSlug,
    deleteLoading,
    editCode,
    editDescription,
    handleDelete
  }
}
