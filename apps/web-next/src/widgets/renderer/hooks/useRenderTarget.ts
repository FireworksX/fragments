import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { renderTarget } from '@fragments/plugin-state'

export const useRenderTarget = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager)

  return {
    renderTarget: fragmentGraph?.renderTarget,
    isCanvas: fragmentGraph?.renderTarget === renderTarget.canvas,
    isDocument: fragmentGraph?.renderTarget === renderTarget.document
  }
}
