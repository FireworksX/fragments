import { LinkKey } from '@graph-state/core'
import { useCallback, useEffect, useMemo } from 'react'
import { to, useSpringValue } from '@react-spring/web'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useWaitForElement } from '@/shared/hooks/useWaitForElement'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useUpdateEffect } from 'react-use'
import { nextTick } from '@/shared/utils/nextTick'
import { watchInlineStyleChange } from '@/shared/utils/watchInlineStyleChange'

export const useLayerGeometry = (layerKey: LinkKey | null) => {
  const width = useSpringValue(0)
  const height = useSpringValue(0)
  const top = useSpringValue(0)
  const left = useSpringValue(0)
  const [scale] = useBuilderCanvasField('scale')

  const [content] = useLayerValue('content', layerKey)

  const getRect = useCallback((node?: Element | null) => node?.getBoundingClientRect?.(), [])
  const layerNode = useWaitForElement(`[data-key='${layerKey}']`)
  const rootNode = useWaitForElement(`[data-highlight-root]`)

  const calcPosition = useCallback(
    (direction: 'top' | 'left') => {
      const rootRect = getRect(rootNode)
      const selectedRect = getRect(layerNode)
      return ((selectedRect?.[direction] ?? 0) - (rootRect?.[direction] ?? 0)) / animatableValue(scale)
    },
    [scale, getRect, layerNode, rootNode]
  )

  const calcSize = useCallback(
    (type: 'width' | 'height') => {
      return (getRect(layerNode)?.[type] ?? 0) / animatableValue(scale)
    },
    [scale, getRect, layerNode]
  )

  const runCalc = useCallback(() => {
    width.set(calcSize('width'))
    height.set(calcSize('height'))
    top.set(calcPosition('top'))
    left.set(calcPosition('left'))
  }, [width, height, calcSize, top, left, calcPosition])

  useEffect(() => {
    if (layerNode) {
      const dispose = watchInlineStyleChange(layerNode, runCalc)
      return () => dispose()
    }
  }, [layerKey, runCalc])

  useUpdateEffect(() => {
    runCalc()
  }, [content, runCalc])

  return {
    top,
    left,
    width,
    height
  }
}
