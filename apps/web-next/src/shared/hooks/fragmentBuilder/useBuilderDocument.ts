import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderDocument = () => {
  const { builderManager } = use(BuilderContext)
  const [builderDocument] = useGraph(builderManager, builderManager.$documents.key)

  return {
    fetching: builderDocument.fetching,
    documentManager: builderDocument?.manager
  }
}
