import { definition } from '@fragmentsx/definition'

import { Entity, LinkKey } from '@graph-state/core'
import { popoutNames } from '@/shared/data'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { declareFragmentProperty } from '@fragmentsx/render-suite'
import { setKey } from '@fragmentsx/utils'
import { useMemo } from 'react'
import { capitalize } from '@/shared/utils/capitalize'
import { useGraphStack } from '@graph-state/react'
import { useStack } from '@/shared/hooks/useStack'

export const FRAGMENT_PROPERTY_TYPES = [
  definition.variableType.Event,
  definition.variableType.Number,
  definition.variableType.Boolean,
  definition.variableType.String,
  definition.variableType.Object,
  definition.variableType.Image,
  definition.variableType.Color,
  definition.variableType.Array
]

export interface EditPropertyOptions {
  initial?: boolean
  position?: 'left' | 'right'
}

interface CreatePropertyOptions {
  type: keyof typeof definition.variableType
  parent?: string // Ref to other Variable:123
  name?: string
}

export const useFragmentProperties = () => {
  const { documentManager } = useBuilderDocument()
  const [propertiesLinks] = useLayerValue('properties', documentManager?.$fragment?.root)
  const propertiesLayers = useGraphStack(documentManager, propertiesLinks)
  const stack = useStack()

  const properties = useMemo(() => (propertiesLayers ?? []).filter(prop => !prop.parent), [propertiesLayers])

  // const { allowVariables, openVariable } = useBuilderVariableCreator()
  // const { getTransformsByType, createComputedValue } = useBuilderVariableTransforms()

  const createProperty = (prop: CreatePropertyOptions) => {
    return declareFragmentProperty(documentManager, {
      _type: definition.nodes.Variable,
      name: capitalize(prop.type),
      ...prop,
      parent: prop?.parent ? setKey(prop.parent) : prop.parent
    })
  }

  const deleteProperty = (prop: Entity) => {
    const resolveProperty = documentManager.resolve(prop)

    if (resolveProperty?.type === definition.variableType.Object) {
      // Удаляем fields у объекта
      Object.values(resolveProperty?.fields ?? {}).forEach(deleteProperty)
    }

    documentManager.invalidate(prop)
  }

  const editProperty = (propertyLink: LinkKey, popoutOptions?: EditPropertyOptions) => {
    const property = documentManager.resolve(propertyLink)

    if (property) {
      const type = property?.type

      const popoutName = {
        [definition.variableType.Number]: popoutNames.stackNumberProperty,
        [definition.variableType.Boolean]: popoutNames.stackBooleanProperty,
        [definition.variableType.Object]: popoutNames.stackObjectProperty,
        // [builderVariableType.Object]: stackObjectVariableName,
        [definition.variableType.String]: popoutNames.stackStringProperty,
        [definition.variableType.Color]: popoutNames.stackColorProperty,
        [definition.variableType.Link]: popoutNames.stackLinkProperty,
        [definition.variableType.Enum]: popoutNames.stackEnumProperty,
        [definition.variableType.Event]: popoutNames.stackEventProperty,
        [definition.variableType.Image]: popoutNames.stackImageProperty,
        [definition.variableType.Array]: popoutNames.stackArrayProperty
      }[type]

      stack.open(
        popoutName,
        {
          propertyLink
        },
        {
          initial: popoutOptions?.initial ?? true,
          position: popoutOptions?.position ?? 'right'
        }
      )
    }
  }

  const getTransformsVariableByType = (
    targetType: keyof typeof definition.variableType,
    variableGraph: keyof typeof definition.variableType,
    onSelect
  ) => {
    const transforms = getTransformsByType(variableGraph.type)

    if (targetType === variableGraph.type) {
      if (targetType === variableType.Boolean) {
        // allowConditions = [builderVariableTransforms.feature, builderVariableTransforms.notFeature]
      } else {
        return []
      }
    }

    return transforms.map(transform => {
      return {
        ...transform,
        onClick: () => {
          const computedValue = createComputedValue({
            transform,
            inputValue: documentManager.keyOfEntity(variableGraph),
            inputType: variableGraph.type,
            outputType: targetType
          })

          onSelect({ transform, value: computedValue })
        }
      }
    })
  }

  const getAllowedVariablesByType = (type: keyof typeof variableType, onSelect: (selection) => unknown) => {
    if (!type) return []
    // return propertyLinks.map(variableLink => {
    //   const variableGraph = documentManager.resolve(variableLink)
    //   return {
    //     link: variableLink,
    //     label: variableGraph.name,
    //     transforms: [], //getTransformsVariableByType(type, variableGraph, onSelect),
    //     onClick: () => onSelect({ value: variableLink })
    //   }
    // })
  }

  return {
    documentManager,
    createProperty,
    editProperty,
    deleteProperty,
    properties: properties ?? [],
    // openVariable,
    getAllowedVariablesByType,
    FRAGMENT_PROPERTY_TYPES
  }
}
