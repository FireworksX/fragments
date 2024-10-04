import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useLayerHighlightSelect } from '@/features/fragmentBuilder/LayerHighlightSelect/target'

export const useBuilderHighlight = () => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const { selectStyles, dragHandler, parentStyles } = useLayerHighlightSelect()

  return {
    opacity: canvas.isMoving ? 0 : 1,
    selectStyles,
    parentStyles,
    dragHandler
  }
}
