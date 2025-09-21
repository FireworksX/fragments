import { useDrag } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { definition } from '@fragmentsx/definition'
import { useGraph } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { createConstants, finiteNumber } from '@fragmentsx/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to } from '@react-spring/web'
import { getDomRect } from '@/shared/utils/getDomRect'
import { toPx } from '@/shared/utils/toPx'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { getParent } from '@fragmentsx/render-core'
import { SCALE } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvasDrag'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

export const SELECTION_SIDES = createConstants('topLeft', 'top', 'right', 'bottom', 'left')

export const useLayerSelectedResize = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const { type } = useLayerInfo(selection)
  const [scale$] = useBuilderCanvasField('scale')
  const [, setIsResizing] = useBuilderCanvasField('isResizing')
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()
  const [baseTop, setTop, { value$: top$, setWithAutoPatch: setWithAutoPatchTop }] = useLayerValue('top')
  const [baseLeft, setLeft, { value$: left$, setWithAutoPatch: setWithAutoPatchLeft }] = useLayerValue('left')
  const [baseBottom, setBottom, { setWithAutoPatch: setWithAutoPatchBottom }] = useLayerValue('bottom')
  const [baseRight, setRight, { setWithAutoPatch: setWithAutoPatchRight }] = useLayerValue('right')
  const [, setWidth, { value$: width$, setWithAutoPatch: setWithAutoPatchWidth }] = useLayerValue('width')
  const [, setHeight, { value$: height$, setWithAutoPatch: setWithAutoPatchHeight }] = useLayerValue('height')
  const [widthType] = useLayerValue('widthType')
  const [heightType] = useLayerValue('heightType')

  const handler = useDrag(({ movement: [mx, my], args: [directions], first, last, memo = {}, dragging }) => {
    setIsResizing(dragging)

    if (first) {
      const targetWidthType = widthType
      const targetHeightType = heightType
      const targetLeft = animatableValue(left$)
      const targetTop = animatableValue(top$)
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
        width: animatableValue(width$),
        height: animatableValue(height$),
        right: baseRight,
        left: baseLeft,
        bottom: baseBottom,
        top: baseTop,
        hasConstrainX: finiteNumber(baseLeft) && finiteNumber(baseRight),
        hasConstrainY: finiteNumber(baseTop) && finiteNumber(baseBottom)
      }
    }

    const scale = animatableValue(scale$)
    const calcWidth = memo.from?.getWidth(mx)
    const calcHeight = memo.from?.getHeight(my)
    const resultSetRight = last ? setWithAutoPatchRight : setRight
    const resultSetBottom = last ? setWithAutoPatchBottom : setBottom
    const resultSetLeft = last ? setWithAutoPatchLeft : setLeft
    const resultSetTop = last ? setWithAutoPatchTop : setTop
    const resultSetWidth = last ? setWithAutoPatchWidth : setWidth
    const resultSetHeight = last ? setWithAutoPatchHeight : setHeight

    if (directions.includes(SELECTION_SIDES.right)) {
      if (finiteNumber(memo.from.right)) {
        resultSetRight(memo.from.right - (calcWidth - memo.from.width))
      }

      resultSetWidth(calcWidth)
    }

    if (directions.includes(SELECTION_SIDES.bottom)) {
      if (finiteNumber(memo.from.bottom)) {
        resultSetBottom(memo.from.bottom - (calcHeight - memo.from.height))
      }

      resultSetHeight(calcHeight)
    }

    if (directions.includes(SELECTION_SIDES.left)) {
      const width = memo.from.getWidth(mx * -1)

      if (finiteNumber(memo.from.left)) {
        resultSetLeft(memo.from.getLeft(mx))
      }
      if (width > 0) {
        resultSetWidth(width)
      }
    }

    if (directions.includes(SELECTION_SIDES.top)) {
      const height = memo.from.getHeight(my * -1)

      if (finiteNumber(memo.from.top)) {
        resultSetTop(memo.from.getTop(my))
      }
      if (height > 0) {
        resultSetHeight(height)
      }
    }

    return memo
  })

  const size = useMemo(() => scale$.to([SCALE.min, SCALE.max], [10, 4]).to(toPx), [scale$])
  const borderWidth = useMemo(() => scale$.to([SCALE.min, SCALE.max], [1, 0.8]).to(toPx), [scale$])

  return {
    isInstance: type === definition.nodes.FragmentInstance,
    handler,
    isAllowResizeWidth,
    isAllowResizeHeight,
    size,
    borderWidth
  }
}
