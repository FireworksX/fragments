import {
  ConditionGet,
  ConditionSetGet,
  DeviceType,
  FilterDeviceTypeGet,
  FilterPost,
  ReleaseConditionGet
} from '@/__generated__/types'
import { useCallback, useMemo } from 'react'
import { useCreateReleaseConditionMutation } from '@/widgets/ReleaseCondition/queries/CreateReleaseCondition.generated'
import { useProject } from '@/shared/hooks/useProject'
import { useUpdateReleaseConditionMutation } from '@/widgets/ReleaseCondition/queries/UpdateReleaseCondition.generated'

export const useReleaseCondition = (releaseCondition: ReleaseConditionGet) => {
  const [updateReleaseCondition] = useUpdateReleaseConditionMutation()

  const handleUpdate = useCallback(
    async (filterData: FilterPost) => {
      updateReleaseCondition({
        variables: {
          id: releaseCondition.id,
          filterData
        }
      })
    },
    [releaseCondition, updateReleaseCondition]
  )

  const updateDevices = useCallback(
    (devices: DeviceType[]) => {
      handleUpdate({
        deviceTypes: devices,
        geoLocations: [],
        osTypes: [],
        pages: [],
        timeFrames: []
      })
    },
    [handleUpdate]
  )

  const devices =
    releaseCondition?.conditionSets
      ?.at(0)
      ?.conditions?.find(cond => cond.filterData?.__typename === 'FilterDeviceTypeGet')?.filterData ?? []

  const osTypes =
    releaseCondition?.conditionSets?.at(0)?.conditions?.find(cond => cond.filterData?.__typename === 'FilterOSTypeGet')
      ?.filterData ?? []

  // console.log(conditionSet, deviceCondition)
  // const filters = useMemo(() => {
  //   return conditionSet.
  // }, [conditionSet])

  return {
    updateDevices,
    devices,
    osTypes
  }
}
