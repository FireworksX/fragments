import { Color } from 'react-color'
import { popoutsStore } from '@/app/store/popouts.store'
import { useContext } from 'react'
import { builderNodes, createSolidPaintStyle } from '@fragments/fragments-plugin/performance'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { BuilderContext } from '@/builder/BuilderContext'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const { documentManager } = useContext(BuilderContext)
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
            const style = documentManager.resolve(styleKey)
            style.update(newColor)
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
