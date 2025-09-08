import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { LinkKey } from '@graph-state/core'
import { getAllParents, getParent, isRootLayer } from '@fragmentsx/render-core'

export const useLayerInfo = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layer = documentManager.resolve(layerKey)
  const parent = getParent(documentManager, layerKey) ?? null
  const indexInParent = documentManager.resolve(parent)?.children?.findIndex(child => child === layerKey)

  return {
    layer,
    type: layer?._type,
    isBreakpoint: !!layer?.isBreakpoint,
    isPrimary: !!layer?.isPrimary,
    isRootLayer: isRootLayer(documentManager, layerKey),
    parent,
    indexInParent,
    allParents: getAllParents(documentManager, layerKey) ?? []
  }
}
