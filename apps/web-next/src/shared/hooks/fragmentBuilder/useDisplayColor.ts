import { Color } from 'react-color'
import { useCallback, useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { isGraphOrKey, LinkKey } from '@graph-state/core'
import { displayColorInterpolate } from '@/shared/utils/displayColor'
import { Interpolation, SpringValue } from '@react-spring/web'
import { objectToColorString } from '@fragments/utils'
import { nodes } from '@fragments/plugin-fragment-spring'
import { to } from '@fragments/springs-factory'

export const useDisplayColor = (inputColor?: Color) => {
  const { documentManager } = useContext(BuilderContext)
  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === nodes.SolidPaintStyle && resolveValue?.color
      const resultColor = variableValue ?? color

      return resultColor instanceof Interpolation || resultColor instanceof SpringValue
        ? resultColor
        : displayColorInterpolate(resultColor)
    },
    [documentManager]
  )

  const getColorStatic = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue =
        (resolveValue && resolveValue?._type === nodes.SolidPaintStyle && resolveValue?.color) || resolveValue

      return variableValue || color
    },
    [documentManager]
  )

  const getNameColor = useCallback(
    (color?: Color | LinkKey | Interpolation<Color>) => {
      if (color instanceof Interpolation || color instanceof SpringValue) {
        return to(color, objectToColorString)
      }

      if (color && isGraphOrKey(color)) {
        const resolvedGraph = documentManager?.resolve(color)
        if (resolvedGraph?._type === nodes.SolidPaintStyle) {
          return resolvedGraph?.name
        }
        if (resolvedGraph?._type === nodes.SolidPaintStyle) {
          return displayColorInterpolate(resolvedGraph.color)
        }
      }

      return displayColorInterpolate(color)
    },
    [documentManager]
  )

  return {
    getColor,
    getColorStatic,
    getNameColor,
    color: getColor(inputColor)
  }
}
