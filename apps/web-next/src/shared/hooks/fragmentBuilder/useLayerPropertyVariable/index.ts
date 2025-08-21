import { fieldsConfig } from './fieldsConfig'
import { useCallback, useMemo } from 'react'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariable, UseLayerVariableOptions } from '../useLayerVariable'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

interface Options
  extends Pick<UseLayerVariableOptions, 'setName' | 'createName' | 'onSetValue' | 'skipUseDefaultValue'> {
  editAfterCreate?: boolean
  onResetVariable?: () => void
}

export const useLayerPropertyValue = (field: keyof typeof fieldsConfig, options?: Options) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const fieldEntity = fieldsConfig[field]
  const [fieldValue, setFieldValue, fieldInfo] = useLayerValue(field)
  const [variableData] = useGraph(documentManager, fieldInfo?.isVariable ? fieldInfo?.resultValue : null)
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

  const { createVariable, actions } = useLayerVariable({
    layerKey: selection,
    value: fieldValue,
    disabled,
    preferredField: fieldEntity,
    ...options,
    onSetValue: value => {
      handleSetValue(value)
      options?.onSetValue?.(value)
    }
  })

  const restoreValue = () => {
    fieldInfo?.restore(fieldEntity?.defaultValue)
    options?.onResetVariable?.()
  }

  return {
    fieldEntity,
    fieldValue,
    disabled,
    createVariable,
    resetVariable: restoreValue,
    editVariable: () => {
      fieldInfo?.isVariable && editProperty(fieldInfo?.rawValue)
    },
    variableData: fieldInfo?.isVariable ? variableData : null,
    actions
  }
}
