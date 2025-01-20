import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderCreator = () => {
  const { builderManager } = use(BuilderContext)
  const [creator] = useGraph(builderManager, builderManager.creatorKey)

  return {
    creator,
    manager: builderManager.$creator
  }
}
