import { SpringValue } from '@react-spring/web'
import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SolidPaint } from '../../../types/props'

export const getDefaultFillColor = ({ r, g, b, a } = {}): SolidPaint => ({
  r: new SpringValue(r ?? 86),
  g: new SpringValue(g ?? 196),
  b: new SpringValue(b ?? 187),
  a: new SpringValue(a ?? 1)
})

export const solidFillProps: Resolver = (state, graph) => {
  const setSolidFill = color => {
    const solidFill = state.resolve(graph).solidFill

    if (solidFill) {
      Object.entries(color).forEach(([key, value]) => {
        if (key in solidFill) {
          solidFill[key].set(value)
        }
      })
    } else {
      state.mutate(state.keyOfEntity(graph), {
        solidFill: {
          ...getDefaultFillColor(color)
        }
      })
    }
  }

  return {
    solidFill: clonedField(state, graph, 'solidFill', getDefaultFillColor()),
    setSolidFill
  }
}
