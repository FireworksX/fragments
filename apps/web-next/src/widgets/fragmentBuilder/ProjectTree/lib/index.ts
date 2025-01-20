export function flatten<T extends Record<string, any>>(
  items: TreeItems<T>,
  parentId: UniqueIdentifier | null = null,
  depth = 0,
  parent: FlattenedItem<T> | null = null
): FlattenedItem<T>[] {
  return items.reduce<FlattenedItem<T>[]>((acc, item, index) => {
    const flattenedItem: FlattenedItem<T> = {
      ...item,
      parentId,
      depth,
      index,
      isLast: items.length === index + 1,
      parent: parent
    }
    return [...acc, flattenedItem, ...flatten(item.children ?? [], item.id, depth + 1, flattenedItem)]
  }, [])
}

export function flattenTree<T extends Record<string, any>>(items: TreeItems<T>): FlattenedItem<T>[] {
  return flatten(items)
}

export function removeChildrenOf<T>(items: FlattenedItem<T>[], ids: UniqueIdentifier[]) {
  const excludeParentIds = [...ids]

  return items.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children?.length) {
        excludeParentIds.push(item.id)
      }
      return false
    }

    return true
  })
}
