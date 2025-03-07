import { useCallback } from 'react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'
import { useLayerVariableValue as useLayerValueLib, isInheritField, isPartOfPrimary } from '@fragments/renderer-editor'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey, manager?: GraphState) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = manager ?? documentManager
  const { selection } = useBuilderSelection()
  const key = layerKey ?? selection
  const isInherit = isInheritField(resultManager, key, fieldKey)
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key)
  const [value, update, libInfo] = useLayerValueLib(key, fieldKey, resultManager)
  const resetOverride = useCallback(() => update(null), [])

  return [value, update, { isOverride, resetOverride, ...libInfo }]
}
