import { useGraph, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useInstanceDefinition } from '@fragments/renderer-editor'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

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
