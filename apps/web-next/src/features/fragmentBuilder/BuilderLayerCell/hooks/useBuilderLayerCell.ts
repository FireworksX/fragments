import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderLayerCell = (layerKey: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)
  const { select, selection } = useBuilderSelection()
  const parents = layerGraph?.getAllParents?.() ?? []
  const selected = selection === layerKey
  const partialSelected = selected || parents.some(parent => selection === documentManager.keyOfEntity(parent))

  return {
    type: layerGraph?._type,
    name: layerInvoker('name').value ?? layerKey,
    hasChildren: layerGraph?.children?.length > 0,
    selected,
    partialSelected,
    rename: (name: string) => {
      layerGraph.rename(name)
    },
    handleSelect: () => select(layerKey)
  }
}
