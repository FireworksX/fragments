import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { getLayer } from './getLayer'

export const useNormalizeLayer = (layerKey?: LinkKey, manager?: unknown) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const resultManager = manager ?? documentManager
  const key = layerKey ?? selection
  const layer = resultManager?.resolve(key)
  const parsedLayer = getLayer(resultManager, key)

  return {
    rawLayer: layer,
    layer: parsedLayer
  }
}
