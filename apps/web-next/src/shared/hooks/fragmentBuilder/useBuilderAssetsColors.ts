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
import { useProject } from '@/shared/hooks/useProject'
import { LinkKey } from '@graph-state/core'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const { properties, updateProperties } = useProject()
  const colorProperties = properties?.filter(prop => prop.type === definition.variableType.Color)

  const updateProperty = (propertyId: string, nextProperty: unknown) => {
    const index = properties.findIndex(el => el._id === propertyId)
    const updatesProperties = properties.toSpliced(index, 1, {
      ...properties.at(index),
      ...nextProperty
    })

    updateProperties(updatesProperties)
  }

  const editColor = (propertyId: string, options?: OpenPopoutOptions<'colorPicker'>) => {
    const propertyEntity = colorProperties.find(el => el._id === propertyId)

    if (propertyEntity) {
      popoutsStore.open(popoutNames.stackSolidPaintStyle, {
        position: 'left',
        context: {
          ...propertyEntity,
          onSubmit: nextProperty => updateProperty(propertyId, nextProperty)
        },
        ...options
      })
    }
  }

  const createColor = ({ initialColor, onSubmit: optionsOnSubmit, ...popoutOptions }: BuilderAssetsColorsOptions) => {
    popoutsStore.open(popoutNames.stackSolidPaintStyle, {
      position: 'left',
      context: {
        onSubmit: nextProperty => updateProperties([...properties, nextProperty])
      },
      ...popoutOptions
    })
    // const color = initialColor ?? getRandomColor()
    // const link = documentManager.createSolidPaintStyle({
    //   name: getEntityName('Color variable', documentManager, definition.nodes.SolidPaintStyle),
    //   color
    // })
    //
    // popoutsStore.open(popoutNames.stackSolidPaintStyle, {
    //   position: 'left',
    //   context: {
    //     link,
    //     ...popoutOptions
    //   }
    // })
  }

  const removeColor = (styleKey: string) => {
    documentManager?.invalidate(styleKey)
  }

  return {
    colorProperties,
    createColor,
    editColor,
    removeColor
  }
}
