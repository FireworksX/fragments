import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useContext } from 'react'
import { useGraph } from '@graph-state/react'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'

export const useFragmentLayers = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager[stateAlias].root)
  const layers = fragmentGraph?.children ?? []

  return {
    layers
  }
}
