import { toPercent } from '@/app/utils/toPercent'
import { to } from '@react-spring/web'
import { Graph } from '@graph-state/core'
import { definitions } from '@fragments/plugin-state'

export const useSizeStyles = (graph: Graph) => {
  const layoutSizingHorizontal = graph.resolveField('layoutSizingHorizontal')
  const layoutSizingVertical = graph.resolveField('layoutSizingVertical')
  const widthValue = graph.resolveField('width')
  const heightValue = graph.resolveField('height')

  const getValue = (sizing: keyof typeof definitions.sizing, value: number) => {
    switch (sizing) {
      case definitions.sizing.Hug:
        return 'fit-content'
      case definitions.sizing.Fill:
        return 'auto'
      case definitions.sizing.Fixed:
        return value
      case definitions.sizing.Relative:
        return toPercent(value)
      default:
        return 'auto'
    }
  }

  return {
    width: to([layoutSizingHorizontal, widthValue], (sizing, value) => getValue(sizing, value)),
    height: to([layoutSizingVertical, heightValue], (sizing, value) => getValue(sizing, value))
  }
}
