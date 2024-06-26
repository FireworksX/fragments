import { FlattenedItem } from './useFlattenTree'
import { arrayMove } from '@dnd-kit/sortable'

interface Options {
  items: FlattenedItem[]
  activeKey: string
  overKey: string
  dragOffset: number
  indentationWidth: number
}

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth)
}

const getMaxDepth = ({ previousItem }: { previousItem: FlattenedItem }) => {
  if (previousItem) {
    return previousItem.depth + 1
  }

  return 0
}
const getMinDepth = ({ nextItem }: { nextItem: FlattenedItem }) => {
  if (nextItem) {
    return nextItem.depth
  }

  return 0
}

export const useTreeProjection = ({ items, overKey, activeKey, dragOffset, indentationWidth }: Options) => {
  const overItemIndex = items.findIndex(({ key }) => key === overKey)
  const activeItemIndex = items.findIndex(({ key }) => key === activeKey)
  const activeItem = items.at(activeItemIndex)
  const newItems = arrayMove(items, activeItemIndex, overItemIndex)
  const previousItem = newItems.at(overItemIndex - 1)
  const nextItem = newItems.at(overItemIndex + 1)
  const dragDepth = getDragDepth(dragOffset, indentationWidth)
  const projectDepth = (activeItem?.depth ?? 0) + dragDepth
  const maxDepth = getMaxDepth({ previousItem })
  const minDepth = getMinDepth({ nextItem })
  let depth = projectDepth

  if (projectDepth >= maxDepth) {
    depth = maxDepth
  } else if (projectDepth < minDepth) {
    depth = minDepth
  }

  const getParentKey = () => {
    if (depth === 0 || !previousItem) {
      return null
    }

    if (depth === previousItem.depth) {
      return previousItem.parentKey
    }

    if (depth > previousItem.depth) {
      return previousItem.key
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find(item => item.depth === depth)?.parentKey

    return newParent ?? null
  }

  return { depth, maxDepth, minDepth, parentKey: getParentKey() }
}
