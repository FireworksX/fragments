import { Color } from 'react-color'
import { useCallback, useContext } from 'react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { BuilderContext } from '@/builder/BuilderContext'
import { isGraphOrKey, LinkKey } from '@graph-state/core'
import { displayColorInterpolate } from '@/shared/utils/displayColor'

export const useDisplayColor = (inputColor?: Color) => {
  const { documentManager } = useContext(BuilderContext)
  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle && resolveValue?.color
      return displayColorInterpolate(variableValue || color)
    },
    [documentManager]
  )

  const getColorStatic = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue =
        (resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle && resolveValue?.color) || resolveValue

      return variableValue || color
    },
    [documentManager]
  )

  const getNameColor = useCallback(
    (color?: Color | LinkKey) => {
      if (color && isGraphOrKey(color)) {
        const resolvedGraph = documentManager?.resolve(color)
        if (resolvedGraph?._type === builderNodes.SolidPaintStyle) {
          return resolvedGraph?.name
        }
        if (resolvedGraph?._type === builderNodes.Fill) {
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
