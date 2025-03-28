import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { getLayer } from './getLayer'

export const getNormalizeLayer = (layerKey: LinkKey, manager: unknown) => {
  const layer = manager?.resolve(layerKey)
  const parsedLayer = getLayer(manager, layerKey)

  return {
    rawLayer: layer,
    layer: parsedLayer
  }
}

export const useNormalizeLayer = (layerKey: LinkKey, manager?: unknown) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = manager ?? documentManager

  return getNormalizeLayer(layerKey, resultManager)
}
