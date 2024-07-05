import { useContext } from 'react'
import { FlattenedItem } from './useFlattenTree'
import { BuilderContext } from '@/builder/BuilderContext'

export const useRemoveChildrenOf = (items: FlattenedItem[], keys: string[]) => {
  const { documentManager } = useContext(BuilderContext)

  const removeChildrenOf = (items: FlattenedItem[], keys: string[]) => {
    const excludeParentIds = [...keys]

    return items.filter(item => {
      if (item.parentKey && excludeParentIds.includes(item.parentKey)) {
        if (item.children?.length) {
          excludeParentIds.push(documentManager.keyOfEntity(item))
        }
        return false
      }

      return true
    })
  }

  return {
    list: removeChildrenOf(items, keys),
    removeChildrenOf
  }
}
