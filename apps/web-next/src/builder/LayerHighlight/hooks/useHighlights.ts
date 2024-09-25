import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useHighlightHover } from '@/builder/LayerHighlight/hooks/useHighlightHover'
import { useLayerHighlightSelect } from '@/builder/LayerHighlight/hooks/useLayerHighlightSelect'
import { useHighlightDragging } from '@/builder/LayerHighlight/hooks/useHighlightDragging'

export const useHighlights = () => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const hoverStyles = useHighlightHover()
  const { parentStyles: selectParentStyles, selectStyles, dragHandler } = useLayerHighlightSelect()
  const { draggingParentStyles, draggingTargetStyles } = useHighlightDragging()

  return {
    hoverStyles,
    selectStyles,
    selectParentStyles,
    draggingTargetStyles,
    draggingParentStyles,
    dragHandler,
    opacity: canvas.isMoving ? 0 : 1
  }
}
