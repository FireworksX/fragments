import { builderVariableTransforms, builderVariableType } from '@fragments/fragments-plugin'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/app/store/popouts.store'
import { stackVariableTransformName } from '@/builder/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

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
  gt: {
    type: builderVariableTransforms.gt,
    key: builderVariableTransforms.gt,
    isNegative: false,
    label: 'Greater than',
    transforms: [builderVariableTransforms.gt, builderVariableTransforms.convertFromBoolean]
  },
  gte: {
    type: builderVariableTransforms.gte,
    key: builderVariableTransforms.gte,
    isNegative: false,
    label: 'Greater than or Equals',
    transforms: [builderVariableTransforms.gte, builderVariableTransforms.convertFromBoolean]
  },
  lt: {
    type: builderVariableTransforms.lt,
    key: builderVariableTransforms.lt,
    isNegative: false,
    label: 'Less than',
    transforms: [builderVariableTransforms.lt, builderVariableTransforms.convertFromBoolean]
  },
  lte: {
    type: builderVariableTransforms.lte,
    key: builderVariableTransforms.lte,
    isNegative: false,
    label: 'Less than or Equals',
    transforms: [builderVariableTransforms.lte, builderVariableTransforms.convertFromBoolean]
  }
}

const defaultValueByType = {
  [builderVariableType.Number]: 0,
  [builderVariableType.Boolean]: true
}

const transformsByType = {
  [builderVariableType.Number]: [
    variableTransforms.equals,
    variableTransforms.notEquals,
    variableTransforms.gte,
    variableTransforms.gt,
    variableTransforms.lte,
    variableTransforms.lt
  ],
  [builderVariableType.Boolean]: [variableTransforms.equals, variableTransforms.notEquals]
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

interface OpenComputedValueOptions {}

export const useBuilderVariableTransforms = () => {
  const { documentManager } = useContext(BuilderContext)

  const getTransformsByType = type => transformsByType[type] ?? []

  const createComputedValue = ({ inputValue, transform, outputType, inputType }: ComputedValueEntity) => {
    const transformLinks = transform.transforms.map(transform => {
      if (transform === builderVariableTransforms.convertFromBoolean) {
        const defaultOutputValue = defaultValueByType[outputType]
        return documentManager.createTransformValue(builderVariableTransforms.convertFromBoolean, {
          outputType,
          truthy: defaultOutputValue,
          falsy: defaultOutputValue
        })
      }

      return documentManager.createTransformValue(transform, { value: defaultValueByType[inputType] })
    })

    const computedValueLink = documentManager.createComputedValue({
      inputValue,
      inputType,
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
