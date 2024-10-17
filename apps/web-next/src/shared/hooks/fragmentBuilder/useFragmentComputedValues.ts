import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/shared/store/popouts.store'
import { variableTransforms, variableType } from '@fragments/plugin-state'
// import { stackVariableTransformName } from '@/builder/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

const computedValuesConfig = {
  convertFromBoolean: {
    type: variableTransforms.equals,
    key: variableTransforms.convertFromBoolean,
    isNegative: false,
    label: 'Convert',
    transforms: [variableTransforms.convertFromBoolean]
  },
  equals: {
    type: variableTransforms.equals,
    key: variableTransforms.equals,
    isNegative: false,
    label: 'Equals',
    transforms: [variableTransforms.equals, variableTransforms.convertFromBoolean]
  },
  notEquals: {
    type: variableTransforms.equals,
    key: `!${variableTransforms.equals}`,
    isNegative: true,
    label: 'Not Equals',
    transforms: [variableTransforms.equals, variableTransforms.negative, variableTransforms.convertFromBoolean]
  },
  gt: {
    type: variableTransforms.gt,
    key: variableTransforms.gt,
    isNegative: false,
    label: 'Greater than',
    transforms: [variableTransforms.gt, variableTransforms.convertFromBoolean]
  },
  gte: {
    type: variableTransforms.gte,
    key: variableTransforms.gte,
    isNegative: false,
    label: 'Greater than or Equals',
    transforms: [variableTransforms.gte, variableTransforms.convertFromBoolean]
  },
  lt: {
    type: variableTransforms.lt,
    key: variableTransforms.lt,
    isNegative: false,
    label: 'Less than',
    transforms: [variableTransforms.lt, variableTransforms.convertFromBoolean]
  },
  lte: {
    type: variableTransforms.lte,
    key: variableTransforms.lte,
    isNegative: false,
    label: 'Less than or Equals',
    transforms: [variableTransforms.lte, variableTransforms.convertFromBoolean]
  }
}

const defaultValueByType = {
  [variableType.Number]: 0,
  [variableType.Boolean]: true
}

const computedValuesByType = {
  [variableType.Number]: [
    variableTransforms.equals,
    variableTransforms.notEquals,
    variableTransforms.gte,
    variableTransforms.gt,
    variableTransforms.lte,
    variableTransforms.lt
  ],
  [variableType.Boolean]: [variableTransforms.equals, variableTransforms.notEquals]
}

interface ComputedValueEntity {
  transform: {
    label: string
    transforms: keyof (typeof variableTransforms)[]
  }
  inputValue: LinkKey
  // Тип, который обслуживает переменная
  inputType: keyof typeof variableType
  // К какому типу по итогу нужно привести
  outputType: keyof typeof variableType
}

interface OpenComputedValueOptions {}

export const useFragmentComputedValues = () => {
  const { documentManager } = useContext(BuilderContext)

  const getTransformsByType = type =>
    (transformsByType[type] ?? []).map(transformType => variableTransformsConfig[transformType]).filter(Boolean)

  const createComputedValue = ({ inputValue, transform, outputType, inputType }: ComputedValueEntity) => {
    console.log(inputValue, transform, inputType, outputType)
    const transformLinks = transform.transforms.map(transform => {
      if (transform === variableTransformsConfig.convertFromBoolean) {
        const defaultOutputValue = defaultValueByType[outputType]
        return documentManager.createTransformValue(variableTransformsConfig.convertFromBoolean, {
          outputType,
          truthy: defaultOutputValue,
          falsy: defaultOutputValue
        })
      }

      return documentManager.createTransformValue(transform, { value: defaultValueByType[inputType] })
    })
    //
    const computedValueLink = documentManager.createComputedValue({
      inputValue,
      inputType,
      outputType,
      transforms: transformLinks
    })

    console.log(transformLinks, computedValueLink)

    return ''
  }

  return {
    getTransformsByType,
    createComputedValue
  }
}
