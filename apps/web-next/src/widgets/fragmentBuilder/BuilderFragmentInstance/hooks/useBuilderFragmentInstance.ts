import { useGraph, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderFragmentInstance = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [fragmentInstance] = useGraph(documentManager, selection)
  const [fragment] = useGraph(documentManager, fragmentInstance?.fragment)
  const fragmentProperties = useGraphStack(documentManager, fragment?.properties ?? [])

  return {
    instance: fragmentInstance,
    fragment,
    title: fragmentInstance?.name ?? fragment?.name,
    properties: fragmentProperties
  }
}
