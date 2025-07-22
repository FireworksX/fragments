import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { pick } from '@fragmentsx/utils'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useRootLayerAuto } from '@/shared/hooks/fragmentBuilder/useRootLayerAuto'

export const useHeaderLayerTop = (layerKey: LinkKey) => {
  const { openModal, closeModal } = useModal()
  const { documentManager } = useBuilderDocument()
  const [layerGraph] = useGraph(documentManager, layerKey, {
    selector: data => (data ? pick(data, 'name', '_id', 'width') : data)
  })
  const { canCreateBreakpoint } = useRootLayerAuto()
  const { selection } = useBuilderSelection()
  const { allowedBreakpoints, addBreakpoint, getBreakpointRangeLabel } = useBreakpoints()

  const handleCreateCustomBreakpoint = () => {
    openModal(modalNames.createCustomBreakpoint, {
      onAdd: (name, width) => {
        addBreakpoint(name, width)
        closeModal()
      }
    })
  }

  return {
    canCreateBreakpoint,
    name: layerGraph?.name ?? layerGraph?._id,
    selected: selection === layerKey,
    allowedBreakpoints,
    addBreakpoint,
    thresholdLabel: getBreakpointRangeLabel(layerKey),
    handleCreateCustomBreakpoint
  }
}
