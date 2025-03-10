import { use } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useGlobalManager = () => {
  const { globalManager } = use(BuilderContext)
  const [globalGraph] = useGraph(globalManager, globalManager?.key)

  const getFragmentManager = (id: string) => globalGraph?.fragmentsManagers?.[id]

  return {
    globalManagerGraph: globalGraph,
    globalManager,
    getFragmentManager
  }
}
