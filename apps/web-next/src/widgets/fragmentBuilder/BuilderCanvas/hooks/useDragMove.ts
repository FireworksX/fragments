import { DragEvent } from './useCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useDragMove = () => {
  const { canvasManager } = useContext(BuilderContext)

  return ({ memo, movement: [mx, my], first }: DragEvent) => {
    if (first) {
      const rect = animatableValue(memo.targetLayer?.rect?.())

      memo.from = {
        x: animatableValue(rect.x),
        y: animatableValue(rect.y)
      }
    }

    const scale = animatableValue(canvasManager.resolve(canvasManager)?.scale)
    const x = mx / scale + (memo?.from?.x ?? 0)
    const y = my / scale + (memo?.from?.y ?? 0)

    return {
      x,
      y
    }
  }
}
