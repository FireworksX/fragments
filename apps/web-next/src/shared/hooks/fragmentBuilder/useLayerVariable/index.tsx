import { fieldsConfig } from './fieldsConfig'
import { useCallback, useMemo } from 'react'
import { definition } from '@fragmentsx/definition'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { omit, pick } from '@fragmentsx/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { keyOfEntity, LinkKey } from '@graph-state/core'
import { useLayerDefinitions } from '@/shared/hooks/fragmentBuilder/useLayerDefinitions'
import CollectionIcon from '@/shared/icons/next/database.svg'
import { isPrimitiveVariable } from '@/shared/utils/isPrimitiveVariable'

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
  skipUseDefaultValue?: boolean
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
        defaultValue: !options?.skipUseDefaultValue ? options?.value ?? fieldEntity?.defaultValue : null,
        ...(customFields ?? {})
      })

      proxySetFieldValue?.(property)

      // if (options?.editAfterCreate !== false) {
      //   editProperty(property)
      // }
    },
    [options?.preferredField, options?.value, getVariableName, createProperty, proxySetFieldValue]
  )

  const getVariable = useCallback(
    (propertyLink, customName?: string) => {
      const propertyLayer = documentManager.resolve(propertyLink)

      if (propertyLayer?.type === definition.variableType.Object) {
        const cleanFields = omit(propertyLayer?.fields, '_type', '_id')
        const fields = Object.entries(cleanFields)
          .map(([key, fieldLink]) => getVariable(fieldLink, key))
          .filter(Boolean)

        if (!fields?.length) return null

        return {
          id: propertyLayer?._id,
          label: propertyLayer?.name,
          name: propertyLayer?.name,
          options: [fields]
        }
      }

      if (propertyLayer?.type === definition.variableType.Array) {
        const nestedVariableValue = getVariable(propertyLayer?.definition)

        if (!nestedVariableValue) return null

        const isPrimitive = !nestedVariableValue?.options?.length

        return {
          id: propertyLayer?._id,
          label: propertyLayer?.name,
          name: propertyLayer?.name,
          icon: <CollectionIcon />,
          options: isPrimitive ? null : nestedVariableValue?.options,
          onClick: isPrimitive ? nestedVariableValue.onClick : null
        }
      }

      if (propertyLayer?.type !== fieldType) return null

      return {
        id: propertyLayer?._id,
        label: customName ?? propertyLayer?.name,
        name: customName ?? propertyLayer?.name,
        onClick: () => {
          proxySetFieldValue?.(keyOfEntity(propertyLayer))
        }
      }
    },
    [documentManager, fieldType, proxySetFieldValue]
  )

  const setVariableOption = useMemo(() => {
    const visitors = new Set([])
    const allowOptions = definitions.map(list =>
      list
        .filter(prop => !prop?.parent)
        .map(prop => {
          const variable = getVariable(prop)

          if (visitors.has(variable?.id)) return null
          visitors.add(variable?.id)

          return variable
        })
        .filter(Boolean)
        .filter(item => (Array.isArray(item) ? !!item?.length : true))
    )

    return {
      name: 'setVariable',
      label: options?.setName ?? 'Set variable',
      options: allowOptions.filter(el => !!el.length)
    }
  }, [options?.setName, definitions, getVariable])

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
    // actions: !options?.disabled
    //   ? [
    //       {
    //         name: 'createVariable',
    //         label: options?.createName ?? 'Create variable',
    //         onClick: () => createVariable()
    //       }
    //     ].concat(allowVariables)
    //   : [],
    createVariableOption: {
      name: 'createVariable',
      label: options?.createName ?? 'Create variable',
      onClick: () => createVariable()
    },
    setVariableOption
  }
}
