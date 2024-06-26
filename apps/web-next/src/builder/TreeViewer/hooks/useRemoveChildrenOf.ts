import { FlattenedItem } from './useFlattenTree'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export const useRemoveChildrenOf = (items: FlattenedItem[], keys: string[]) => {
  const { graphState } = useContext(BuilderContext)

  const removeChildrenOf = (items: FlattenedItem[], keys: string[]) => {
    const excludeParentIds = [...keys]

    return items.filter(item => {
      if (item.parentKey && excludeParentIds.includes(item.parentKey)) {
        if (item.children?.length) {
          excludeParentIds.push(graphState.keyOfEntity(item))
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
