import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { LinkKey } from '@graph-state/core'
import { getAllParents, getParent, isRootLayer } from '@fragments/render-core'

export const useLayerInfo = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layer = documentManager.resolve(layerKey)

  return {
    layer,
    type: layer?._type,
    isBreakpoint: !!layer?.isBreakpoint,
    isPrimary: !!layer?.isPrimary,
    isRootLayer: isRootLayer(documentManager, layerKey),
    parent: getParent(documentManager, layerKey) ?? null,
    allParents: getAllParents(documentManager, layerKey) ?? []
  }
}
