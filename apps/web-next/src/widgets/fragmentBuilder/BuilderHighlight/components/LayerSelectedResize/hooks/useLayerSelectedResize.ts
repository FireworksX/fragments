import { useDrag } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { definition } from '@fragments/definition'
import { useGraph } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { createConstants } from '@fragments/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to } from '@react-spring/web'
import { getDomRect } from '@/shared/utils/getDomRect'
import { SCALE } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvas'
import { toPx } from '@/shared/utils/toPx'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { getParent } from '@fragments/render-core'

export const SELECTION_SIDES = createConstants('topLeft', 'top', 'right', 'bottom', 'left')

export const useLayerSelectedResize = () => {
  const { documentManager } = useBuilderDocument()
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const { selection } = useBuilderSelection()
  const { type } = useLayerInfo(selection)
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()
  const [top, setTop] = useLayerValue('top')
  const [left, setLeft] = useLayerValue('left')
  const [width, setWidth] = useLayerValue('width')
  const [height, setHeight] = useLayerValue('height')
  const [widthType] = useLayerValue('widthType')
  const [heightType] = useLayerValue('heightType')

  const handler = useDrag(({ movement: [mx, my], args: [directions], first, memo = {}, dragging }) => {
    canvasManager.setResizing(dragging)

    if (first) {
      const targetWidthType = widthType
      const targetHeightType = heightType
      const targetLeft = left
      const targetTop = top
      const targetRect = getDomRect(selection)
      const parentRect = getDomRect(documentManager.keyOfEntity(getParent(documentManager, selection)))

      memo.from = {
        getWidth: move => {
          if (targetWidthType === definition.sizing.Relative) {
            move = (move / parentRect.width) * 100
          }
          return move / scale + (memo?.from?.width ?? 0)
        },
        getHeight: move => {
          if (targetHeightType === definition.sizing.Relative) {
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
    const calcWidth = memo.from?.getWidth(mx)
    const calcHeight = memo.from?.getHeight(my)

    if (directions.includes(SELECTION_SIDES.right)) {
      setWidth(calcWidth)
    }
    if (directions.includes(SELECTION_SIDES.bottom)) {
      setHeight(calcHeight)
    }

    if (directions.includes(SELECTION_SIDES.left)) {
      const width = memo.from.getWidth(mx * -1)
      if (width > 0) {
        setWidth(width)
        setLeft(memo.from.getLeft(mx))
      }
    }

    if (directions.includes(SELECTION_SIDES.top)) {
      const height = memo.from.getHeight(my * -1)
      if (height > 0) {
        setHeight(height)
        setTop(memo.from.getTop(my))
      }
    }

    return memo
  })

  const size = useMemo(() => canvas.scale.to([SCALE.min, SCALE.max], [10, 4]).to(toPx), [canvas.scale])
  const borderWidth = useMemo(() => canvas.scale.to([SCALE.min, SCALE.max], [1, 0.8]).to(toPx), [canvas.scale])

  return {
    isInstance: type === definition.nodes.FragmentInstance,
    handler,
    isAllowResizeWidth,
    isAllowResizeHeight,
    size,
    borderWidth
  }
}
