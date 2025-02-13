import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderHighlightSelected } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useBuilderHighlightSelected'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderHighlightBreakpoints } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useBuilderHighlightBreakpoints'

export const useBuilderHighlightNew = () => {
  const { canvas } = useBuilderCanvas()
  const { selection } = useBuilderSelection()
  const { selectedStyles, parentStyles } = useBuilderHighlightSelected()
  useBuilderHighlightBreakpoints()

  return {
    selectedStyles,
    parentStyles,
    opacity: canvas.isMoving.to(v => (v || !selection ? 0 : 1))
  }
}
