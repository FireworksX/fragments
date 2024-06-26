import { useStore } from '@nanostores/react'
import { $statex } from '../../../store/builderRouterStore'
import { useMemo } from 'react'
import { iterator } from '@fragments/utils'

export const useViewerTree = (rootLayerKey: string) => {
  const statex = useStore($statex)

  return useMemo(
    () =>
      iterator(statex.resolve(rootLayerKey), (key, value, path) => {
        return statex.resolve(value) ?? value
      }),
    [rootLayerKey, statex]
  )
}
