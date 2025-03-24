import { projectItemType } from '../hooks/useProjectTree'

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
    return [...acc, flattenedItem, ...(item ? flatten(item.children ?? [], item.id, depth + 1, flattenedItem) : [])]
  }, [])
}

export function flattenTree<T extends Record<string, any>>(items: TreeItems<T>): FlattenedItem<T>[] {
  return flatten(items.filter(Boolean))
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

type Folder = {
  id: string
  parentId?: string | null
}

export function buildFolderStructure(folders: Folder[], opened: string[]): (Folder & { deepIndex: number })[] {
  const folderMap = new Map(folders.map(f => [f.id, f]))
  const result: ResultItem[] = []

  function getDeepIndex(folder: Folder): number {
    if (!folder.parentId) return 0
    return folderMap.get(folder.parentId) ? getDeepIndex(folderMap.get(folder.parentId)!) + 1 : 0
  }

  function processFolder(folder: Folder) {
    const deepIndex = getDeepIndex(folder)
    result.push({ id: folder.id, deepIndex, type: projectItemType.directory })

    if (opened.includes(folder.id)) {
      // Добавляем фрагменты после папки
      folder.fragments?.forEach(file =>
        result.push({ id: file.id, deepIndex: deepIndex + 1, type: projectItemType.fragment })
      )

      // Добавляем вложенные папки
      folders.filter(f => f.parentId === folder.id).forEach(subFolder => processFolder(subFolder))
    }
  }

  // Начинаем с корневых папок
  folders.filter(f => !f.parentId).forEach(rootFolder => processFolder(rootFolder))

  return result
}
