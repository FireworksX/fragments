import { builderVariableTransforms, builderVariableType } from '@fragments/fragments-plugin'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { LinkKey } from '@graph-state/core'

const variableTransforms = {
  convertFromBoolean: {
    type: builderVariableTransforms.equals,
    key: builderVariableTransforms.convertFromBoolean,
    isNegative: false,
    label: 'Convert',
    transforms: [builderVariableTransforms.convertFromBoolean]
  },
  equals: {
    type: builderVariableTransforms.equals,
    key: builderVariableTransforms.equals,
    isNegative: false,
    label: 'Equals',
    transforms: [builderVariableTransforms.equals, builderVariableTransforms.convertFromBoolean]
  },
  notEquals: {
    type: builderVariableTransforms.equals,
    key: `!${builderVariableTransforms.equals}`,
    isNegative: true,
    label: 'Not Equals',
    transforms: [
      builderVariableTransforms.equals,
      builderVariableTransforms.negative,
      builderVariableTransforms.convertFromBoolean
    ]
  },
  gte: {
    type: builderVariableTransforms.gte,
    key: builderVariableTransforms.gte,
    isNegative: false,
    label: 'Greater than or Equals',
    transforms: [builderVariableTransforms.gte, builderVariableTransforms.convertFromBoolean]
  }
}

const defaultValueByType = {
  [builderVariableType.Number]: 0
}

const numberTransforms = [variableTransforms.equals, variableTransforms.notEquals, variableTransforms.gte]

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

const transformsByType = {
  [builderVariableType.Number]: [variableTransforms.equals, variableTransforms.notEquals, variableTransforms.gte]
}

interface ComputedValueEntity {
  transform: {
    label: string
    transforms: keyof (typeof builderVariableTransforms)[]
  }
  inputValue: LinkKey
  // Тип, который обслуживает переменная
  inputType: keyof typeof builderVariableType
  // К какому типу по итогу нужно привести
  outputType: keyof typeof builderVariableType
}

export const useBuilderVariableTransforms = () => {
  const { documentManager } = useContext(BuilderContext)

  const getTransformsByType = type => transformsByType[type] ?? []

  const createComputedValue = ({ inputValue, transform, outputType, inputType }: ComputedValueEntity) => {
    const transformLinks = transform.transforms.map(transform => {
      const defaultValue = defaultValueByType[inputType]
      if (transform === builderVariableTransforms.convertFromBoolean) {
        return documentManager.createTransformValue(builderVariableTransforms.convertFromBoolean, {
          outputType,
          truthy: defaultValue,
          falsy: defaultValue
        })
      }

      return documentManager.createTransformValue(transform, { value: defaultValue })
    })

    const computedValueLink = documentManager.createComputedValue({
      inputValue,
      outputType,
      transforms: transformLinks
    })

    return computedValueLink
  }

  return {
    getTransformsByType,
    createComputedValue
  }
}
