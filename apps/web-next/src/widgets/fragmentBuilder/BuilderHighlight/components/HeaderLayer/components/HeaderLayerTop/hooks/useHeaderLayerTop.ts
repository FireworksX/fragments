import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'

export const useHeaderLayerTop = (layerKey: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const { selection } = useBuilderSelection()
  const { allowedBreakpoints, addBreakpoint, getThresholdLabel } = useBreakpoints()

  return {
    name: layerGraph?.name ?? layerGraph?._id,
    selected: selection === layerKey,
    allowedBreakpoints,
    addBreakpoint,
    thresholdLabel: getThresholdLabel(layerGraph?.threshold)
  }
}
