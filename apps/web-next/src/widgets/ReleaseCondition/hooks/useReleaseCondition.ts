import { DeviceType, OsType, FilterPost, ReleaseConditionGet } from '@/__generated__/types'
import { useCallback, useMemo } from 'react'
import { useUpdateReleaseConditionMutation } from '@/shared/api/releaseCondition/mutation/UpdateReleaseCondition.generated'
import { isObject, omit } from '@fragmentsx/utils'

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

    const geoLocations = (releaseCondition?.conditionSets
      ?.at(0)
      ?.conditions?.find(cond => cond.filterData?.__typename === 'FilterGeoLocationsGet')?.filterData?.geoLocations ??
      []) as OsType[]

    return {
      deviceTypes,
      osTypes,
      geoLocations,
      pages: [],
      timeFrames: []
    }
  }, [releaseCondition])

  const handleUpdate = useCallback(
    async (filterData: FilterPost) => {
      const conditionsFromFilterData = Object.entries(filterData)
        .map(([field, value]) => {
          const cleanValue = Array.isArray(value)
            ? value.map(el => (isObject(el) ? omit(el, '__typename') : el))
            : value

          return {
            name: field,
            filterData: Array.isArray(cleanValue)
              ? cleanValue.length > 0
                ? {
                    [field]: cleanValue
                  }
                : null
              : {
                  [field]: cleanValue
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
