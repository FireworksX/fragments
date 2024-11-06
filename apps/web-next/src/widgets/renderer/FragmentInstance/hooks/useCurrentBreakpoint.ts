import { useGraph } from '@graph-state/react'
import { renderTarget } from '@fragments/plugin-state'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'

export const useCurrentBreakpoint = (layerKey: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [fragment] = useGraph(documentManager, layerKey)
  const [currentBreakpoint] = useGraph(documentManager, fragment.currentBreakpoint)

  return {
    currentBreakpoint,
    currentBreakpointKey: fragment.currentBreakpoint,
    isCanvas: fragment?.renderTarget === renderTarget.canvas
  }
}
