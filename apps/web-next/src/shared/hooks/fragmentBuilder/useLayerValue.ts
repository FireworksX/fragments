import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { LinkKey } from '@graph-state/core'
import { useLayerVariableValue as useLayerValueLib, isInheritField, isPartOfPrimary } from '@fragments/renderer-editor'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const key = layerKey ?? selection
  const isInherit = isInheritField(documentManager, key, fieldKey)
  const isOverride = !isInherit && !isPartOfPrimary(documentManager, key)
  const [value, update, info] = useLayerValueLib(key, fieldKey, documentManager)

  return [value, update, { isOverride, resetOverride: () => update(null), ...info }]
}
