import { useDrag } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { nodes, sizing } from '@fragments/plugin-fragment-spring'
import { useGraph } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { createConstants } from '@fragments/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to } from '@react-spring/web'
import { getDomRect } from '@/shared/utils/getDomRect'
import { getFieldValue } from '@fragments/plugin-fragment'
import { SCALE } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvas'
import { toPx } from '@/shared/utils/toPx'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const SELECTION_SIDES = createConstants('topLeft', 'top', 'right', 'bottom', 'left')

export const useLayerSelectedResize = () => {
  const { canvasManager } = useContext(BuilderContext)
  const { documentManager } = useBuilderDocument()
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const { selectionGraph, selection } = useBuilderSelection()
  const allowResizeHorizontal = selectionGraph?.getAllowResizeHorizontal?.()
  const allowResizeVertical = selectionGraph?.getAllowResizeVertical?.()

  const handler = useDrag(({ movement: [mx, my], args: [directions], first, memo = {}, dragging }) => {
    canvasManager.setResizing(dragging)

    if (first) {
      const targetWidthType = animatableValue(getFieldValue(selection, 'layoutSizingHorizontal', documentManager))
      const targetHeightType = animatableValue(getFieldValue(selection, 'layoutSizingVertical', documentManager))
      const targetLeft = animatableValue(getFieldValue(selection, 'left', documentManager))
      const targetTop = animatableValue(getFieldValue(selection, 'top', documentManager))
      const targetRect = getDomRect(selection)
      const parentRect = getDomRect(documentManager.keyOfEntity(selectionGraph.getParent()))
      const width = animatableValue(getFieldValue(selection, 'width', documentManager))
      const height = animatableValue(getFieldValue(selection, 'height', documentManager))

      memo.from = {
        getWidth: move => {
          if (targetWidthType === sizing.Relative) {
            move = (move / parentRect.width) * 100
          }
          return move / scale + (memo?.from?.width ?? 0)
        },
        getHeight: move => {
          if (targetHeightType === sizing.Relative) {
            move = (move / parentRect.height) * 100
          }
          return move / scale + (memo?.from?.height ?? 0)
        },
        getLeft: move => move / scale + (targetLeft ?? 0),
        getTop: move => move / scale + (targetTop ?? 0),
        width,
        height
      }
    }

    const scale = animatableValue(canvas?.scale)
    const width = memo.from?.getWidth(mx)
    const height = memo.from?.getHeight(my)

    if (directions.includes(SELECTION_SIDES.right)) {
      selectionGraph.setWidth(width)
    }
    if (directions.includes(SELECTION_SIDES.bottom)) {
      selectionGraph.setHeight(height)
    }

    if (directions.includes(SELECTION_SIDES.left)) {
      const width = memo.from.getWidth(mx * -1)
      if (width > 0) {
        selectionGraph.setWidth(width)
        selectionGraph.move(null, memo.from.getLeft(mx))
      }
    }

    if (directions.includes(SELECTION_SIDES.top)) {
      const height = memo.from.getHeight(my * -1)
      if (height > 0) {
        selectionGraph.setHeight(height)
        selectionGraph.move(memo.from.getTop(my))
      }
    }

    return memo
  })

  const size = useMemo(() => canvas.scale.to([SCALE.min, SCALE.max], [10, 4]).to(toPx), [canvas.scale])
  const borderWidth = useMemo(() => canvas.scale.to([SCALE.min, SCALE.max], [1, 0.8]).to(toPx), [canvas.scale])

  return {
    isInstance: selectionGraph?._type === nodes.FragmentInstance,
    handler,
    allowResizeHorizontal,
    allowResizeVertical,
    size,
    borderWidth
  }
}
