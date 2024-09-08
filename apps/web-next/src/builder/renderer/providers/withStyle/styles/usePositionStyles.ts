import { toPx } from '@/app/utils/toPx'
import { Graph } from '@graph-state/core'

export const usePositionStyles = (graph: Graph) => {
  const positionType = graph.resolveField('positionType') ?? 'absolute'

  if (positionType === 'absolute') {
    return {
      position: positionType,
      top: graph.resolveField('y'),
      left: graph.resolveField('x')
    }
  }

  return {
    position: positionType
  }
}
