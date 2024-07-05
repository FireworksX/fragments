import { useContext, useState } from 'react'
import { useStore } from '@nanostores/react'
import { FlattenedItem, useFlattenTree } from './useFlattenTree'
import {
  defaultDropAnimation,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  Modifier
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useTreeProjection } from './useTreeProjection'
import { arrayMove } from '@dnd-kit/sortable'
import { buildTree } from '../utils'
import { BuilderContext } from '@/builder/BuilderContext'

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ]
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    })
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y
  }
}

export const useTreeViewer = (rootLayerKey: string) => {
  const { documentManager } = useContext(BuilderContext)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [overKey, setOverKey] = useState<string | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<{
    parentKey: string | null
    overKey: string
  } | null>(null)

  const { list: flattenedTree, flatten, toggleCollapse } = useFlattenTree(rootLayerKey, activeKey)

  const projected = useTreeProjection({
    items: flattenedTree,
    activeKey,
    overKey,
    indentationWidth: 21,
    dragOffset: offsetLeft
  })

  const activeItem = activeKey ? flattenedTree.find(item => item.key === activeKey) : null

  const handleDragStart = (e: DragStartEvent) => {
    const activeKey = e.active.id
    setActiveKey(activeKey)
    setOverKey(activeKey)

    const activeItem = flattenedTree.find(item => item.key === activeKey)

    if (activeItem) {
      setCurrentPosition({
        parentKey: activeItem.parentKey,
        overKey: activeKey
      })
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverKey(over?.id ?? null)
  }

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x)
  }

  const resetState = () => {
    setOverKey(null)
    setActiveKey(null)
    setOffsetLeft(0)
    setCurrentPosition(null)

    document.body.style.setProperty('cursor', '')
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState()

    if (projected && over) {
      const { depth, parentKey } = projected
      const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenedTree))
      const overIndex = clonedItems.findIndex(({ key }) => key === over.id)
      const activeIndex = clonedItems.findIndex(({ key }) => key === active.id)
      const activeTreeItem = clonedItems[activeIndex]
      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentKey }

      console.log(activeTreeItem, clonedItems[overIndex])

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      const tree = buildTree(sortedItems)
      // console.log(tree, sortedItems)
    }
  }

  return {
    list: flattenedTree,
    keys: flattenedTree.map(documentManager.keyOfEntity) as string[],
    overlayModifiers: [adjustTranslate],
    overlayDropAnimation: dropAnimationConfig,
    activeItem,
    activeKey,
    overKey,
    projected,
    handleDragStart,
    handleDragOver,
    handleDragMove,
    handleDragEnd,
    toggleCollapse
  }
}
