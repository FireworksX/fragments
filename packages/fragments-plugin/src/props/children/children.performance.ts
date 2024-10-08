import { ChildrenRelatedProps } from 'src/types/props'
import { Resolver, setKey } from 'src/helpers'
import { BaseNode, SceneNode } from 'src/types'
import { filterDeep, findDeep } from '@fragments/utils'
import { GraphState, isPartialKey, LinkKey } from '@graph-state/core'

export const childrenProps: Resolver = <TChild extends SceneNode = SceneNode>(
  graphState: GraphState,
  entity: any
): ChildrenRelatedProps<TChild> => {
  const key = graphState.keyOfEntity(entity) ?? ''

  const children = (entity.children ?? [])
    .filter(child => (typeof child === 'string' ? !isPartialKey(child) : true))
    .map(child => {
      const childEntity = typeof child === 'string' ? graphState.resolve(child) : child

      return {
        ...childEntity,
        parentKey: setKey(key)
      }
    })

  return {
    ...entity,
    children,
    appendChild(child: unknown): void {
      const childNode: any = typeof child === 'string' ? graphState.resolve(child) : child
      childNode.parentKey = setKey(key)

      graphState.mutate(key, {
        children: [childNode]
      })
    },

    removeChild(child: string | TChild): void {
      graphState.mutate(
        key,
        prev => {
          const childKey = child instanceof Object ? graphState.keyOfEntity(child as any) : child
          return {
            children: ((prev.children ?? []) as any)?.filter((c: string) => c !== childKey)
          }
        },
        {
          replace: true
        }
      )
    },

    insertChild(index: number, child: TChild): void {
      graphState.mutate(
        key,
        prev => {
          const children = [...(prev.children as any)]
          const childNode: any = typeof child === 'string' ? graphState.resolve(child) : child

          children.splice(index, 0, {
            ...childNode,
            parentKey: setKey(key)
          })

          return {
            children
          }
        },
        { replace: true }
      )
    },

    changeOrder(childLink: LinkKey, to: number): void {
      graphState.mutate(
        key,
        prev => {
          const children = prev?.children ?? []
          const index = children.indexOf(childLink)

          if (index !== -1) {
            children.splice(index, 1)
            children.splice(to, 0, childLink)
          }

          return {
            children
          }
        },
        { replace: true }
      )
    },

    findChildren(callback: (child: TChild) => boolean): readonly TChild[] {
      return (graphState.resolve(key)?.children ?? []).map(graphState.resolve).filter(Boolean).filter(callback)
    },

    findChild(callback: (child: TChild) => boolean): TChild {
      return (graphState.resolve(key)?.children ?? []).map(graphState.resolve).find(callback) ?? null
    },

    findChildIndex(callback: (child: TChild) => boolean): number {
      return (graphState.resolve(key)?.children ?? []).map(graphState.resolve).findIndex(callback) ?? null
    },

    findAll(callback: (child: TChild) => boolean): readonly TChild[] {
      const tree = graphState.deepResolve(graphState.keyOfEntity(this))
      return (filterDeep(tree, (_, value) => graphState.keyOfEntity(value) && callback(value)) ?? []).map(
        el => el.value
      ) as BaseNode[]
    },

    findOne(callback: (child: TChild) => boolean): TChild {
      const tree = graphState.deepResolve(graphState.keyOfEntity(this))
      return (findDeep(tree, (_, value) => graphState.keyOfEntity(value) && callback(value))?.value ??
        null) as BaseNode | null
    }
  }
}
