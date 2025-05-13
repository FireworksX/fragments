import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { definition } from '@fragments/definition'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderLayerCell = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layerInfo = useLayerInfo(layerKey)

  const [layerGraph] = useGraph(documentManager, layerKey)
  const [name, rename] = useLayerValue('name', layerKey)
  const { select, selection } = useBuilderSelection()
  const selected = selection === layerKey
  const partialSelected =
    selected || layerInfo.allParents.some(parent => selection === documentManager.keyOfEntity(parent))
  const isInstance = layerInfo.type === definition.nodes.Instance
  const breakpointThreshold = useBreakpoints().getBreakpointRangeLabel(layerKey)
  const isPrimaryLayer = layerInfo.isPrimary

  return {
    type: layerInfo?.type,
    name: name ?? layerKey,
    hasChildren: !isInstance && layerInfo?.layer?.children?.length > 0,
    selected,
    partialSelected,
    isInstance,
    isPrimaryLayer,
    breakpointThreshold:
      !isPrimaryLayer && layerInfo?.type === definition.nodes.Frame && layerInfo?.isBreakpoint
        ? breakpointThreshold
        : null,
    rename,
    duplicate: () => {
      // layerGraph.duplicate()
    },
    handleSelect: () => select(layerKey)
  }
}
