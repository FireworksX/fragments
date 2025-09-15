import { fieldsConfig } from './fieldsConfig'
import { useCallback, useMemo } from 'react'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerVariable, UseLayerVariableOptions } from '@/shared/hooks/fragmentBuilder/useLayerVariable'
import { isVariableLink } from '@/shared/utils/isVariableLink'

interface Options
  extends Pick<UseLayerVariableOptions, 'setName' | 'createName' | 'onSetValue' | 'skipUseDefaultValue'> {
  fieldValue?: unknown
  editAfterCreate?: boolean
  ignoreDefaultSetValue?: boolean
  onResetVariable?: () => void
}

export const useLayerPropertyValue = (field: keyof typeof fieldsConfig, options?: Options) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const fieldEntity = fieldsConfig[field]
  const [fieldValue, setFieldValue, fieldInfo] = useLayerValue(field)
  const resultFieldValue = options?.fieldValue ?? fieldValue
  const resultValueForVariable = options?.fieldValue ?? fieldInfo?.resultValue
  const rawValue = options?.fieldValue ?? fieldInfo?.rawValue
  const isVariable = isVariableLink(resultFieldValue)
  const [variableData] = useGraph(documentManager, isVariable ? resultValueForVariable : null)
  const disabled = !fieldEntity
  const { editProperty } = useFragmentProperties()

  const handleSetValue = useCallback(
    (value: unknown) => {
      setFieldValue(value)

      if (options?.editAfterCreate !== false) {
        editProperty(value)
      }
    },
    [editProperty, options, setFieldValue]
  )

  const layerVariable = useLayerVariable({
    layerKey: selection,
    value: resultFieldValue,
    disabled,
    preferredField: fieldEntity,
    ...options,
    onSetValue: value => {
      if (!options?.ignoreDefaultSetValue) {
        handleSetValue(value)
      }
      options?.onSetValue?.(value)
    }
  })

  const restoreValue = () => {
    fieldInfo?.restore(fieldEntity?.defaultValue)
    options?.onResetVariable?.()
  }

  return {
    fieldEntity,
    fieldValue: resultFieldValue,
    disabled,
    resetVariable: restoreValue,
    editVariable: () => {
      isVariable && editProperty(rawValue)
    },
    variableData: isVariable ? variableData : null,
    actions: layerVariable.actions,
    layerVariable
  }
}
