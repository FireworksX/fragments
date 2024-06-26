import { Color } from 'react-color'
import { useCallback, useContext } from 'react'
import { displayColor } from '@/app/utils/displayColor'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { BuilderContext } from '@/builder/BuilderContext'

export const useDisplayColor = (inputColor?: Color) => {
  const { documentManager } = useContext(BuilderContext)
  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle && resolveValue?.color
      return displayColor(variableValue || color)
    },
    [documentManager]
  )

  const getNameColor = useCallback(
    (color?: Color) => {
      const resolveValue = documentManager?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle

      return variableValue ? resolveValue?.name : displayColor(color)
    },
    [documentManager]
  )

  return {
    getColor,
    getNameColor,
    color: getColor(inputColor)
  }
}
