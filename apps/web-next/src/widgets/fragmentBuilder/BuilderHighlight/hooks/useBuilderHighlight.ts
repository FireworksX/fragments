import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

export const useBuilderHighlight = () => {
  const { canvas } = useBuilderCanvas()

  return {
    opacity: canvas.isMoving.to(v => (v ? 0 : 1))
  }
}
