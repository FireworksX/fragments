import { Graph } from '@graph-state/core'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'
import { animatableValue } from '@/shared/utils/animatableValue'
import { to } from '@react-spring/web'
import { sizing } from '@fragments/plugin-state'

const autoSizes = [sizing.Hug, sizing.Fill]

export const useSizeStyles = (graph: Graph) => {
  if (!graph) return {}

  const widthType = graph.resolveField('layoutSizingHorizontal')
  const heightType = graph.resolveField('layoutSizingVertical')
  const rect = graph?.rect?.() ?? {}

  return {
    width: to([widthType, rect], (type, rectValues) => {
      if (autoSizes.includes(type)) {
        return 'auto'
      }

      return rectValues.width
    }),
    height: to([heightType, rect], (type, rectValues) => {
      if (autoSizes.includes(type)) {
        return 'auto'
      }
      return rectValues.height
    })
  }
}
