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

export const useBuilderAssetsColors = documentManager => {
  const solidStyles = useGraphFields(documentManager, builderNodes.SolidPaintStyle)
  const solidStyleValues = useGraphStack(documentManager, solidStyles)

  const editColor = (styleKey: string, options?: OpenPopoutOptions<'colorPicker'>) => {
    if (styleKey && documentManager) {
      const variableValue = documentManager.resolve?.(styleKey)

      popoutsStore.open('colorPicker', {
        position: 'left',
        context: {
          value: variableValue?.color,
          withoutStack: true,
          onChange: newColor => {
            documentManager.mutate(styleKey, {
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
          const styleKey = documentManager.createSolidPaintStyle(newColor)
          optionsOnSubmit && optionsOnSubmit(styleKey)
        },
        ...popoutOptions
      }
    })
  }

  const removeColor = (styleKey: string) => {
    documentManager?.invalidate(styleKey)
  }

  return {
    colorVariables: solidStyleValues,
    createColor,
    editColor,
    removeColor
  }
}
