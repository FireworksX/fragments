import { EntityKey } from '@adstore/web/src/types/props'
import { ComponentInstanceNode } from '../types/nodes'
import { pipeResolvers, ResolverNode } from '../helpers'
import { clonePropsResolver } from '../propsResolvers/clonePropsResolver'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'

export const componentInstanceNode: ResolverNode = (
  graphState,
  initialEntity: ComponentInstanceNode
): ComponentInstanceNode => {
  const key = graphState.keyOfEntity(initialEntity)

  const node = {
    ...initialEntity,
    mainComponent: initialEntity?.mainComponent,
    variant: initialEntity?.variant,
    setVariant(variant: EntityKey) {
      graphState.mutate(key, {
        variant
      })
    }
  }

  return pipeResolvers(basePropsResolver, clonePropsResolver)(node, graphState)
}
