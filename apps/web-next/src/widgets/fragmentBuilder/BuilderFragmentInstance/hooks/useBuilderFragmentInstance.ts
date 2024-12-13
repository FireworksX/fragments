import { useGraph, useGraphStack } from '@graph-state/react'
import { useContext } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderFragmentInstance = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [fragment] = useGraph(documentManager, selectionGraph?.children?.at(0))
  const fragmentProperties = useGraphStack(documentManager, fragment?.properties ?? [])

  return {
    selectionGraph,
    fragment,
    title: selectionGraph?.name ?? fragment?.name,
    properties: fragmentProperties
  }
}
