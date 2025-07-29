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

  const addProperty = useCallback(
    (property: unknown) =>
      updateAreaProperties({
        variables: {
          id: +areaSlug,
          properties: [...properties, property]
        }
      }),
    [areaSlug, properties, updateAreaProperties]
  )

  const removeProperty = useCallback(
    (propertyId: string) =>
      updateAreaProperties({
        variables: {
          id: +areaSlug,
          properties: properties.find(prop => prop?._id === propertyId)
        }
      }),
    [areaSlug, properties, updateAreaProperties]
  )

  return {
    loadingProperties,
    properties,
    addProperty,
    removeProperty
  }
}
