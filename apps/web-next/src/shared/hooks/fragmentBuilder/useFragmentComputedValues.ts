import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/shared/store/popouts.store'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
// import { stackVariableTransformName } from '@/builder/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

const computedValuesConfig = {
  convertFromBoolean: {
    type: definition.variableTransforms.equals,
    key: definition.variableTransforms.convertFromBoolean,
    isNegative: false,
    label: 'Convert',
    transforms: [definition.variableTransforms.convertFromBoolean]
  },
  equals: {
    type: definition.variableTransforms.equals,
    key: definition.variableTransforms.equals,
    isNegative: false,
    label: 'Equals',
    transforms: [definition.variableTransforms.equals, definition.variableTransforms.convertFromBoolean]
  },
  notEquals: {
    type: definition.variableTransforms.equals,
    key: `!${definition.variableTransforms.equals}`,
    isNegative: true,
    label: 'Not Equals',
    transforms: [
      definition.variableTransforms.equals,
      definition.variableTransforms.negative,
      definition.variableTransforms.convertFromBoolean
    ]
  },
  gt: {
    type: definition.variableTransforms.gt,
    key: definition.variableTransforms.gt,
    isNegative: false,
    label: 'Greater than',
    transforms: [definition.variableTransforms.gt, definition.variableTransforms.convertFromBoolean]
  },
  gte: {
    type: definition.variableTransforms.gte,
    key: definition.variableTransforms.gte,
    isNegative: false,
    label: 'Greater than or Equals',
    transforms: [definition.variableTransforms.gte, definition.variableTransforms.convertFromBoolean]
  },
  lt: {
    type: definition.variableTransforms.lt,
    key: definition.variableTransforms.lt,
    isNegative: false,
    label: 'Less than',
    transforms: [definition.variableTransforms.lt, definition.variableTransforms.convertFromBoolean]
  },
  lte: {
    type: definition.variableTransforms.lte,
    key: definition.variableTransforms.lte,
    isNegative: false,
    label: 'Less than or Equals',
    transforms: [definition.variableTransforms.lte, definition.variableTransforms.convertFromBoolean]
  }
}

const defaultValueByType = {
  [definition.variableType.Number]: 0,
  [definition.variableType.Boolean]: true
}

const computedValuesByType = {
  [definition.variableType.Number]: [
    definition.variableTransforms.equals,
    definition.variableTransforms.notEquals,
    definition.variableTransforms.gte,
    definition.variableTransforms.gt,
    definition.variableTransforms.lte,
    definition.variableTransforms.lt
  ],
  [definition.variableType.Boolean]: [definition.variableTransforms.equals, definition.variableTransforms.notEquals]
}

interface ComputedValueEntity {
  transform: {
    label: string
    transforms: keyof (typeof definition.variableTransforms)[]
  }
  inputValue: LinkKey
  // Тип, который обслуживает переменная
  inputType: keyof typeof definition.variableType
  // К какому типу по итогу нужно привести
  outputType: keyof typeof definition.variableType
}

interface OpenComputedValueOptions {}

export const useFragmentComputedValues = () => {
  const { documentManager } = useBuilderDocument()

  const getTransformsByType = type =>
    (computedValuesByType[type] ?? []).map(transformType => computedValuesConfig[transformType]).filter(Boolean)

  const createComputedValue = ({ inputValue, transform, outputType, inputType }: ComputedValueEntity) => {
    const transformLinks = transform.transforms.map(transform => {
      if (transform === variableTransforms.convertFromBoolean) {
        const defaultOutputValue = defaultValueByType[outputType]
        return documentManager.createTransformValue(variableTransforms.convertFromBoolean, {
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

    return computedValueLink
  }

  return {
    getTransformsByType,
    createComputedValue
  }
}
