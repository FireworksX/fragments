import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { LinkKey } from '@graph-state/core'
import { useLayerValue as useLayerValueLib } from '@fragments/renderer-editor'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()

  return useLayerValueLib(layerKey ?? selection, fieldKey, documentManager)
}
