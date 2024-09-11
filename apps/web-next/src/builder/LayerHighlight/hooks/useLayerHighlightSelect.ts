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
    if (focus) {
      const target = findRefNode(focus)
      const parentTarget = findRefNode(documentManager.keyOfEntity(documentManager.resolve(focus)?.getParent()))
      const parentRect = getNodePosition(parentTarget)

      selectStylesApi.set({
        x: to(focusNode.resolveField('x'), v => parentRect.left + v),
        y: to(focusNode.resolveField('y'), v => parentRect.top + v),
        width: focusNode.resolveField('width'),
        height: focusNode.resolveField('height'),
        opacity: canvas.isDragging ? 0 : 1,
        borderWidth: BORDER_SIZE / canvas.scale.get()
      })

      parentStylesApi.set({
        x: parentRect.left,
        y: parentRect.top,
        width: parentRect.width,
        height: parentRect.height,
        opacity: canvas.isDragging || !parentRect.width || !parentRect.height ? 0 : 1,
        borderWidth: BORDER_SIZE / canvas.scale.get()
      })
    }
  }, [focusNode, canvas.isDragging])

  const dragHandler = useDrag(({ movement: [mx, my], args: [directions], first, memo = {}, dragging }) => {
    canvasManager.setResizing(dragging)

    if (first) {
      memo.from = {
        getWidth: move => move / scale + (memo?.from?.width ?? 0),
        getHeight: move => move / scale + (memo?.from?.height ?? 0),
        getLeft: move => move / scale + (memo?.from?.left ?? 0),
        getTop: move => move / scale + (memo?.from?.top ?? 0),
        left: animatableValue(focusNode.resolveField('x')),
        top: animatableValue(focusNode.resolveField('y')),
        width: animatableValue(focusNode.resolveField('width')),
        height: animatableValue(focusNode.resolveField('height'))
      }
    }

    const scale = animatableValue(canvas?.scale)
    const left = mx / scale + (memo?.from?.left ?? 0)
    const top = mx / scale + (memo?.from?.top ?? 0)
    const width = mx / scale + (memo?.from?.width ?? 0)
    const height = my / scale + (memo?.from?.height ?? 0)
    // console.log(direction)

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
