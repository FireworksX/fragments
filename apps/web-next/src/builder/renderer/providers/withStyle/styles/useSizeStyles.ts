import { to } from '@react-spring/web'
import { Graph } from '@graph-state/core'

export const useSizeStyles = (graph: Graph) => {
  if (!graph) return {}

  const graphRect = graph?.rect?.() ?? {}

  return {
    width: to([graphRect], rect => rect.width),
    height: to([graphRect], rect => rect.height)
  }
}
