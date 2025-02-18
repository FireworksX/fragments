import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderHighlightSelected } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useBuilderHighlightSelected'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderHighlightBreakpoints } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useBuilderHighlightBreakpoints'
import { useSpringValue } from '@react-spring/web'
import { useGraphEffect } from '@graph-state/react'
import { useEffect } from 'react'

export const useBuilderHighlightNew = () => {
  const { canvas } = useBuilderCanvas()
  const { selection } = useBuilderSelection()
  const opacity = useSpringValue(0)
  const { selectedStyles, parentStyles } = useBuilderHighlightSelected()

  const breakpoints = useBuilderHighlightBreakpoints()

  useEffect(() => {
    opacity.set(canvas?.isMoving || canvas.isDragging || !selection ? 0 : 1)
  }, [canvas?.isMoving, canvas.isDragging, selection, opacity])

  return {
    selectedStyles,
    parentStyles,
    breakpoints,
    opacity,
    canvas
  }
}
