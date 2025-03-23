import { use } from 'react'
import { useGraph } from '@graph-state/react'
import { GlobalManager } from '@fragments/render-react'

export const useGlobalManager = () => {
  const globalManager = use(GlobalManager)
  const [globalGraph] = useGraph(globalManager, globalManager?.key)

  const getFragmentManager = (id: string) => {
    return globalGraph?.fragmentsManagers?.[id]
  }

  const loadFragmentManager = async (id: string) => {
    const fragmentDocument = await globalGraph.fetchManager.queryFragment(id)
    return globalManager?.createFragmentManager(id, fragmentDocument)
  }

  return {
    globalManagerGraph: globalGraph,
    globalManager,
    getFragmentManager,
    loadFragmentManager
  }
}
