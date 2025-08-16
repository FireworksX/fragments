import { fieldsConfig } from './fieldsConfig'
import { useCallback, useMemo } from 'react'
import { definition } from '@fragmentsx/definition'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { pick } from '@fragmentsx/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { keyOfEntity, LinkKey } from '@graph-state/core'
import { useLayerDefinitions } from '@/shared/hooks/fragmentBuilder/useLayerDefinitions'

interface PreferredField {
  type: keyof typeof definition.variableType
  name?: string
  defaultValue?: unknown
}

export interface UseLayerVariableOptions {
  layerKey: LinkKey
  preferredField: PreferredField
  value?: unknown
  disabled?: boolean
  createName?: string
  setName?: string
  // editAfterCreate?: boolean
  onSetValue?: (value: unknown) => void
}

export const useLayerVariable = (options: UseLayerVariableOptions) => {
  const { documentManager } = useBuilderDocument()
  const { properties: propertiesLinks, createProperty } = useFragmentProperties()

  const definitions = useLayerDefinitions(options.layerKey)
  const fieldType = options?.preferredField?.type

  const proxySetFieldValue = useCallback(
    (value: unknown) => {
      options?.onSetValue?.(value)
      // setFieldValue(value)
    },
    [options]
  )

  const getVariableName = (preferredName: string) => {
    const properties = propertiesLinks.map(documentManager.resolve)
    const countOfSameNames = properties.filter(prop => prop?.name?.startsWith?.(preferredName)).length
    return countOfSameNames > 0 ? `${preferredName} ${countOfSameNames + 1}` : preferredName
  }

  const createVariable = useCallback(
    (customFields?: unknown) => {
      const fieldEntity = options?.preferredField ?? {}
      const preferredName = getVariableName(fieldEntity.name)
      const property = createProperty({
        ...fieldEntity,
        name: preferredName,
        defaultValue: options?.value ?? fieldEntity?.defaultValue,
        ...(customFields ?? {})
      })

      proxySetFieldValue?.(property)

      // if (options?.editAfterCreate !== false) {
      //   editProperty(property)
      // }
    },
    [options?.preferredField, options?.value, getVariableName, createProperty, proxySetFieldValue]
  )

  const allowVariables = useMemo(() => {
    const allowDefinitions = definitions
      .map(def => def.filter(defEl => defEl?.type === fieldType && keyOfEntity(defEl) !== options.value))
      .filter(def => !!def?.length)

    if (allowDefinitions.length) {
      return [
        {
          name: 'setVariable',
          label: options?.setName ?? 'Set variable',
          options: allowDefinitions.map(list =>
            list.map(prop => ({
              label: prop?.name,
              name: prop?.name,
              onClick: () => {
                proxySetFieldValue?.(documentManager.keyOfEntity(prop))
              }
            }))
          )
        }
      ]
    }

    return []
  }, [definitions, options?.setName, options?.value, fieldType, documentManager, proxySetFieldValue])

  // const restoreValue = () => {
  //   const fieldEntity = fieldsConfig[field]
  //   // fieldInfo?.restore(fieldEntity?.defaultValue)
  // }

  return {
    // disabled,
    createVariable,
    // resetVariable: restoreValue,
    // editVariable: () => {
    //   console.log(fieldInfo)
    //   fieldInfo?.isVariable && editProperty(fieldInfo?.rawValue)
    // },
    // variableLink: fieldInfo?.isVariable ? fieldInfo?.resultValue : null,
    actions: !options?.disabled
      ? [
          {
            name: 'createVariable',
            label: options?.createName ?? 'Create variable',
            onClick: () => createVariable()
          }
        ].concat(allowVariables)
      : [],
    allowVariables
  }
}
