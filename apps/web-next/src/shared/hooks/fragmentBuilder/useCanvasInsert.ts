import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraphEffect } from '@graph-state/react'

export const useCanvasInsert = () => {
  const { builderManager } = use(BuilderContext)

  useGraphEffect(builderManager, builderManager.canvasDroppableKey, data => {
    const { active, over } = data ?? {}

    if (active && over) {
      console.log(active, over)
    }
  })
}
