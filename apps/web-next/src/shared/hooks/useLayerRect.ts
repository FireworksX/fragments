import { useSpring, useSpringValue } from '@react-spring/web'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useCallback, useEffect } from 'react'
import { useWaitForElement } from '@/shared/hooks/useWaitForElement'
import { animatableValue } from '@/shared/utils/animatableValue'
import { watchInlineStyleChange } from '@/shared/utils/watchInlineStyleChange'
import { useUpdateEffect } from 'react-use'
import { keyOfEntity, LinkKey } from '@graph-state/core'
import { getDomRect } from '@/shared/utils/getDomRect'

export const useLayerRect = (layerKey: LinkKey) => {
  const [rect$, rectApi] = useSpring(() => ({
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }))

  const [content] = useLayerValue('content', layerKey)
  const layerNode = useWaitForElement(`[data-key='${layerKey}']`)

  const runCalc = useCallback(() => {
    const rect = getDomRect(keyOfEntity(layerKey))
    rectApi.set(rect)
  }, [rectApi, layerKey])

  useEffect(() => {
    if (layerNode) {
      const dispose = watchInlineStyleChange(layerNode, runCalc)
      return () => dispose()
    }
  }, [layerKey, runCalc, layerNode])

  useUpdateEffect(() => {
    runCalc()
  }, [content, runCalc])

  return rect$
}
