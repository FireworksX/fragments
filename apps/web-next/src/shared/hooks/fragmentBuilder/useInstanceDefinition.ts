import { useGraph } from '@graph-state/react'
import { GraphState, LinkKey } from '@graph-state/core'
import { useGlobalManager } from '@/shared/hooks/fragmentBuilder/useBuilderGlobalContext'
import { useFragmentManager } from '@fragmentsx/render-suite'

export const useInstanceDefinition = (manager: GraphState, layerKey: LinkKey) => {
  const instanceLayer = manager.resolve(layerKey)
  const instanceFragmentId = instanceLayer?.fragment
  const { manager: instanceFragmentManager } = useFragmentManager(instanceFragmentId)
  const [instanceFragment] = useGraph(instanceFragmentManager, instanceFragmentManager?.$fragment?.root)

  return {
    properties: instanceFragment?.properties ?? [],
    manager: instanceFragmentManager
  }
}
