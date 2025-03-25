import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useFragmentLayers = () => {
  const { documentManager } = useBuilderDocument()
  const [fragmentGraph] = useGraph(documentManager, documentManager.$fragment.root)
  const layers = fragmentGraph?.children ?? []

  return {
    layers
  }
}
