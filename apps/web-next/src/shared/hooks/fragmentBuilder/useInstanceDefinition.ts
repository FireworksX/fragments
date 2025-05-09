import { useGraph } from '@graph-state/react'
import { GraphState, LinkKey } from '@graph-state/core'
import { useGlobalManager } from '@/shared/hooks/fragmentBuilder/useBuilderGlobalContext'

export const useInstanceDefinition = (manager: GraphState, layerKey: LinkKey) => {
  const { getFragmentManager } = useGlobalManager()
  const instanceLayer = manager.resolve(layerKey)
  const instanceFragmentId = instanceLayer?.fragment
  const instanceFragmentManager = getFragmentManager(instanceFragmentId)
  const [instanceFragment] = useGraph(instanceFragmentManager, instanceFragmentManager?.$fragment?.root)

  return {
    properties: instanceFragment?.properties ?? [],
    manager: instanceFragmentManager
  }
}
