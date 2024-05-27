import { Color } from 'react-color'
// import { useStore } from '@nanostores/react'
// import { $statex } from '../store/builderRouterStore'
import { useCallback } from 'react'
import { displayColor } from '@/app/utils/displayColor'

const builderNodes = {}

export const useDisplayColor = (inputColor?: Color) => {
  const statex = {} //useStore($statex)

  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = statex?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle && resolveValue?.color

      return displayColor(variableValue ?? color)
    },
    [statex]
  )

  const getNameColor = useCallback(
    (color?: Color) => {
      const resolveValue = statex?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle

      return variableValue ? resolveValue?.name : displayColor(color)
    },
    [statex]
  )

  return {
    getColor,
    getNameColor,
    color: getColor(inputColor)
  }
}
