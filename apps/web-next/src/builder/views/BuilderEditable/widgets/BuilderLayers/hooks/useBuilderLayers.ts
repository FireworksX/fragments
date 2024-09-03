import { useCallback, useContext, useState } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { nodes } from '@fragments/plugin-state'

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
  const [expandedLinkKeys, setExpandedLinkKeys] = useState<string[]>([])
  const allBreakpoints = useGraphFields(documentManager, nodes.Breakpoint)
  const allFrames = useGraphFields(documentManager, nodes.Frame)

  /**
   * Реагируем на каждое изменение любого графа и обновляем стэк
   */
  useGraphStack(documentManager, [...allBreakpoints, ...allFrames])

  const getNode = (layerKey: LinkKey) => {
    const node = documentManager.resolve(layerKey)
    const collapsed = !expandedLinkKeys.includes(layerKey)

    return {
      id: documentManager.keyOfEntity(node),
      collapsed,
      children: (node?.children || []).map(key => getNode(key)),
      canHaveChildren: [nodes.Frame, nodes.Breakpoint].includes(node?._type)
    }
  }

  const items = getNode(documentManager.key).children

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

      documentManager.moveNode(itemKey, toKey, itemOrder)
    }
  }

  return {
    items,
    handleChangeItems
  }
}
