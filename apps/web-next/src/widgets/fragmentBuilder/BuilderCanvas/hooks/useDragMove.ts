import { DragEvent } from './useCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useDragMove = () => {
  const { canvasManager } = useContext(BuilderContext)

  return ({ memo, movement: [mx, my], first }: DragEvent) => {
    if (first) {
      const left = animatableValue(memo.targetLayer?.resolveField('left'))
      const top = animatableValue(memo.targetLayer?.resolveField('top'))

      memo.from = {
        x: left,
        y: top
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
