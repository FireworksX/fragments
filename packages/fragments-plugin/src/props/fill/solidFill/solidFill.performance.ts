import { SpringValue } from '@react-spring/web'
import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SolidPaint } from '../../../types/props'
import { isLinkKey, LinkKey } from '@graph-state/core'
import { builderNodes } from 'src'

export const getDefaultFillColor = ({ r, g, b, a } = {}): SolidPaint => ({
  r: new SpringValue(r ?? 86),
  g: new SpringValue(g ?? 196),
  b: new SpringValue(b ?? 187),
  a: new SpringValue(a ?? 1)
})

export const solidFillProps: Resolver = (state, graph) => {
  const setSolidFillLink = (link: LinkKey) => {
    const linkGraph = state.resolve(link)
    if (linkGraph && linkGraph._type === builderNodes.SolidPaintStyle) {
      state.mutate(state.keyOfEntity(graph), {
        solidFill: link
      })
    }
  }

  const setSolidFill = colorOrLink => {
    if (isLinkKey(colorOrLink)) {
      setSolidFillLink(colorOrLink)
    } else {
      const solidFill = state.resolve(graph).solidFill
      const linkGraph = state.safeResolve(colorOrLink)

      if (solidFill && linkGraph) {
        Object.entries(colorOrLink).forEach(([key, value]) => {
          if (key in solidFill) {
            solidFill[key].set(value)
          }
        })
      } else {
        state.mutate(state.keyOfEntity(graph), {
          solidFill: getDefaultFillColor(colorOrLink)
        })
      }
    }
  }

  return {
    solidFill: clonedField(state, graph, 'solidFill', getDefaultFillColor()),
    setSolidFill
  }
}
