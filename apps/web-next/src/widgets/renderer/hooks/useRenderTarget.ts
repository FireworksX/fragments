import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { renderTarget } from '@fragments/plugin-fragment-spring'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'

export const useRenderTarget = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager[stateAlias].root)

  return {
    renderTarget: fragmentGraph?.renderTarget,
    isCanvas: fragmentGraph?.renderTarget === renderTarget.canvas,
    isDocument: fragmentGraph?.renderTarget === renderTarget.document
  }
}
