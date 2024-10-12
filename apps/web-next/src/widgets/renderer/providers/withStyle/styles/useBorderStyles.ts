import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { borderType } from '@fragments/plugin-state'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { toPx } from '@/shared/utils/toPx'
import { objectToColorString } from '@fragments/utils'

export const useBorderStyles = (graph: Graph) => {
  const { getColor } = useDisplayColor()

  if (!graph) return {}

  const borderTypeValue = graph.resolveField('borderType')
  const borderWidthValue = graph.resolveField('borderWidth')
  const borderColorValue = graph.resolveField('borderColor')

  return {
    border: to([borderTypeValue, borderWidthValue, getColor(borderColorValue)], (type, width, color) => {
      if (typeof type === 'string' && type !== borderType.None) {
        return `${toPx(width)} ${type.toLowerCase()} ${objectToColorString(color)}`
      }
      return ''
    })
  }
}
