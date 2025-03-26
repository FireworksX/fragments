import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useFragmentComputedValues } from '@/shared/hooks/fragmentBuilder/useFragmentComputedValues'
import { useBuilderVariableCreator } from '@/shared/hooks/fragmentBuilder/useBuilderVariableCreator'
import { definition } from '@fragments/definition'

import { Entity, LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { declareFragmentProperty } from '@fragments/render-core'

export const FRAGMENT_PROPERTY_TYPES = [
  definition.variableType.Number,
  definition.variableType.Boolean,
  definition.variableType.String,
  definition.variableType.Object
]

interface EditPropertyOptions {
  initial?: boolean
  position?: 'left' | 'right'
}

export const useFragmentProperties = () => {
  const { documentManager } = useBuilderDocument()
  const [properties] = useLayerValue('properties', documentManager.$fragment.root)

  // const { allowVariables, openVariable } = useBuilderVariableCreator()
  // const { getTransformsByType, createComputedValue } = useBuilderVariableTransforms()

  const createProperty = (prop: { type: string }) => {
    return declareFragmentProperty(documentManager, { _type: nodes.Variable, ...prop })
  }

  const deleteProperty = (prop: Entity) => {
    documentManager.invalidate(prop)
  }

  const editProperty = (propertyLink: LinkKey, popoutOptions?: EditPropertyOptions) => {
    const property = documentManager.resolve(propertyLink)

    if (property) {
      const type = property?.type

      const popoutName = {
        [definition.variableType.Number]: popoutNames.stackNumberProperty,
        [definition.variableType.Boolean]: popoutNames.stackBooleanProperty,
        // [builderVariableType.Object]: stackObjectVariableName,
        [definition.variableType.String]: popoutNames.stackStringProperty,
        [definition.variableType.Color]: popoutNames.stackColorProperty
      }[type]

      popoutsStore.open(popoutName, {
        initial: popoutOptions?.initial ?? true,
        position: popoutOptions?.position ?? 'right',
        context: {
          propertyLink
        }
      })
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
    createProperty,
    editProperty,
    deleteProperty,
    properties: properties ?? [],
    // openVariable,
    getAllowedVariablesByType,
    FRAGMENT_PROPERTY_TYPES
  }
}
