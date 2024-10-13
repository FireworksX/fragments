import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { propertyType } from '@fragments/plugin-state'
import { useBuilderVariableTransforms } from '@/shared/hooks/fragmentBuilder/useBuilderVariableTransforms'
import { useBuilderVariableCreator } from '@/shared/hooks/fragmentBuilder/useBuilderVariableCreator'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'

export const FRAGMENT_PROPERTY_TYPES = [
  propertyType.Number,
  propertyType.Boolean,
  propertyType.String,
  propertyType.Object
]

interface EditPropertyOptions {
  initial?: boolean
  position?: 'left' | 'right'
}

export const useFragmentProperties = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragment] = useGraph(documentManager, documentManager.key)
  const propertyLinks = fragment?.properties ?? []
  const properties = useGraphStack(documentManager, propertyLinks)
  const { allowVariables, openVariable } = useBuilderVariableCreator()
  const { getTransformsByType, createComputedValue } = useBuilderVariableTransforms()

  const createProperty = type => {
    return fragment.createProperty(type)
  }

  const editProperty = (propertyLink: LinkKey, popoutOptions?: EditPropertyOptions) => {
    const property = documentManager.resolve(propertyLink)
    console.log(property)
    if (property) {
      const type = property?.type

      const popoutName = {
        [propertyType.Number]: popoutNames.stackNumberProperty,
        [propertyType.Boolean]: popoutNames.stackBooleanProperty,
        // [builderVariableType.Object]: stackObjectVariableName,
        [propertyType.String]: popoutNames.stackStringProperty
      }[type]

      console.log(popoutName)

      popoutsStore.open(popoutName, {
        initial: popoutOptions?.initial ?? true,
        position: popoutOptions?.position ?? 'left',
        context: {
          propertyLink
        }
      })
    }
  }

  const variables = allowVariables.map(variable => ({
    ...variable,
    createAndAppend: (variableOptions, openOptions) => {
      const link = variable.createVariable(variableOptions)
      fragment.addProp(link)
      if (openOptions) {
        variable.openVariable(link, openOptions)
      }

      return link
    }
  }))

  const getTransformsVariableByType = (
    targetType: keyof typeof propertyType,
    variableGraph: keyof typeof propertyType,
    onSelect
  ) => {
    const transforms = getTransformsByType(variableGraph.type)

    if (targetType === variableGraph.type) {
      if (targetType === propertyType.Boolean) {
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

  const getAllowedVariablesByType = (type: keyof typeof propertyType, onSelect: (selection) => unknown) => {
    if (!type) return []
    return propertyLinks.map(variableLink => {
      const variableGraph = documentManager.resolve(variableLink)
      return {
        link: variableLink,
        label: variableGraph.name,
        transforms: getTransformsVariableByType(type, variableGraph, onSelect),
        onClick: () => onSelect({ value: variableLink })
      }
    })
  }

  return {
    createProperty,
    editProperty,
    propertyLinks,
    properties,
    variables,
    openVariable,
    getAllowedVariablesByType,
    FRAGMENT_PROPERTY_TYPES
  }
}
