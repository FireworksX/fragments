import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useContext } from 'react'
import { useGraph } from '@graph-state/react'

export const useFragmentLayers = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager.fragment)
  const layers = fragmentGraph?.children ?? []

  return {
    layers
  }
}
