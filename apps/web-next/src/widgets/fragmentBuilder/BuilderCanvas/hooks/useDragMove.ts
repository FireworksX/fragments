import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { getParent } from '@fragmentsx/render-core'
import { getDomRect } from '@/shared/utils/getDomRect'
import { keyOfEntity } from '@graph-state/core'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { isFiniteNumber } from '@fragmentsx/utils'
import { useDrag } from '@use-gesture/react'

export const useDragMove = () => {
  const { documentManager } = useBuilderDocument()
  const { canvas } = useBuilderCanvas()

  const [, setTop, { rawValue: baseTop }] = useLayerValue('top')
  const [, setRight, { rawValue: baseRight }] = useLayerValue('right')
  const [, setBottom, { rawValue: baseBottom }] = useLayerValue('bottom')
  const [, setLeft, { rawValue: baseLeft }] = useLayerValue('left')
  const [baseCenterX, setCenterAnchorX] = useLayerValue('centerAnchorX')
  const [baseCenterY, setCenterAnchorY] = useLayerValue('centerAnchorY')

  return ({ memo, movement: [mx, my], first }: DragEvent) => {
    if (first) {
      const layerParent = getParent(documentManager, memo.targetLayerLink)
      const layerRect = getDomRect(keyOfEntity(memo.targetLayerLink))
      const parentRect = getDomRect(keyOfEntity(layerParent))

      memo.from = {
        top: baseTop,
        right: baseRight,
        bottom: baseBottom,
        left: baseLeft,
        centerX: baseCenterX,
        centerY: baseCenterY,
        width: layerRect.width,
        height: layerRect.height
      }
      memo.parentRect = parentRect
    }

    const scale = animatableValue(canvas?.scale)

    const deltaX = mx / scale
    const deltaY = my / scale

    // Обработка перемещения по X оси
    if (isFiniteNumber(memo.from.left) && isFiniteNumber(memo.from.right)) {
      // Растягивание: оба констрейнта активны
      const newLeft = memo.from.left + deltaX
      const newRight = memo.from.right - deltaX
      setLeft(newLeft)
      setRight(newRight)
    } else if (isFiniteNumber(memo.from.left)) {
      // Только left констрейнт активен
      const newLeft = memo.from.left + deltaX
      setLeft(newLeft)

      // Автоматически обновляем right если он был задан
      if (isFiniteNumber(memo.from.right)) {
        const newRight = memo.parentRect.width - newLeft - memo.from.width
        setRight(newRight)
      }
    } else if (isFiniteNumber(memo.from.right)) {
      // Только right констрейнт активен
      const newRight = memo.from.right - deltaX
      setRight(newRight)

      // Автоматически обновляем left если он был задан
      if (isFiniteNumber(memo.from.left)) {
        const newLeft = memo.parentRect.width - newRight - memo.from.width
        setLeft(newLeft)
      }
    }

    // Обработка перемещения по Y оси
    if (isFiniteNumber(memo.from.top)) {
      const newTop = memo.from.top + deltaY
      setTop(newTop)

      // Автоматически обновляем bottom
      if (isFiniteNumber(memo.from.bottom)) {
        const newBottom = memo.parentRect.height - newTop - memo.from.height
        setBottom(newBottom)
      }
    } else if (isFiniteNumber(memo.from.bottom)) {
      const newBottom = memo.from.bottom - deltaY
      setBottom(newBottom)

      // Автоматически обновляем top
      if (isFiniteNumber(memo.from.top)) {
        const newTop = memo.parentRect.height - newBottom - memo.from.height
        setTop(newTop)
      }
    }

    setCenterAnchorX(memo?.from?.centerX + mx / scale / memo.parentRect.width)
    setCenterAnchorY(memo?.from?.centerY + my / scale / memo.parentRect.height)
  }
}
