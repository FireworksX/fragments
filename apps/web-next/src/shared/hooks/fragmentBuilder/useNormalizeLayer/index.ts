import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { getLayer } from './getLayer'

export const useNormalizeLayer = (layerKey?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const key = layerKey ?? selection
  const layer = documentManager?.resolve(key)
  const parsedLayer = getLayer(documentManager, key)

  return {
    rawLayer: layer,
    layer: parsedLayer
  }
}
