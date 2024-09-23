import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { findRefNode } from '@/builder/utils/findRefNode'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { useDrag } from '@use-gesture/react'
import { animatableValue } from '@/builder/utils/animatableValue'
import { createConstants } from '@fragments/utils'
import { extractAnimatableValues } from '@/builder/utils/extractAnimatableValues'

const BORDER_SIZE = 1.5
const initialStyle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 0,
  borderWidth: 0
}

export const SELECTION_SIDES = createConstants('topLeft', 'top', 'right', 'bottom', 'left')

export const useLayerHighlightSelect = () => {
  const { focus, mouseOverLayer } = useBuilderManager()
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [focusNode] = useGraph(documentManager, focus)

  const [selectStyles, selectStylesApi] = useSpring(() => initialStyle)
  const [parentStyles, parentStylesApi] = useSpring(() => initialStyle)

  useEffect(() => {
    if (focusNode) {
      const focusNode = documentManager.resolve(focus)
      const focusRect = focusNode?.absoluteRect?.() ?? {}
      const parentNode = focusNode?.getParent()
      const parentRect = animatableValue(parentNode?.absoluteRect?.()) ?? {}

      selectStylesApi.set({
        ...extractAnimatableValues(focusRect),
        opacity: canvas.isDragging ? 0 : 1,
        borderWidth: to(canvas.scale, v => BORDER_SIZE / v)
      })

      parentStylesApi.set({
        ...parentRect,
        opacity: canvas.isDragging || !parentRect.width || !parentRect.height ? 0 : 1,
        borderWidth: to(canvas.scale, v => BORDER_SIZE / v)
      })
    }
  }, [focusNode, canvas.isDragging])

  const dragHandler = useDrag(({ movement: [mx, my], args: [directions], first, memo = {}, dragging }) => {
    canvasManager.setResizing(dragging)

    if (first) {
      const targetRect = animatableValue(focusNode?.rect?.() ?? {})
      memo.from = {
        getWidth: move => move / scale + (memo?.from?.width ?? 0),
        getHeight: move => move / scale + (memo?.from?.height ?? 0),
        getLeft: move => move / scale + (targetRect.x ?? 0),
        getTop: move => move / scale + (targetRect.y ?? 0),
        width: targetRect.width,
        height: targetRect.height
      }
    }

    const scale = animatableValue(canvas?.scale)
    const width = mx / scale + (memo?.from?.width ?? 0)
    const height = my / scale + (memo?.from?.height ?? 0)

    if (directions.includes(SELECTION_SIDES.right)) {
      focusNode.setWidth(width)
    }
    if (directions.includes(SELECTION_SIDES.bottom)) {
      focusNode.setHeight(height)
    }

    if (directions.includes(SELECTION_SIDES.left)) {
      if (mx > 0) {
        focusNode.setWidth(memo.from.getWidth(mx * -1))
        focusNode.move(memo.from.getLeft(mx))

        memo.from.getLeft(mx, memo.from.getWidth(mx * -1))
      } else {
        focusNode.setWidth(memo.from.getWidth(mx * -1))
        focusNode.move(memo.from.getLeft(mx))
      }
    }

    if (directions.includes(SELECTION_SIDES.top)) {
      if (my > 0) {
        focusNode.setHeight(memo.from.getHeight(my * -1))
        focusNode.move(null, memo.from.getTop(my))
      } else {
        focusNode.setHeight(memo.from.getHeight(my * -1))
        focusNode.move(null, memo.from.getTop(my))
      }
    }

    return memo
  })

  return {
    parentStyles,
    selectStyles,
    dragHandler
  }
}
