import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderDocument = () => {
  const { builderManager } = use(BuilderContext)
  const [builder] = useGraph(builderManager, builderManager.key)
  const [documentManager] = useGraph(builderManager, builder.documentManager)

  return {
    fetching: builder.fetchingDocumentManager,
    documentManager: documentManager?.manager
  }
}
