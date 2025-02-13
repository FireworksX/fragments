import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useGraph } from '@graph-state/react'
import { isRootLayer } from '@fragments/renderer-editor'
import { LinkKey } from '@graph-state/core'

export const useLayerInfo = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const [layer] = useGraph(documentManager, layerKey)

  return {
    layer,
    type: layer?._type,
    isBreakpoint: layer?.isBreakpoint,
    isRootLayer: isRootLayer(documentManager, layerKey)
  }
}
