import { FC, use } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { variableType } from '@fragments/plugin-fragment'
import { InstancePropertyNumber } from '../../InstancePropertyNumber'
import { InstancePropertyString } from '../../InstancePropertyString'
import { InstancePropertyBoolean } from '../../InstancePropertyBoolean'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface InstancePropertyGenericProps {
  property: {
    type: keyof typeof variableType
  }
  className?: string
  onChange(value: boolean): void
}

const InstancePropertyGeneric: FC<InstancePropertyGenericProps> = ({ className, property }) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [instance] = useGraph(documentManager, selection)
  const instanceProp = instance?.readProperty(property)

  if (property.type === variableType.Number) {
    return (
      <InstancePropertyNumber
        value={instanceProp}
        name={property.name}
        step={property.step}
        min={property.min}
        max={property.max}
        onChange={value => instance.updateProperty(property, value)}
      />
    )
  }

  if (property.type === variableType.String) {
    return (
      <InstancePropertyString
        value={instanceProp}
        name={property.name}
        onChange={value => instance.updateProperty(property, value)}
      />
    )
  }

  if (property.type === variableType.Boolean) {
    return (
      <InstancePropertyBoolean
        value={instanceProp}
        name={property.name}
        onChange={value => instance.updateProperty(property, value)}
      />
    )
  }
}

export default animated(InstancePropertyGeneric)
