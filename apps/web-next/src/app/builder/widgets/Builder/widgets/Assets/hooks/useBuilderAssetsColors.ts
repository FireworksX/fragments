import { Color } from 'react-color'
import { useStore } from '@nanostores/react'
import { builderNodes } from 'src/data/promos/creators'
import { StackPanelColorEntity } from 'src/widgets/StackCollector/components/StackPanelCreateColor/StackPanelCreateColor'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const statex = {} //useStore($statex)
  const solidStyles = [] //useFields(statex, builderNodes.SolidPaintStyle)
  const solidStyleValues = [] //useStatexStack(statex, solidStyles)

  const editColor = (styleKey: string, options?: OpenPopoutOptions<'colorPicker'>) => {
    if (styleKey && statex) {
      const variableValue = statex.resolve?.(styleKey)

      // $openPopout('colorPicker', {
      //   position: 'left',
      //   context: {
      //     value: variableValue?.color,
      //     withoutStack: true,
      //     onChange: newColor => {
      //       statex.mutate(styleKey, {
      //         color: newColor
      //       })
      //     }
      //   },
      //   ...options
      // })
    }
  }

  const createColor = ({
    initialColor,
    onSubmit: optionsOnSubmit,
    initial,
    ...popoutOptions
  }: BuilderAssetsColorsOptions) => {
    // $openPopout('createColor', {
    //   initial,
    //   position: 'left',
    //   context: {
    //     initialColor,
    //     onSubmit: newColor => {
    //       const styleKey = statex?.createSolidPaintStyle(newColor)
    //       optionsOnSubmit && optionsOnSubmit(styleKey)
    //     },
    //     ...popoutOptions
    //   }
    // })
  }

  const removeColor = (styleKey: string) => {
    statex?.invalidate(styleKey)
  }

  return {
    colorVariables: solidStyleValues,
    createColor,
    editColor,
    removeColor
  }
}
