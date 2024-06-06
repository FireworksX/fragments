import { Color } from 'react-color'
import { popoutsStore } from '@/app/store/popouts.store'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderNodes, createSolidPaintStyle } from '@fragments/fragments-plugin'
import { useGraphFields, useGraphStack } from '@graph-state/react'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const { graphState } = useContext(BuilderContext)
  const solidStyles = useGraphFields(graphState, builderNodes.SolidPaintStyle)
  const solidStyleValues = useGraphStack(graphState, solidStyles)

  const editColor = (styleKey: string, options?: OpenPopoutOptions<'colorPicker'>) => {
    if (styleKey && graphState) {
      const variableValue = graphState.resolve?.(styleKey)

      popoutsStore.open('colorPicker', {
        position: 'left',
        context: {
          value: variableValue?.color,
          withoutStack: true,
          onChange: newColor => {
            graphState.mutate(styleKey, {
              color: newColor
            })
          }
        },
        ...options
      })
    }
  }

  const createColor = ({
    initialColor,
    onSubmit: optionsOnSubmit,
    initial,
    ...popoutOptions
  }: BuilderAssetsColorsOptions) => {
    popoutsStore.open('createColor', {
      initial,
      position: 'left',
      context: {
        initialColor,
        onSubmit: newColor => {
          const styleKey = graphState.createSolidPaintStyle(newColor)
          optionsOnSubmit && optionsOnSubmit(styleKey)
        },
        ...popoutOptions
      }
    })
  }

  const removeColor = (styleKey: string) => {
    graphState?.invalidate(styleKey)
  }

  return {
    colorVariables: solidStyleValues,
    createColor,
    editColor,
    removeColor
  }
}
