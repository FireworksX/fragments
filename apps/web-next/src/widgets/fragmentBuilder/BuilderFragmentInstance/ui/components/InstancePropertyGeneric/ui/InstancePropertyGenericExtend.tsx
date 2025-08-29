import { FC, use } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { fieldsConfig } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable/fieldsConfig'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { InstancePropertyGeneric, InstancePropertyGenericProps } from './InstancePropertyGeneric'
import { useLayerVariable } from '@/shared/hooks/fragmentBuilder/useLayerVariable'

interface InstancePropertyGenericExtendProps extends InstancePropertyGenericProps {}

export const InstancePropertyGenericExtend: FC<InstancePropertyGenericExtendProps> = genericProps => {
  // const { documentManager } = useBuilderDocument()
  // const { selection } = useBuilderSelection()
  // const [value, setValue, valueInfo] = useInstancePropertyValue(selection, property)
  // const propertyLayer = valueInfo?.propertyLayer ?? {}
  // const type = valueInfo?.propertyLayer?.type
  const { editProperty } = useFragmentProperties()

  const { layer } = useNormalizeLayer(genericProps.property, genericProps.manager)
  const entity =
    layer?.nodePropertyControlReference in fieldsConfig ? fieldsConfig[layer?.nodePropertyControlReference] : null
  const instanceVariable = useLayerVariable({
    preferredField: entity,
    onSetValue: value => {
      genericProps.onChange(value)
      editProperty(value)
    }
  })

  const controlRowProps = {
    hasConnector: !!entity,
    variable: {
      link: isVariableLink(genericProps.value) ? genericProps.value : null,
      actions: instanceVariable.actions,
      onClick: () => editProperty(genericProps.value),
      onReset: () => {
        genericProps.onChange(entity?.defaultValue ?? null)
      }
    }
  }

  const resProps = {
    ...genericProps,
    ...controlRowProps
  }

  return <InstancePropertyGeneric {...resProps} />
}
