import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'

export const usePositionStyles = (graph: Graph) => {
  if (!graph) return {}

  const positionType = graph.resolveField('positionType') ?? 'absolute'

  if (positionType === 'absolute') {
    const rect = graph.rect?.()

    return {
      position: positionType,
      left: to(rect, rectValue => rectValue?.x ?? 0),
      top: to(rect, rectValue => rectValue?.y ?? 0)
    }
  }

  return {
    position: positionType
  }
}
