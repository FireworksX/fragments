import { Color } from 'react-color'
// import { useStore } from '@nanostores/react'
// import { $statex } from '../store/builderRouterStore'
import { useCallback, useContext } from 'react'
import { displayColor } from '@/app/utils/displayColor'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin'

export const useDisplayColor = (inputColor?: Color) => {
  const { graphState } = useContext(BuilderContext)

  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = graphState?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle && resolveValue?.color
      return displayColor(variableValue || color)
    },
    [graphState]
  )

  const getNameColor = useCallback(
    (color?: Color) => {
      const resolveValue = graphState?.resolve?.(color)
      const variableValue = resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle

      return variableValue ? resolveValue?.name : displayColor(color)
    },
    [graphState]
  )

  return {
    getColor,
    getNameColor,
    color: getColor(inputColor)
  }
}
