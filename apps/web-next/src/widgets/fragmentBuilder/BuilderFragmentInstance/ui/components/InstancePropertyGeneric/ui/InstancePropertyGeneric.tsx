import { FC, use } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { definition } from '@fragmentsx/definition'
import { InstancePropertyNumber } from '../../InstancePropertyNumber'
import { InstancePropertyString } from '../../InstancePropertyString'
import { InstancePropertyBoolean } from '../../InstancePropertyBoolean'
import { InstancePropertyColor } from '../../InstancePropertyColor'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useInstancePropertyValue } from '@/shared/hooks/fragmentBuilder/useInstancePropertyValue'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'
import InstancePropertyEvent from '../../InstancePropertyEvent/ui/InstancePropertyEvent'
import { useLayerVariable, useLayerVariables } from '../../../../../../../shared/hooks/fragmentBuilder/useLayerVariable'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { fieldsConfig } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable/fieldsConfig'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import InstancePropertyEnum from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyEnum/ui/InstancePropertyEnum'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'

export interface InstancePropertyGenericProps extends BuilderControlRowProps {
  value: unknown
  property: LinkKey
  manager: GraphState
  className?: string
  onChange(value: boolean): void
}

export const InstancePropertyGeneric: FC<InstancePropertyGenericProps> = ({
  className,
  manager,
  value,
  property,
  onChange,
  ...controlRowProps
}) => {
  const { layer } = useNormalizeLayer(property, manager)

  if (layer?.type === definition.variableType.Number) {
    return (
      <InstancePropertyNumber
        value={value}
        name={layer.name}
        step={layer.step}
        min={layer.min}
        max={layer.max}
        displayStepper={layer.displayStepper}
        onChange={onChange}
        {...controlRowProps}
      />
    )
  }

  if (layer?.type === definition.variableType.String) {
    return (
      <InstancePropertyString
        name={layer.name}
        isTextarea={layer.isTextarea}
        value={value}
        onChange={onChange}
        {...controlRowProps}
      />
    )
  }

  if (layer?.type === definition.variableType.Link) {
    return <InstancePropertyString name={layer.name} value={value} onChange={onChange} />
  }

  if (layer?.type === definition.variableType.Boolean) {
    return (
      <InstancePropertyBoolean
        name={layer.name}
        isTextarea={layer.isTextarea}
        value={value}
        onChange={onChange}
        {...controlRowProps}
      />
    )
  }

  if (layer?.type === definition.variableType.Color) {
    return <InstancePropertyColor name={layer.name} value={value} onChange={onChange} {...controlRowProps} />
  }

  if (layer?.type === definition.variableType.Enum) {
    return (
      <InstancePropertyEnum
        propertyReference={layer?.nodePropertyControlReference}
        name={layer.name}
        value={value}
        onChange={onChange}
        {...controlRowProps}
      />
    )
  }

  if (layer?.type === definition.variableType.Event) {
    return (
      <InstancePropertyEvent
        name={layer.name}
        mode={layer?.mode}
        value={value}
        onChange={onChange}
        {...controlRowProps}
      />
    )
  }

  return null
  // const { documentManager } = useBuilderDocument()
  // const { selection } = useBuilderSelection()
  // const [instance] = useGraph(documentManager, selection)
  // const instanceProp = instance?.readProperty(property)
  //

  //
  // if (property.type === variableType.String) {
  //   return (
  //     <InstancePropertyString
  //       value={instanceProp}
  //       name={property.name}
  //       onChange={value => instance.updateProperty(property, value)}
  //     />
  //   )
  // }
  //
  // if (property.type === variableType.Boolean) {
  //   return (
  //     <InstancePropertyBoolean
  //       value={instanceProp}
  //       name={property.name}
  //       onChange={value => instance.updateProperty(property, value)}
  //     />
  //   )
  // }
}
