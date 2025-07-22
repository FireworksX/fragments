import {
  ConditionGet,
  ConditionSetGet,
  DeviceType,
  FilterDeviceTypeGet,
  FilterOsTypeGet,
  OsType,
  FilterPost,
  ReleaseConditionGet
} from '@/__generated__/types'
import { useCallback, useMemo } from 'react'
import { useUpdateReleaseConditionMutation } from '@/widgets/ReleaseCondition/queries/UpdateReleaseCondition.generated'

export const useReleaseCondition = (releaseCondition: ReleaseConditionGet) => {
  const [updateReleaseCondition] = useUpdateReleaseConditionMutation()

  const currentFilters = useMemo(() => {
    const deviceTypes = (releaseCondition?.conditionSets
      ?.at(0)
      ?.conditions?.find(cond => cond.filterData?.__typename === 'FilterDeviceTypeGet')?.filterData?.deviceTypes ??
      []) as DeviceType[]

    const osTypes = (releaseCondition?.conditionSets
      ?.at(0)
      ?.conditions?.find(cond => cond.filterData?.__typename === 'FilterOSTypeGet')?.filterData?.osTypes ??
      []) as OsType[]

    return {
      deviceTypes,
      osTypes,
      geoLocations: [],
      pages: [],
      timeFrames: []
    }
  }, [releaseCondition])

  const handleUpdate = useCallback(
    async (filterData: FilterPost) => {
      const conditionsFromFilterData = Object.entries(filterData)
        .map(([field, value]) => {
          return {
            name: field,
            filterData: Array.isArray(value)
              ? value.length > 0
                ? {
                    [field]: value
                  }
                : null
              : {
                  [field]: value
                }
          }
        })
        .filter(el => !!el.filterData)

      updateReleaseCondition({
        variables: {
          id: releaseCondition.id,
          conditions: conditionsFromFilterData
        }
      })
    },
    [releaseCondition, updateReleaseCondition]
  )

  const updateFilter = useCallback(
    <TField extends keyof typeof currentFilters>(field: TField, value: (typeof currentFilters)[TField]) => {
      handleUpdate({
        ...currentFilters,
        [field]: value
      })
    },
    []
  )

  return {
    updateFilter,
    currentFilters
  }
}
