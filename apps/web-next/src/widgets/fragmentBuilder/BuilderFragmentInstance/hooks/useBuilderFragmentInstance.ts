import { definition } from '@fragmentsx/definition'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useInstanceDefinition } from '@/shared/hooks/fragmentBuilder/useInstanceDefinition'
import { useFragmentProperties } from '@fragmentsx/render-suite'
import { useGraph } from '@graph-state/react'
import { pick } from '@fragmentsx/utils'

export const useBuilderFragmentInstance = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [name] = useLayerValue('name')
  // const [fragmentInstance] = useGraph(documentManager, selection)
  // const [fragment] = useGraph(documentManager, fragmentInstance?.fragment)
  // const fragmentProperties = useGraphStack(documentManager, fragment?.properties ?? [])
  const { properties, manager } = useInstanceDefinition(documentManager, selection)
  const [instance, setInstanceProps] = useGraph(documentManager, selection, {
    selector: data => pick(data, 'props', 'fragment')
  })
  const props = instance?.props ?? {}

  return {
    instanceFragmentId: instance?.fragment,
    definition: properties
      .map(prop => {
        const { _id, defaultValue, type } = manager?.resolve?.(prop) ?? {}

        return {
          type,
          link: prop,
          value: _id in props ? props[_id] : defaultValue,
          setValue: value => {
            setInstanceProps({ props: { [_id]: value } })
          }
        }
      })
      .toSorted(a => (a.type === definition.variableType.Event ? 1 : -1)),
    name,
    instanceManager: manager
    // instance: fragmentInstance,
    // fragment,
    // title: fragmentInstance?.name ?? fragment?.name,
    // properties: fragmentProperties
  }
}
