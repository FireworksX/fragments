import { generateId, Resolver, setKey } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { CloneProps } from '../types/props'
import { BaseNode } from '../types'

export const clonePropsResolver: Resolver = (statex, entity): CloneProps => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    overrides: entity?.overrides ?? [],
    clone(overrideNode: BaseNode) {
      const node = statex.resolve(key)
      const nextChildren = (node?.findChildren?.(() => true) ?? []).map(child => child.clone?.() ?? child)

      const nextEntity = {
        ...(overrideNode ?? {}),
        overrideFrom: key,
        _type: node._type,
        _id: generateId(),
        children: nextChildren
      }

      const cloneKey = statex.mutate(nextEntity)
      statex.mutate(key, {
        overrides: [setKey(cloneKey)]
      })

      return cloneKey
    }
  }
}
