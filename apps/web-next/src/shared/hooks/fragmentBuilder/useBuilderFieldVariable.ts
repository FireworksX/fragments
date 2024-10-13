import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import { ResultSetter } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { animatableValue } from '@/shared/utils/animatableValue'
import { isComputedValueLink } from '@/shared/utils/isComputedValueLink'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
// import {
//   stackVariableTransformName
// } from '@/widgets/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

export type BuilderFieldVariable = ReturnType<ReturnType<typeof useBuilderFieldVariable>>

const variableFields = {
  opacity: {
    type: builderVariableType.Number,
    valueOptions: {
      step: 0.1,
      max: 1,
      min: 0,
      withSlider: true
    }
  },
  visible: {
    type: builderVariableType.Boolean
  }
}

export const useBuilderFieldVariable = (layer: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const { variables, propsLinks, getAllowedVariablesByType } = useFragmentProperties()

  const getVariableName = (preferredNAme: string) => {
    const currentLinks = propsLinks.map(documentManager.resolve)
    const countOfSameNames = currentLinks.filter(prop => prop.name.startsWith(preferredNAme)).length
    return countOfSameNames > 0 ? `${preferredNAme}_${countOfSameNames + 1}` : preferredNAme
  }

  const handleReset = (key: string) => {
    documentManager.restoreField(layer, key)
  }

  const handleCreateVariable = (key: string, setter: ResultSetter, currentValue: unknown) => {
    if (key === 'opacity') {
      const variableCreator = variables.find(v => v.type === builderVariableType.Number)
      const variableLink = variableCreator.createAndAppend(
        {
          name: getVariableName('opacity'),
          step: 0.1,
          min: 0,
          max: 1,
          displayStepper: false,
          defaultValue: animatableValue(currentValue)
        },
        { initial: true, position: 'right' }
      )
      setter(variableLink)
    }
  }

  const openTransform = ({ key, value }) => {
    const valueOptions = variableFields[key]?.valueOptions ?? {}

    // todo: fsd
    // popoutsStore.open(stackVariableTransformName, {
    //   description: key,
    //   position: 'right',
    //   initial: true,
    //   context: {
    //     fieldKey: key,
    //     value,
    //     valueReferenceOptions: valueOptions,
    //     onReset: () => {
    //       handleReset(key)
    //       popoutsStore.close()
    //     }
    //   }
    // })
  }

  const handleConnectVariable = ({ key, selection, setter }) => {
    const { value, transform } = selection

    if (transform) {
      openTransform({ key, value })
    }

    setter(value)
  }

  return (key: string, setter: ResultSetter, currentValue: unknown) => {
    const hasConnector = key in variableFields
    const allowedVariables = (
      getAllowedVariablesByType(variableFields[key]?.type, selection =>
        handleConnectVariable({ selection, setter, key })
      ) ?? []
    ).map(variable => ({
      ...variable,
      options: [variable.transforms]
    }))
    const isComputedValue = isComputedValueLink(currentValue)

    return {
      hasConnector,
      handleReset: () => handleReset(key),
      handleClickTransform: () => isComputedValue && openTransform({ key, value: currentValue }),
      actions: hasConnector
        ? [
            {
              key: 'createVariable',
              label: 'Create variable',
              onClick: () => handleCreateVariable(key, setter, currentValue)
            },
            {
              key: 'setVariable',
              label: 'Set variable',
              options: [allowedVariables],
              disabled: allowedVariables.length === 0
            },
            isComputedValue && {
              key: 'editTransform',
              label: 'Edit Transform',
              onClick: () => openTransform({ key, value: currentValue })
            }
          ].filter(Boolean)
        : []
    }
  }
}
