import { use, useCallback, useEffect, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { pick } from '@fragmentsx/utils'
import { CanvasStore } from '@/shared/store/canvasStore'
import { SpringValue } from '@react-spring/web'

export const useBuilderCanvasField = (field: keyof CanvasStore) => {
  const { canvasManager } = use(BuilderContext)
  const [canvasGraph, updateCanvasGraph] = useGraph(canvasManager, canvasManager?.key, {
    selector: graph => pick(graph, field)
  })

  const currentValue = canvasGraph?.[field]

  const update = useCallback(
    (value: unknown) => {
      if (currentValue instanceof SpringValue) {
        currentValue.start(value)
      } else {
        updateCanvasGraph({
          [field]: value
        })
      }
    },
    [currentValue]
  )

  return useMemo(() => [currentValue, update], [currentValue, update])
}
