import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { getLayer } from './getLayer'

export const useNormalizeLayer = (layerKey: LinkKey, manager?: unknown) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = manager ?? documentManager
  const layer = resultManager?.resolve(layerKey)
  const parsedLayer = getLayer(resultManager, layerKey)

  return {
    rawLayer: layer,
    layer: parsedLayer
  }
}
