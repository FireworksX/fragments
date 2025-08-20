import { definition } from '@fragmentsx/definition'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useInstanceDefinition } from '@/shared/hooks/fragmentBuilder/useInstanceDefinition'
import { useGraph } from '@graph-state/react'
import { isObject, pick } from '@fragmentsx/utils'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'
import { fieldsConfig } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable/fieldsConfig'
import { useLayerVariable } from '@/shared/hooks/fragmentBuilder/useLayerVariable'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { keyOfEntity } from '@graph-state/core'
import { useLayerScopes } from '@fragmentsx/render-react'

export const useBuilderFragmentInstance = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [name] = useLayerValue('name')
  // const [fragmentInstance] = useGraph(documentManager, selection)
  // const [fragment] = useGraph(documentManager, fragmentInstance?.fragment)
  // const fragmentProperties = useGraphStack(documentManager, fragment?.properties ?? [])
  const { properties: fragmentProperties } = useFragmentProperties()
  const { properties, manager } = useInstanceDefinition(documentManager, selection)
  const [instance, setInstanceProps] = useGraph(documentManager, selection, {
    selector: data => pick(data, 'props', 'fragment')
  })
  const props = instance?.props ?? {}

  return {
    instanceFragmentId: instance?.fragment,
    definition: properties
      .map(definition => {
        const resolvedDefinition = manager?.resolve?.(definition) ?? {}
        // console.log(definition, resolvedDefinition, fragmentProperties)
        // const allowProps = options.areaProperties?.filter?.(prop => prop?.type === resolvedDefinition.type)
        const actions = []

        // if (allowProps?.length) {
        //   actions = [
        //     {
        //       name: 'setVariable',
        //       label: 'Set variable',
        //       options: [
        //         allowProps.map(prop => ({
        //           label: prop?.name,
        //           name: prop?.name,
        //           onClick: () => {
        //             handleChangeValue(resolvedDefinition._id, keyOfEntity(prop))
        //             // proxySetFieldValue?.(documentManager.keyOfEntity(prop))
        //           }
        //         }))
        //       ]
        //     }
        //   ]
        // }
        //
        // const value =
        //   isObject(options.props) && resolvedDefinition._id in options.props
        //     ? options?.props[resolvedDefinition._id]
        //     : resolvedDefinition.defaultValue

        return {
          type: resolvedDefinition._type,
          link: definition,
          value: resolvedDefinition._id in props ? props[resolvedDefinition._id] : resolvedDefinition.defaultValue,
          setValue: value => {
            setInstanceProps({ props: { [resolvedDefinition._id]: value } })
          }
        }
      })
      .toSorted(a => (a.type === definition.variableType.Event ? 1 : -1)),
    name,
    instanceManager: manager,
    parentManager: documentManager
    // instance: fragmentInstance,
    // fragment,
    // title: fragmentInstance?.name ?? fragment?.name,
    // properties: fragmentProperties
  }
}
