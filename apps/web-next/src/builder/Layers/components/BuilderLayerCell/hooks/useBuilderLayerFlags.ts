import { BuilderContext } from '@/builder/BuilderContext'
import { useContext } from 'react'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { to } from '@react-spring/web'
import { builderLayerMode } from '@fragments/fragments-plugin/performance'

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)

  const isVisible$ = layerInvoker('visible').value
  const layerMode$ = layerInvoker('layerMode').value
  const layerDirection$ = layerInvoker('layerDirection').value
  const hasLayout$ = to(layerMode$, mode => mode === builderLayerMode.flex)

  return {
    type: layerNode._type,
    isVisible$,
    layerDirection$,
    layerMode$,
    hasLayout$
  }
}
