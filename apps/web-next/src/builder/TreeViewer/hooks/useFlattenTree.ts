import { useCallback, useContext, useMemo, useState } from 'react'
import { useRemoveChildrenOf } from './useRemoveChildrenOf'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin'
import { SceneNode } from '@fragments/fragments-plugin/src/types'
import { useGraph } from '@graph-state/react'

export interface TreeItem {
  _id: string
  _type: string
  collapsed: boolean
  selected: boolean
  renderKey: string
  children: TreeItem[]
  partialSelection: boolean
  prevSelected: boolean
  nextSelected: boolean
  handleClick: () => void
}

export interface FlattenedItem extends TreeItem {
  parentKey: string
  key: string
  depth: number
  index: number
}

export const useFlattenTree = (inputKey: string, activeKey: string) => {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { graphState } = useContext(BuilderContext)
  const [{ view }] = useGraph(graphState, graphState.builderLink)
  const [inputValue] = useGraph(graphState, inputKey)
  const { selection, select } = useBuilderSelection()

  const handleClick = useCallback((key: string) => {
    select(key)
  }, [])

  const flatten = useCallback(
    (items: TreeItem[], parentItem: FlattenedItem | null = null, depth = 0): FlattenedItem[] => {
      return items.filter(Boolean).reduce<FlattenedItem[]>((acc, item, index) => {
        const node: SceneNode = graphState.resolve(item)
        const itemKey = graphState.keyOfEntity(item)
        const selected = selection?.includes(itemKey)

        const partialSelection = selected || parentItem?.partialSelection
        const isComponent = node._type === builderNodes.Component
        const children = view === 'default' && isComponent ? [] : node.children?.map(graphState.resolve)
        const renderKey = [...(parentItem?.renderKey ?? []), itemKey]

        const cellItem: FlattenedItem = {
          _id: node._id,
          _type: node._type,
          renderKey,
          children,
          parentKey: parentItem?.key,
          depth,
          index,
          key: itemKey,
          selected,
          collapsed: !openKeys.includes(itemKey),
          partialSelection,
          nextSelected: false,
          prevSelected: false,
          handleClick: () => handleClick(itemKey)
        }

        return [...acc, cellItem, ...flatten(cellItem.children ?? [], cellItem, depth + 1)]
      }, [])
    },
    [view, handleClick, openKeys, graphState, selection]
  )

  const flattenedTree = useMemo(() => flatten(inputValue?.children ?? []), [flatten, inputValue])

  const collapsedItems = useMemo(
    () =>
      flattenedTree.reduce<string[]>(
        (acc, { children, collapsed, ...item }) => (collapsed && children?.length ? [...acc, item.key] : acc),
        []
      ),
    [flattenedTree]
  )

  const { list: cleanChildren } = useRemoveChildrenOf(
    flattenedTree,
    activeKey ? [activeKey, ...collapsedItems] : collapsedItems
  )

  const resultFlattenList = useMemo(() => {
    const selectionIndex = new Set<number>([])

    cleanChildren.forEach((el, index) => {
      if (el.partialSelection) {
        selectionIndex.add(index)
      }
    })

    return cleanChildren.map((el, index) => {
      return {
        ...el,
        prevSelected: selectionIndex.has(index) && selectionIndex.has(index - 1),
        nextSelected: selectionIndex.has(index) && selectionIndex.has(index + 1)
      }
    })
  }, [cleanChildren])

  const toggleCollapse = (layerKey: string) =>
    setOpenKeys(list => (list.includes(layerKey) ? list.filter(key => key !== layerKey) : [...list, layerKey]))

  return {
    list: resultFlattenList,
    flatten,
    toggleCollapse,
    handleClick
  }
}
