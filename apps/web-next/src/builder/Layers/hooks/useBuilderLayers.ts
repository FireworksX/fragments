import { useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { $statex } from '../../../../../store/builderRouterStore'
import { entityOfKey } from '@adstore/statex'

export const useBuilderLayers = () => {
  const statex = useStore($statex)

  /*
  Здесь была вервсия с вариантом, когда на разных breakpoint`ах
  можно задачать свой порядок элементов. Посмотри в гите: fb6714748aac024965bf6b8cd4db8b2ebdafd7e8
   */
  const onDragEnd = useCallback(
    result => {
      const destinationIndex = result.destination.index
      const sourceIndex = result.source.index
      const [, parentLayerKey] = result.destination.droppableId?.split?.('/')
      const children = statex.resolve(parentLayerKey)?.children || []
      const [removed] = children.splice(sourceIndex, 1)
      children.splice(destinationIndex, 0, removed)

      statex.mutate(
        {
          ...entityOfKey(parentLayerKey),
          children
        },
        { replace: true }
      )
    },
    [statex]
  )

  return {
    onDragEnd
  }
}
