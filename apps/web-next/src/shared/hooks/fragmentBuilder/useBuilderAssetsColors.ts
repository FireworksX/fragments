import { Color } from 'react-color'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useContext } from 'react'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { popoutNames } from '@/shared/data'
import { getRandomColor } from '@/shared/utils/random'
import { getEntityName } from '@/shared/utils/getEntityName'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { definition } from '@fragmentsx/definition'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const { documentManager } = useBuilderDocument()
  const [fragmentGraph] = useGraph(documentManager, documentManager.fragment)
  const solidStyleValues = useGraphStack(documentManager, fragmentGraph?.solidPainStyles ?? [])

  const editColor = (styleKey: string, options?: OpenPopoutOptions<'colorPicker'>) => {
    if (styleKey && documentManager) {
      popoutsStore.open(popoutNames.stackSolidPaintStyle, {
        position: 'left',
        context: {
          link: styleKey
        },
        ...options
      })
    }
  }

  const createColor = ({ initialColor, onSubmit: optionsOnSubmit, ...popoutOptions }: BuilderAssetsColorsOptions) => {
    const color = initialColor ?? getRandomColor()
    const link = documentManager.createSolidPaintStyle({
      name: getEntityName('Color variable', documentManager, definition.nodes.SolidPaintStyle),
      color
    })

    popoutsStore.open(popoutNames.stackSolidPaintStyle, {
      position: 'left',
      context: {
        link,
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
