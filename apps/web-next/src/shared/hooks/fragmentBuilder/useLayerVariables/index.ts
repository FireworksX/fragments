import { fieldsConfig } from './fieldsConfig'
import { useCallback, useMemo } from 'react'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { pick } from '@fragments/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useLayerVariables = (field: keyof typeof fieldsConfig) => {
  const { documentManager } = useBuilderDocument()
  const [fieldValue, setFieldValue, fieldInfo] = useLayerValue(field)
  const { properties: propertiesLinks, createProperty, editProperty } = useFragmentProperties()
  const properties = useGraphStack(documentManager, propertiesLinks, {
    selector: data => (data ? pick(data, '_id', '_type', 'type', 'name') : data)
  })
  const disabled = !(field in fieldsConfig)
  const fieldType = fieldsConfig?.[field]?.type

  const getVariableName = (preferredName: string) => {
    const countOfSameNames = properties.filter(prop => prop?.name?.startsWith?.(preferredName)).length
    return countOfSameNames > 0 ? `${preferredName} ${countOfSameNames + 1}` : preferredName
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
    editProperty(property)
  }, [createProperty, editProperty, field, fieldValue, getVariableName, setFieldValue])

  const allowVariables = useMemo(() => {
    const allowProps = properties.filter(
      prop => prop?.type === fieldType && documentManager.keyOfEntity(prop) !== fieldValue
    )

    if (allowProps.length) {
      return [
        {
          name: 'setVariable',
          label: 'Set variable',
          options: [
            allowProps.map(prop => ({
              label: prop?.name,
              name: prop?.name,
              onClick: () => {
                setFieldValue?.(documentManager.keyOfEntity(prop))
              }
            }))
          ]
        }
      ]
    }

    return []
  }, [documentManager, fieldType, fieldValue, properties, setFieldValue])

  const restoreValue = () => {
    const fieldEntity = fieldsConfig[field]
    fieldInfo?.restore(fieldEntity?.defaultValue)
  }

  return {
    disabled,
    createVariable,
    resetVariable: restoreValue,
    editVariable: () => {
      fieldInfo?.isVariable && editProperty(fieldInfo?.rawValue)
    },
    variableLink: fieldInfo?.isVariable ? fieldInfo?.rawValue : null,
    actions: !disabled
      ? [
          {
            name: 'createVariable',
            label: 'Create variable',
            onClick: () => createVariable()
          }
        ].concat(allowVariables)
      : []
  }
}
