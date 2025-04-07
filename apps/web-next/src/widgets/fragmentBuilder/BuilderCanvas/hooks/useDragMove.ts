import { DragEvent, useCanvas } from './useCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { getNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'

export const useDragMove = () => {
  const { canvas } = useBuilderCanvas()

  return ({ memo, movement: [mx, my], first }: DragEvent, from: { x: number; y: number }) => {
    if (first) {
      memo.from = from
    }

    const scale = animatableValue(canvas?.scale)
    const x = mx / scale + (memo?.from?.x ?? 0)
    const y = my / scale + (memo?.from?.y ?? 0)

    return {
      x,
      y
    }
  }
}
