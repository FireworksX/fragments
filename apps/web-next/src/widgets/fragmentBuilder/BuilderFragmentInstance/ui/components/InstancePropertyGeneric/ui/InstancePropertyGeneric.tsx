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
import { GraphState, LinkKey } from '@graph-state/core'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useInstancePropertyValue } from '@fragments/renderer-editor'
import { useLayerVariableValue } from '@fragments/renderer-editor'
import { useLayer } from '@fragments/renderer-editor'

interface InstancePropertyGenericProps {
  property: LinkKey
  instanceManager: GraphState
  className?: string
  onChange(value: boolean): void
}

const InstancePropertyGeneric: FC<InstancePropertyGenericProps> = ({ className, property, instanceManager }) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [type] = useLayerValue('type', property, instanceManager)
  const [value, setValue, valueInfo] = useInstancePropertyValue(documentManager, selection, property)
  const propertyLayer = valueInfo?.propertyLayer ?? {}

  if (type === variableType.Number) {
    return (
      <InstancePropertyNumber
        value={value}
        name={propertyLayer.name}
        step={propertyLayer.step}
        min={propertyLayer.min}
        max={propertyLayer.max}
        displayStepper={propertyLayer.displayStepper}
        onChange={setValue}
      />
    )
  }

  return <h1>test</h1>
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

export default InstancePropertyGeneric
