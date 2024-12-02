import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { nodes } from '@fragments/plugin-state'

export const usePositionStyles = (graph: Graph) => {
  const { isCanvas } = useRenderTarget()
  if (!graph) return {}

  const positionType = graph.resolveField('positionType') ?? 'absolute'

  if (positionType === 'absolute') {
    if (graph?._type !== nodes.Breakpoint || isCanvas) {
      const rect = graph.rect?.()

      return {
        position: positionType,
        left: to(rect, rectValue => rectValue?.x ?? 0),
        top: to(rect, rectValue => rectValue?.y ?? 0)
      }
    }
  }

  return {
    position: positionType
  }
}
