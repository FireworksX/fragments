import { DragEvent } from '@/builder/views/BuilderEditable/widgets/BuilderCanvas/hooks/useCanvas'
import { animatableValue } from '@/builder/utils/animatableValue'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

export const useDragMove = () => {
  const { canvasManager } = useContext(BuilderContext)

  return ({ memo, movement: [mx, my], first }: DragEvent) => {
    if (first) {
      memo.from = {
        x: animatableValue(memo.targetLayer.resolveField('x')),
        y: animatableValue(memo.targetLayer.resolveField('y'))
      }
    }

    const scale = animatableValue(canvasManager.resolve(canvasManager)?.scale)
    const y = my / scale + (memo?.from?.y ?? 0)
    const x = mx / scale + (memo?.from?.x ?? 0)

    return {
      x,
      y
    }
  }
}
