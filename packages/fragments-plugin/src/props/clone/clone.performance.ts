import { Resolver, setKey } from 'src/helpers'
import { CloneProps } from 'src/types/props'
import { BaseNode } from 'src/types'
import { generateId } from '@fragments/utils'

export const cloneProps: Resolver = (state, entity): CloneProps => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    overrides: entity?.overrides ?? [],
    clone(overrideNode: BaseNode) {
      const node = state.resolve(key)
      const nextChildren = (node?.findChildren?.(() => true) ?? []).map(child => child.clone?.() ?? child)

      const nextEntity = {
        ...(overrideNode ?? {}),
        overrideFrom: key,
        _type: node._type,
        _id: generateId(),
        children: nextChildren
      }

      const cloneKey = state.mutate(nextEntity)
      state.mutate(key, {
        overrides: [setKey(cloneKey)]
      })

      return cloneKey
    }
  }
}
