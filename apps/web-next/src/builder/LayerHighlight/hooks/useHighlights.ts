import { useContext, useEffect } from 'react'
import { to, useSpring, useSpringRef, useSprings } from '@react-spring/web'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { findRefNode } from '@/builder/utils/findRefNode'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useHighlightHover } from '@/builder/LayerHighlight/hooks/useHighlightHover'
import { useHighlightFocus } from '@/builder/LayerHighlight/hooks/useHighlightFocus'
import { useHighlightDragging } from '@/builder/LayerHighlight/hooks/useHighlightDragging'

export const useHighlights = () => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const hoverStyles = useHighlightHover()
  const { parentStyles, focusStyles } = useHighlightFocus()
  const { draggingParentStyles, draggingTargetStyles } = useHighlightDragging()

  return {
    hoverStyles,
    focusStyles,
    parentStyles,
    draggingTargetStyles,
    draggingParentStyles,
    opacity: canvas.isMoving ? 0 : 1
  }
}
