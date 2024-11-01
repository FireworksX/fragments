import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { modalStore } from '@/shared/store/modal.store'
import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'

export const useHeaderBreakpoint = (layerKey: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { breakpointValues, addBreakpoint } = useBreakpoints()

  const handleNewBreakpoint = (name, width) => {
    addBreakpoint(name, width)
  }

  const handleCustomBreakpoint = () => {
    modalStore.open('createCustomBreakpoint', {
      onAdd: (name, width) => {
        addBreakpoint(name, width)
        close()
      }
    })
  }

  return {
    name: layerNode?.name || layerNode?._id,
    width: layerNode?.minWidth,
    activeWidths: breakpointValues.map(b => b.width),
    handleNewBreakpoint,
    handleCustomBreakpoint
  }
}
