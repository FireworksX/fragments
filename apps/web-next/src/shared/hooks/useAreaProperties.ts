import { useParams } from 'next/navigation'
import { useAreaDetailQuery } from '@/shared/api/area/query/AreaDetail.generated'
import { useUpdateAreaMutation } from '@/shared/api/area/mutation/UpdateArea.generated'
import { useCallback } from 'react'

export const useAreaProperties = () => {
  const { areaSlug } = useParams()
  const { data, loading: loadingProperties } = useAreaDetailQuery({
    variables: {
      id: +areaSlug
    }
  })

  const [updateAreaProperties] = useUpdateAreaMutation()

  const properties = data?.area?.at(0)?.properties ?? []

  const updateProperties = nextProperties => {
    updateAreaProperties({
      variables: {
        id: +areaSlug,
        properties: nextProperties
      }
    })
  }

  return {
    loadingProperties,
    properties,
    updateProperties
  }
}
