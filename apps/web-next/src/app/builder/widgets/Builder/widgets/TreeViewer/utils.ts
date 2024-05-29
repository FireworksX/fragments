import { FlattenedItem, TreeItem } from './hooks/useFlattenTree'
import { UniqueIdentifier } from '@dnd-kit/core'

export function buildTree(flattenedItems: FlattenedItem[]): TreeItem[] {
  const root: TreeItem = { _id: 'root', children: [] }
  const nodes: Record<string, TreeItem> = { [root._id]: root }
  const items = flattenedItems.map(item => ({ ...item, children: [] }))

  for (const item of items) {
    const { _id, children } = item
    const parentId = item.parentId ?? root._id
    const parent = nodes[parentId] ?? findItem(items, parentId)

    nodes[_id] = { _id, children }
    parent.children.push(item)
  }

  return root.children
}

export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId)
}
