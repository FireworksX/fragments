import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useContext } from 'react'
import { useGraph } from '@graph-state/react'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useFragmentLayers = () => {
  const { documentManager } = useBuilderDocument()
  const [fragmentGraph] = useGraph(documentManager, documentManager[stateAlias].root)
  const layers = fragmentGraph?.children ?? []

  return {
    layers
  }
}
