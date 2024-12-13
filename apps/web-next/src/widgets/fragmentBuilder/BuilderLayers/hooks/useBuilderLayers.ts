import { useCallback, useContext, useEffect, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { nodes } from '@fragments/plugin-fragment-spring'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { moveNode } from '@fragments/plugin-fragment-spring'

const findIndexOfNode = (items: unknown[], linkNode: LinkKey) => {
  const index = items.findIndex(item => item.id === linkNode)

  if (index !== -1) {
    return index
  }

  return findIndexOfNode(
    items.flatMap(item => item.children),
    linkNode
  )
}

export const useBuilderLayers = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [expandedLinkKeys, setExpandedLinkKeys] = useState<string[]>([])
  const allBreakpoints = useGraphFields(documentManager, nodes.Breakpoint)
  const allFrames = useGraphFields(documentManager, nodes.Frame)

  /**
   * Реагируем на каждое изменение любого графа и обновляем стэк
   */
  useGraphStack(documentManager, [...allBreakpoints, ...allFrames])

  const getNode = (layerKey: LinkKey, deepIndex = 0) => {
    const node = documentManager.resolve(layerKey)
    const collapsed = !expandedLinkKeys.includes(layerKey)
    const isNestedFragment = node?._type === nodes.FragmentInstance && deepIndex > 0

    return {
      id: documentManager.keyOfEntity(node),
      collapsed,
      children: isNestedFragment ? [] : (node?.children || []).map(key => getNode(key, deepIndex + 1)),
      canHaveChildren: [nodes.Frame, nodes.Breakpoint].includes(node?._type)
    }
  }

  const items = [getNode(documentManager.fragment)]

  const handleCollapse = (type: 'collapse' | 'expanded', key: LinkKey) => {
    setExpandedLinkKeys(prev => (type === 'expanded' ? [...prev, key] : prev.filter(k => k !== key)))
  }

  const handleChangeItems = (nextItemsTree, reason) => {
    const { draggedFromParent: from, draggedItem, item, droppedToParent: to, type } = reason

    if (type === 'collapsed' || type === 'expanded') {
      handleCollapse(type, item.id)
    }

    if (type === 'dropped') {
      const itemKey = draggedItem?.id
      const toKey = to?.id
      const itemOrder = findIndexOfNode(nextItemsTree, itemKey)

      if (documentManager.entityOfKey(toKey)?._type === nodes.Fragment || !toKey) {
        return
      }

      moveNode(documentManager, itemKey, toKey, itemOrder)
    }
  }

  useEffect(() => {
    if (selection) {
      const allParents = selectionGraph?.getAllParents?.() ?? []
      allParents.forEach(parent => {
        const linkKey = documentManager.keyOfEntity(parent)
        setExpandedLinkKeys(prev => [...prev, linkKey])
      })
    }
  }, [selection])

  return {
    items,
    handleChangeItems
  }
}
