import { keyOfEntity, LinkKey } from '@graph-state/core'
import { useLayerScopes } from '@fragmentsx/render-core'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useGraphStack } from '@graph-state/react'

export const useLayerDefinitions = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const scopes = useLayerScopes(documentManager, layerKey)
  const links = scopes
    ?.map(scope => (scope?.type === definition.scopeTypes.FragmentScope ? scope?.definitions : []))
    ?.flat()

  const values = useGraphStack(documentManager, links)

  return scopes.map(scope => scope?.definitions?.map(link => values.find(item => keyOfEntity(item) === link)) ?? [])
}
