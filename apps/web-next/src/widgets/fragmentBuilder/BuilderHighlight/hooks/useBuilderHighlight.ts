import { use, useContext, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderHighlight = () => {
  const { canvasManager, documentManager } = use(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)

  return {
    opacity: canvas.isMoving.to(v => (v ? 0 : 1))
  }
}
