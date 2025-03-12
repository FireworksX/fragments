import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useInstanceDefinition } from '@/shared/hooks/fragmentBuilder/useInstanceDefinition'

export const useBuilderFragmentInstance = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [name] = useLayerValue('name')
  // const [fragmentInstance] = useGraph(documentManager, selection)
  // const [fragment] = useGraph(documentManager, fragmentInstance?.fragment)
  // const fragmentProperties = useGraphStack(documentManager, fragment?.properties ?? [])
  const { properties, manager } = useInstanceDefinition(documentManager, selection)

  return {
    definition: properties,
    name,
    instanceManager: manager
    // instance: fragmentInstance,
    // fragment,
    // title: fragmentInstance?.name ?? fragment?.name,
    // properties: fragmentProperties
  }
}
