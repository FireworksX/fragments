import { EntityKey } from '@adstore/web/src/types/props'
import { createComponentVariant } from '@adstore/web/src/statexModules/creators/createComponentVariant'
import { ComponentProperty } from '@adstore/web/src/types/componentProperties'
import { ComponentInstanceNode, ComponentNode } from '../types/nodes'
import { pipeResolvers, ResolverNode, setKey } from '../helpers'
import { childrenPropsResolver } from '../propsResolvers/childrenPropsResolver'
import { clonePropsResolver } from '../propsResolvers/clonePropsResolver'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'
import { createComponentInstance } from '../creators/createComponentInstance'
import { ComponentPropertyKey } from '../types/props'

export const componentNode: ResolverNode = (graphState, initialEntity: ComponentNode): ComponentNode => {
  const key = graphState.keyOfEntity(initialEntity)

  const node = {
    ...initialEntity,
    instances: initialEntity?.instances ?? [],
    defaultVariant: initialEntity?.defaultVariant ?? '',
    componentPropertyDefinitions: initialEntity?.componentPropertyDefinitions ?? [],
    variant: initialEntity?.variant,
    setVariant(variant: EntityKey) {
      graphState.mutate(key, {
        variant
      })
    },
    addVariant() {
      const componentNode = graphState.resolve(key)
      const defaultVariant = graphState.resolve(componentNode.defaultVariant)
      const variants = componentNode.children ?? []
      const nextName = `Variant ${variants.length + 1}`

      const nextVariant =
        defaultVariant?.clone({
          name: nextName,
          isPrimary: false
        }) ??
        createComponentVariant(graphState, {
          isPrimary: !defaultVariant,
          name: nextName
        })

      if (defaultVariant) {
        graphState.resolve(nextVariant).rename(nextName)
      }

      componentNode.appendChild(nextVariant)

      if (!defaultVariant) {
        graphState.mutate(key, {
          defaultVariant: graphState.keyOfEntity(nextVariant)
        })
      }
    },
    addComponentProperty(property: ComponentProperty) {
      graphState.mutate(
        key,
        prev => ({ componentPropertyDefinitions: [...prev.componentPropertyDefinitions, property] }),
        {
          replace: true
        }
      )
    },
    editComponentProperty(property: ComponentProperty) {
      graphState.mutate(property, { replace: true })
    },
    removeComponentProperty(propertyKey: ComponentPropertyKey) {
      graphState.mutate(
        key,
        prev => ({
          componentPropertyDefinitions: Object.fromEntries(
            Object.entries(prev.componentPropertyDefinitions).filter(([key]) => key !== propertyKey)
          )
        }),
        { replace: true }
      )
    },
    createInstance(): ComponentInstanceNode {
      const componentNode = graphState.resolve(key)
      const instanceEntity = createComponentInstance(graphState, {
        name: componentNode.name,
        mainComponent: setKey(key),
        variant: componentNode.defaultVariant
      })

      return graphState.resolve(graphState.mutate(instanceEntity))
    }
  }

  return pipeResolvers(childrenPropsResolver, basePropsResolver, clonePropsResolver)(node, graphState)
}
