import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { definitions } from '@fragments/plugin-state'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { toPx } from '@/shared/utils/toPx'

export const useBorderStyles = (graph: Graph) => {
  const { getColor } = useDisplayColor()

  if (!graph) return {}

  const borderType = graph.resolveField('borderType')
  const borderWidth = graph.resolveField('borderWidth')
  const borderColor = graph.resolveField('borderColor')

  return {
    border: to([borderType, borderWidth, getColor(borderColor)], (type, width, color) => {
      if (typeof type === 'string' && (type !== definitions) !== definitions.borderType.None) {
        return `${toPx(width)} ${type.toLowerCase()} ${color}`
      }
      return ''
    })
  }
}
