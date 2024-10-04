import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useDrag } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { createConstants } from '@fragments/utils'
import { sizing } from '@fragments/plugin-state'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

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
      const targetRectProps = documentManager.constraints.fromProperties(focusNode)
      const parentRect = animatableValue(focusNode.getParent()?.rect?.() ?? {})
      const targetRect = animatableValue(focusNode?.rect?.() ?? {})
      const width = animatableValue(focusNode.resolveField('width'))
      const height = animatableValue(focusNode.resolveField('height'))

      memo.from = {
        getWidth: move => {
          if (targetRectProps.widthType === sizing.Relative) {
            move = (move / parentRect.width) * 100
          }
          return move / scale + (memo?.from?.width ?? 0)
        },
        getHeight: move => {
          if (targetRectProps.heightType === sizing.Relative) {
            move = (move / parentRect.height) * 100
          }
          return move / scale + (memo?.from?.height ?? 0)
        },
        getLeft: move => move / scale + (targetRect.x ?? 0),
        getTop: move => move / scale + (targetRect.y ?? 0),
        width,
        height
      }
    }

    const scale = animatableValue(canvas?.scale)
    const width = memo.from?.getWidth(mx)
    const height = memo.from?.getHeight(my)

    if (directions.includes(SELECTION_SIDES.right)) {
      focusNode.setWidth(width)
    }
    if (directions.includes(SELECTION_SIDES.bottom)) {
      focusNode.setHeight(height)
    }

    if (directions.includes(SELECTION_SIDES.left)) {
      const width = memo.from.getWidth(mx * -1)
      if (width > 0) {
        focusNode.setWidth(width)
        focusNode.move(memo.from.getLeft(mx))
      }
    }

    if (directions.includes(SELECTION_SIDES.top)) {
      const height = memo.from.getHeight(my * -1)
      if (height > 0) {
        focusNode.setHeight(height)
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
