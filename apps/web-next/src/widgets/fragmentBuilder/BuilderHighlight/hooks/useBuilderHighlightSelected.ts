import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { isBrowser } from '@fragments/utils'
import { useSpring } from '@react-spring/web'
import { useCallback, useEffect } from 'react'
import { useBuilderHighlightParent } from './useBuilderHighlightParent'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { nextTick } from '@/shared/utils/nextTick'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

const DEFAULT_STYLES = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  opacity: 1
}

export const useBuilderHighlightSelected = () => {
  const { selection } = useBuilderSelection()
  const { canvas } = useBuilderCanvas()

  const rootNode = isBrowser ? document.querySelector(`[data-highlight-root]`) : null
  const selectedNode = isBrowser ? document.querySelector(`[data-key='${selection}']`) : null
  const parentStyles = useBuilderHighlightParent()

  const [left] = useLayerValue('left')
  const [top] = useLayerValue('top')
  const [width] = useLayerValue('width')
  const [height] = useLayerValue('height')
  const [widthType] = useLayerValue('widthType')
  const [heightType] = useLayerValue('heightType')

  const [selectedStyles, selectStylesApi] = useSpring(() => DEFAULT_STYLES)

  const getRect = useCallback((node?: Element | null) => node?.getBoundingClientRect?.(), [])

  const updateHighlight = useCallback(() => {
    if (!selectedNode) {
      selectStylesApi.set(DEFAULT_STYLES)
    }

    const selectedRect = getRect(selectedNode)
    const rootRect = getRect(rootNode)
    const scaleFactor = animatableValue(canvas.scale)

    if (selectedRect) {
      selectStylesApi.set({
        width: selectedRect.width / scaleFactor,
        height: selectedRect.height / scaleFactor,
        x: (selectedRect.left - rootRect?.left) / scaleFactor,
        y: (selectedRect.top - rootRect?.top) / scaleFactor,
        opacity: selectedRect.width === 0 && selectedRect.height === 0 ? 0 : 1
      })
    }
  }, [selectedNode, rootNode])

  useEffect(() => {
    updateHighlight()
  }, [top, left, width, height, widthType, heightType, selection])

  // useEffect(() => {
  //   if (canvas.isMoving) return
  // }, [canvas.isMoving, canvas.isDragging, getRect, selectStylesApi, selectedNode])

  return { selectedStyles, parentStyles }
}
