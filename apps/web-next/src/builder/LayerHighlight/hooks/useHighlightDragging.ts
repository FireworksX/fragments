import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { findRefNode } from '@/builder/utils/findRefNode'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { SPRING_INDEXES } from '@/builder/LayerHighlight/hooks/useHighlights'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'

const BORDER_SIZE = 1
const PARENT_BORDER_SIZE = 3
const initialStyle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 0,
  borderWidth: 0
}

export const useHighlightDragging = () => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [dragingLayer] = useGraph(documentManager, canvas.draggingLayer)
  const draggingLayerParent = dragingLayer?.getParent()
  const parentTarget = findRefNode(documentManager.keyOfEntity(draggingLayerParent))
  const parentRect = getNodePosition(parentTarget)

  const [draggingTargetStyles, focusStylesApi] = useSpring(() => initialStyle)
  const [draggingParentStyles, parentStylesApi] = useSpring(() => initialStyle)

  useEffect(() => {
    const target = findRefNode(canvas.draggingLayer)
    const { width, height } = getNodePosition(target)
    const targetLayer = documentManager.resolve(canvas.draggingLayer)

    focusStylesApi.set({
      x: to([targetLayer?.x ?? 0], v => v + parentRect.left),
      y: to([targetLayer?.y ?? 0], v => v + parentRect.top),
      width: width,
      height: height,
      opacity: canvas.isDragging ? 1 : 0,
      borderWidth: BORDER_SIZE / canvas.scale.get()
    })

    parentStylesApi.set({
      x: parentRect.left,
      y: parentRect.top,
      width: parentRect.width,
      height: parentRect.height,
      opacity: canvas.isDragging && parentRect.width > 0 && parentRect.height ? 1 : 0,
      borderWidth: PARENT_BORDER_SIZE / canvas.scale.get()
    })
  }, [canvas.draggingLayer, canvas.isDragging, draggingLayerParent?._id])

  return {
    draggingTargetStyles,
    draggingParentStyles
  }
}
