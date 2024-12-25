import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { nodes } from '@fragments/plugin-fragment-spring'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'

export const useBuilderLayerCell = (layerKey: LinkKey) => {
  const { documentManager, canvasManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)
  const { select, selection } = useBuilderSelection()
  const parents = layerGraph?.getAllParents?.() ?? []
  const selected = selection === layerKey
  const partialSelected = selected || parents.some(parent => selection === documentManager.keyOfEntity(parent))
  const isFragment = layerGraph?._type === nodes.FragmentInstance
  const breakpointThreshold = useBreakpoints().getThresholdLabel((layerGraph?.threshold ?? 0) + 1)
  const isPrimaryLayer = layerGraph?.isRootLayer?.()

  return {
    type: layerGraph?._type,
    name: layerInvoker('name').value ?? layerKey,
    hasChildren: !isFragment && layerGraph?.children?.length > 0,
    selected,
    partialSelected,
    isFragment,
    isPrimaryLayer,
    breakpointThreshold:
      !isPrimaryLayer && layerGraph?._type === nodes.Frame && layerGraph?.isBreakpoint ? breakpointThreshold : null,
    rename: (name: string) => {
      layerGraph.rename(name)
    },
    duplicate: () => {
      layerGraph.duplicate()
    },
    handleSelect: () => select(layerKey)
  }
}
