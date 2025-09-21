import { Color } from 'react-color'
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
import { useStack } from '@/shared/hooks/useStack'

export interface BuilderAssetsColorsOptions extends Partial<OpenPopoutOptions<'colorPicker'>> {
  initialColor?: Color
  onSubmit?: (colorVariable: Variable<string, StackPanelColorEntity>) => void
}

export const useBuilderAssetsColors = () => {
  const { open: openStack } = useStack()
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
      openStack(
        popoutNames.stackSolidPaintStyle,
        {
          ...propertyEntity,
          onSubmit: nextProperty => updateProperty(propertyId, nextProperty)
        },
        {
          position: 'left',
          ...options
        }
      )
    }
  }

  const createColor = ({ initialColor, onSubmit: optionsOnSubmit, ...popoutOptions }: BuilderAssetsColorsOptions) => {
    openStack(
      popoutNames.stackSolidPaintStyle,
      {
        defaultValue: initialColor,
        onSubmit: nextProperty => updateProperties([...properties, nextProperty])
      },
      {
        position: 'left',
        ...popoutOptions
      }
    )
  }

  const removeColor = (styleKey: string) => {
    documentManager?.invalidate(styleKey)
  }

  const propertiesMap = colorProperties.reduce((acc, prop) => {
    acc[prop._id] = prop.defaultValue
    return acc
  }, {})

  return {
    propertiesMap,
    colorProperties,
    createColor,
    editColor,
    removeColor
  }
}
