import { useGraph } from '@graph-state/react'
import { renderTarget } from '@fragments/plugin-state'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useCurrentBreakpoint = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragment] = useGraph(documentManager, documentManager.key)
  const [currentBreakpoint] = useGraph(documentManager, fragment.currentBreakpoint)

  return {
    currentBreakpoint,
    currentBreakpointKey: fragment.currentBreakpoint,
    isCanvas: fragment?.renderTarget === renderTarget.canvas,
    fragmentKey: documentManager.key,
    fragmentRect: fragment
  }
}
