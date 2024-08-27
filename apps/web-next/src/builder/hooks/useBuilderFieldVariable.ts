import { Field } from 'react-hook-form'
import { capitalize } from '@/app/utils/capitalize'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderVariableCreator } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariableCreator'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import { useBuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariables'
import { LinkKey } from '@graph-state/core'
import { ResultSetter } from '@/builder/hooks/useLayerInvoker'
import { animatableValue } from '@/builder/utils/animatableValue'
import { popoutsStore } from '@/app/store/popouts.store'
import { stackVariableTransformName } from '@/builder/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

export type BuilderFieldVariable = ReturnType<ReturnType<typeof useBuilderFieldVariable>>

const variableFields = { opacity: builderVariableType.Number, visible: builderVariableType.Boolean }

export const useBuilderFieldVariable = (layer: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const { variables, propsLinks, getAllowedVariablesByType } = useBuilderVariables()

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

  const handleConnectVariable = ({ key, selection, setter }) => {
    const { value, transform } = selection

    if (transform) {
      popoutsStore.open(stackVariableTransformName, {
        description: key,
        position: 'right',
        initial: true,
        context: {
          fieldKey: key,
          value,
          onReset: () => {
            handleReset(key)
            popoutsStore.close()
          }
        }
      })
    }

    setter(value)
  }

  return (key: string, setter: ResultSetter, currentValue: unknown) => {
    const hasConnector = key in variableFields
    const allowedVariables = getAllowedVariablesByType(variableFields[key], selection =>
      handleConnectVariable({ selection, setter, key })
    ).map(variable => ({
      ...variable,
      options: [variable.transforms]
    }))

    return {
      hasConnector,
      handleReset: () => handleReset(key),
      actions: hasConnector
        ? [
            {
              label: 'Create variable',
              onClick: () => handleCreateVariable(key, setter, currentValue)
            },
            {
              label: 'Set variable',
              options: [allowedVariables],
              disabled: allowedVariables.length === 0
            }
          ]
        : []
    }
  }
}
