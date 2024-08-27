import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { builderVariableType, builderVariableTransforms } from '@fragments/fragments-plugin/performance'
import { useBuilderVariableCreator } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariableCreator'
import { useBuilderVariableTransforms } from '@/builder/hooks/useBuilderVariableTransforms'

type PropType = keyof typeof builderVariableType

const numberTransforms = [
  builderVariableTransforms.equals,
  builderVariableTransforms.notEquals,
  builderVariableTransforms.gt,
  builderVariableTransforms.gte,
  builderVariableTransforms.lt,
  builderVariableTransforms.lte
]

const booleanTransforms = [builderVariableTransforms.convert]
const stringTransforms = [
  builderVariableTransforms.convert,
  builderVariableTransforms.exists,
  builderVariableTransforms.notExists,
  builderVariableTransforms.equals,
  builderVariableTransforms.notEquals,
  builderVariableTransforms.startWith,
  builderVariableTransforms.notStartWith,
  builderVariableTransforms.endWith,
  builderVariableTransforms.notEndWith,
  builderVariableTransforms.contains,
  builderVariableTransforms.notContains
]

const transformsLabels = {
  [builderVariableTransforms.feature]: 'Feature',
  [builderVariableTransforms.notFeature]: 'Not Feature',
  [builderVariableTransforms.convert]: 'Convert',
  [builderVariableTransforms.exists]: 'Is Set',
  [builderVariableTransforms.notExists]: 'Is`t Set',
  [builderVariableTransforms.equals]: 'Equals',
  [builderVariableTransforms.notEquals]: 'Not Equals',
  [builderVariableTransforms.startWith]: 'Start With',
  [builderVariableTransforms.endWith]: 'End With',
  [builderVariableTransforms.notStartWith]: 'Not Start With',
  [builderVariableTransforms.notEndWith]: 'Not End With',
  [builderVariableTransforms.contains]: 'Contains',
  [builderVariableTransforms.notContains]: 'Not Contains',
  [builderVariableTransforms.dateBefore]: 'Before',
  [builderVariableTransforms.dateAfter]: 'After',
  [builderVariableTransforms.dateBetween]: 'Between',
  [builderVariableTransforms.gt]: 'Greater Than',
  [builderVariableTransforms.gte]: 'Greater Than or Equals',
  [builderVariableTransforms.lt]: 'Less Than',
  [builderVariableTransforms.lte]: 'Less Than or Equals'
}

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

    // if (targetType === variableGraph.type) {
    //   if (targetType === builderVariableType.Boolean) {
    //     // allowConditions = [builderVariableTransforms.feature, builderVariableTransforms.notFeature]
    //   } else {
    //     allowConditions = []
    //   }
    // }

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
