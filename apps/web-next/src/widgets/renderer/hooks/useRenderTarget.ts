import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { renderTarget as defRenderTarget } from '@fragments/plugin-fragment-spring'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useRenderTarget = () => {
  const { documentManager } = useBuilderDocument()
  const renderTarget = documentManager[stateAlias].renderTarget

  // Subscribe to root fragment
  useGraph(documentManager, documentManager[stateAlias].root)

  return {
    renderTarget: renderTarget,
    isCanvas: renderTarget === defRenderTarget.canvas,
    isDocument: renderTarget === defRenderTarget.document
  }
}
