import { keyOfEntity, LinkKey } from '@graph-state/core'
import { useLayerScopes } from '@fragmentsx/render-core'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useGraphStack } from '@graph-state/react'
import { useMemo } from 'react'

export const useLayerDefinitions = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const scopes = useLayerScopes(documentManager, layerKey)

  const scopeDefinitions = useMemo(() => {
    const list = []

    scopes.forEach(scope => {
      if (scope.type === definition.scopeTypes.FragmentScope) {
        list.push(scope.definitions)
      }
      if (scope.type === definition.scopeTypes.CollectionScope) {
        list.push([scope.source])
      }
    })

    return list
  }, [scopes])

  // Реагируем на все definition, которые находятся в скоупе
  useGraphStack(documentManager, scopeDefinitions?.flat())

  return scopeDefinitions.map(scope => scope.map(documentManager.resolve))
}
