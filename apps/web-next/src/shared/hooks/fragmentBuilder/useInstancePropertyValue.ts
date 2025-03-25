import { GraphState, LinkKey } from '@graph-state/core'
import { useInstanceDefinition } from '@/shared/hooks/fragmentBuilder/useInstanceDefinition'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useInstancePropertyValue = (instanceKey: LinkKey, propertyKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { manager: innerManager } = useInstanceDefinition(documentManager, instanceKey)

  const [props, setProps, propsInfo] = useLayerValue('props', instanceKey)
  const { layer: propertyLayer } = useNormalizeLayer(propertyKey, innerManager)
  const { _id: propertyId } = documentManager?.entityOfKey(propertyKey) ?? {
    _id: null
  }

  const currentValue = props?.[propertyId] ?? null
  const required = propertyLayer?.required ?? false
  const defaultValue = propertyLayer?.defaultValue ?? null
  const resultValue = required ? currentValue : currentValue ?? defaultValue

  console.log(instanceKey, props, resultValue)

  return [resultValue, value => setProps({ [propertyId]: value }), { propertyLayer }]
}
