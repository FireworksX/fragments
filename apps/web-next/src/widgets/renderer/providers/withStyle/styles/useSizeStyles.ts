import { Graph } from '@graph-state/core'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'
import { animatableValue } from '@/shared/utils/animatableValue'

export const useSizeStyles = (graph: Graph) => {
  if (!graph) return {}

  const graphRect = graph?.rect?.() ?? {}
  return extractAnimatableValues(graphRect, ['width', 'height'])
}
