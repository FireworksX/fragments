import { DragEvent } from './useCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { getFieldValue } from '@fragments/plugin-fragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useDragMove = () => {
  const { canvasManager } = useContext(BuilderContext)
  const { documentManager } = useBuilderDocument()

  return ({ memo, movement: [mx, my], first }: DragEvent) => {
    if (first) {
      const left = animatableValue(getFieldValue(memo.targetLayer, 'left', documentManager))
      const top = animatableValue(getFieldValue(memo.targetLayer, 'top', documentManager))

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
