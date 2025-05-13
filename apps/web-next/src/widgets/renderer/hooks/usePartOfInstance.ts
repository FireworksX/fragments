import { nodes, renderTarget } from '@fragmentsx/plugin-fragment-spring'
import { LinkKey } from '@graph-state/core'
import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const usePartOfInstance = (layerKey: LinkKey, parents: LinkKey[] = []) => {
  const { documentManager } = useBuilderDocument()
  const indexOfInstance = parents.findIndex(key => documentManager.entityOfKey(key)._type === nodes.FragmentInstance)
  const deepIndex = parents
    .toReversed()
    .findIndex(key => documentManager.entityOfKey(key)._type === nodes.FragmentInstance)

  return {
    isPartOfInstance: indexOfInstance !== -1,
    deepIndex,
    instanceKey: parents[indexOfInstance]
  }
}
