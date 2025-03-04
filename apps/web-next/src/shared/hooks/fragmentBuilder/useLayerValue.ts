import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'
import { useLayerVariableValue as useLayerValueLib, isInheritField, isPartOfPrimary } from '@fragments/renderer-editor'
import { useCallback, useEffect, useMemo } from 'react'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey, manager?: GraphState, a) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = manager ?? documentManager
  const { selection } = useBuilderSelection(a)
  const key = layerKey ?? selection
  const isInherit = isInheritField(resultManager, key, fieldKey)
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key)
  const [value, update, libInfo] = useLayerValueLib(key, fieldKey, resultManager, a)

  const resetOverride = useCallback(() => update(null), [])
  const info = useMemo(() => ({ isOverride, resetOverride, ...libInfo }), [])

  return [value, update, info]
}
