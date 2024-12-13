import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { ResultSetter } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { animatableValue } from '@/shared/utils/animatableValue'
import { isComputedValueLink } from '@/shared/utils/isComputedValueLink'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { variableType } from '@fragments/plugin-state'
import { DropdownRenderOption } from '@/shared/ui/RenderDropdown'
import { useFragmentComputedValues } from '@/shared/hooks/fragmentBuilder/useFragmentComputedValues'
import { noop } from '@fragments/utils'
import { popoutsStore } from '@/shared/store/popouts.store'
import { stackVariableTransformName } from '@/features/popouts/StackVariableTransform/StackVariableTransform'
import { popoutNames } from '@/shared/data'
import { generateJSON, generateText } from '@tiptap/core'
import { canvasEditorExtensions } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor'
// import {
//   stackVariableTransformName
// } from '@/widgets/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

export type BuilderFieldVariable = ReturnType<ReturnType<typeof useBuilderFieldVariable>>

const variableFields = {
  opacity: {
    type: variableType.Number,
    valueOptions: {
      name: 'Opacity',
      step: 0.1,
      max: 1,
      min: 0,
      withSlider: true
    }
  },
  visible: {
    type: variableType.Boolean,
    valueOptions: {
      name: 'Visible'
    }
  },
  content: {
    type: variableType.String,
    createFormatter: value => {
      if (value) {
        return generateText(generateJSON(value, canvasEditorExtensions), canvasEditorExtensions)
      }

      return value
    },
    valueOptions: {
      name: 'Content'
    }
  }
}

export const useBuilderFieldVariable = (layer: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const { properties, createProperty, editProperty } = useFragmentProperties()
  const { createComputedValue, getTransformsByType } = useFragmentComputedValues()

  const getVariableName = (preferredName: string) => {
    const countOfSameNames = properties.filter(prop => prop.name.startsWith(preferredName)).length
    return countOfSameNames > 0 ? `${preferredName}_${countOfSameNames + 1}` : preferredName
  }

  const handleReset = (key: string) => {
    documentManager.restoreField(layer, key)
  }

  const openTransform = ({ key, value }) => {
    const valueOptions = variableFields[key]?.valueOptions ?? {}

    popoutsStore.open(popoutNames.stackVariableTransform, {
      description: key,
      position: 'right',
      initial: true,
      context: {
        fieldKey: key,
        value,
        valueReferenceOptions: valueOptions,
        onReset: () => {
          handleReset(key)
          popoutsStore.close()
        }
      }
    })
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
    // const allowedVariables = (
    //   getAllowedVariablesByType(variableFields[key]?.type, selection =>
    //     handleConnectVariable({ selection, setter, key })
    //   ) ?? []
    // ).map(variable => ({
    //   ...variable,
    //   options: [variable.transforms]
    // }))

    const getPropertiesForField = (field: string): DropdownRenderOption[] => {
      if (field in variableFields) {
        const fieldValue = variableFields[field]

        return properties
          .map(prop => {
            const transforms = fieldValue.type === prop.type ? [] : getTransformsByType(prop.type)

            // if ()

            if (prop.type !== fieldValue.type) return null

            return {
              label: prop.name ?? prop?._id,
              // options: [
              //   transforms.map(transform => ({
              //     label: transform.label,
              //     onClick: () => {
              //       const computedValue = createComputedValue({
              //         inputValue: documentManager.keyOfEntity(prop),
              //         outputType: fieldValue.type,
              //         transform,
              //         inputType: prop.type
              //       })
              //
              //       setter(computedValue)
              //     }
              //   }))
              // ],
              onClick:
                transforms?.length === 0
                  ? () => {
                      setter(prop)
                    }
                  : noop
            }
          })
          .filter(Boolean)
      }

      return []
    }

    const handleCreateVariable = () => {
      const variableField = variableFields[key]

      if (variableField) {
        const variableValueOptions = variableField.valueOptions
        const createdProperty = createProperty(variableField.type)

        if (variableValueOptions && 'name' in variableValueOptions) {
          createdProperty.rename(getVariableName(variableValueOptions.name))
        }

        const defaultValue =
          variableField?.createFormatter?.(animatableValue(currentValue)) ?? animatableValue(currentValue)

        createdProperty.setDefaultValue(defaultValue)

        if (variableField.type === variableType.Number) {
          if ('step' in variableValueOptions) createdProperty.setStep(variableValueOptions.step)
          if ('min' in variableValueOptions) createdProperty.setMin(variableValueOptions.min)
          if ('max' in variableValueOptions) createdProperty.setMax(variableValueOptions.max)
          if ('max' in variableValueOptions) createdProperty.setMax(variableValueOptions.max)
          if ('withSlider' in variableValueOptions) createdProperty.setDisplayStepper(!variableValueOptions.withSlider)
        }

        editProperty(createdProperty)
        setter(documentManager.keyOfEntity(createdProperty))
      }
    }

    const fieldVariables = getPropertiesForField(key)
    const isComputedValue = isComputedValueLink(currentValue)

    return {
      hasConnector,
      handleReset: () => handleReset(key),
      handleClickTransform: () =>
        isComputedValue ? openTransform({ key, value: currentValue }) : editProperty(currentValue),
      actions: hasConnector
        ? [
            {
              key: 'createVariable',
              label: 'Create variable',
              onClick: () => handleCreateVariable()
            },
            {
              key: 'setVariable',
              label: 'Set variable',
              options: [fieldVariables],
              disabled: fieldVariables.length === 0
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
