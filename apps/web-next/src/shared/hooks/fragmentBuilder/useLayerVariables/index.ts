import { fieldsConfig } from './fieldsConfig'
import { useCallback } from 'react'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { pick } from '@fragments/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useLayerVariables = (field: keyof typeof fieldsConfig) => {
  const { documentManager } = useBuilderDocument()
  const [fieldValue, setFieldValue, fieldInfo] = useLayerValue(field)
  const { properties: propertiesLinks, createProperty } = useFragmentProperties()
  const properties = useGraphStack(documentManager, propertiesLinks, {
    selector: data => (data ? pick(data, 'type', 'name') : data)
  })
  const disabled = !(field in fieldsConfig)

  const getVariableName = (preferredName: string) => {
    const countOfSameNames = properties.filter(prop => prop?.name?.startsWith?.(preferredName)).length
    return countOfSameNames > 0 ? `${preferredName}_${countOfSameNames + 1}` : preferredName
  }

  const createVariable = useCallback(() => {
    const fieldEntity = fieldsConfig[field]
    const preferredName = getVariableName(fieldEntity.name)
    const property = createProperty({
      ...fieldEntity,
      name: preferredName,
      defaultValue: fieldValue ?? fieldEntity?.defaultValue
    })
    setFieldValue?.(property)
  }, [createProperty, field, fieldValue, getVariableName, setFieldValue])

  return {
    disabled,
    createVariable,
    resetVariable: fieldInfo?.restore,
    variableLink: fieldInfo?.isVariable ? fieldInfo.rawValue : null,
    actions: !disabled
      ? [
          {
            name: 'createVariable',
            label: 'Create variable',
            onClick: () => createVariable()
          }
        ]
      : []
  }
}
