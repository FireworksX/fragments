import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { builderVariableType, builderVariableTransforms } from '@fragments/fragments-plugin/performance'
import { useBuilderVariableCreator } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariableCreator'
import { useBuilderVariableTransforms } from '@/builder/hooks/useBuilderVariableTransforms'

export const useBuilderVariables = () => {
  const { documentManager } = useContext(BuilderContext)
  const [documentGraph] = useGraph(documentManager, documentManager.root)
  const propsLinks = documentGraph.props ?? []
  const { allowVariables, openVariable } = useBuilderVariableCreator()
  const { getTransformsByType, createComputedValue } = useBuilderVariableTransforms()

  const variables = allowVariables.map(variable => ({
    ...variable,
    createAndAppend: (variableOptions, openOptions) => {
      const link = variable.createVariable(variableOptions)
      documentGraph.addProp(link)
      if (openOptions) {
        variable.openVariable(link, openOptions)
      }

      return link
    }
  }))

  const getTransformsVariableByType = (
    targetType: keyof typeof builderVariableType,
    variableGraph: keyof typeof builderVariableType,
    onSelect
  ) => {
    const transforms = getTransformsByType(variableGraph.type)

    if (targetType === variableGraph.type) {
      if (targetType === builderVariableType.Boolean) {
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

  const getAllowedVariablesByType = (type: keyof typeof builderVariableType, onSelect: (selection) => unknown) => {
    if (!type) return []
    return propsLinks.map(variableLink => {
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
    propsLinks,
    variables,
    openVariable,
    getAllowedVariablesByType
  }
}
