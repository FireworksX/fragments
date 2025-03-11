import { use } from 'react'
import { useGraph } from '@graph-state/react'
import { GlobalManager } from '@fragments/render-react'

export const useGlobalManager = () => {
  const globalManager = use(GlobalManager)
  const [globalGraph] = useGraph(globalManager, globalManager?.key)

  const getFragmentManager = (id: string) => globalGraph?.fragmentsManagers?.[id]

  return {
    globalManagerGraph: globalGraph,
    globalManager,
    getFragmentManager
  }
}
