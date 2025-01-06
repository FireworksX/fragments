import { useContext, useEffect, useRef, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { nodes } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { moveNode } from '@fragments/plugin-fragment-spring'
import { generateId } from '@fragments/utils'
import { nextTick } from '@/shared/utils/nextTick'

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

const list = [
  {
    _type: 'TreeItem',
    _id: generateId(),
    name: 'Project',
    type: 'folder',
    children: [
      {
        _type: 'TreeItem',
        _id: generateId(),
        name: 'Shared',
        type: 'folder',
        children: [
          {
            _type: 'TreeItem',
            _id: generateId(),
            name: 'Header',
            type: 'folder'
          },
          {
            _type: 'TreeItem',
            _id: generateId(),
            name: 'Footer',
            type: 'folder'
          },
          {
            _type: 'TreeItem',
            _id: generateId(),
            name: 'Button',
            type: 'fragment'
          },
          {
            _type: 'TreeItem',
            _id: generateId(),
            name: 'PredictionCard',
            type: 'fragment'
          }
        ]
      }
    ]
  }
]

export const useProjectTree = () => {
  const [c, setC] = useState(0)
  const { documentManager, builderManager } = useContext(BuilderContext)
  const [builder] = useGraph(builderManager, builderManager.key)
  const { selection, selectionGraph } = useBuilderSelection()
  const [expandedLinkKeys, setExpandedLinkKeys] = useState<string[]>([])
  const itemRefsMap = useRef({})

  const getNode = (node, deepIndex = 0) => {
    const key = documentManager.keyOfEntity(node)
    const collapsed = !expandedLinkKeys.includes(key)
    const canHaveChildren = node?.type === 'folder'

    return {
      ...node,
      id: key,
      collapsed,
      children: !canHaveChildren ? [] : (node?.children || []).map(key => getNode(key, deepIndex + 1)),
      canHaveChildren,
      selected: builder?.selectedProjectFile === key,
      ref: element => {
        itemRefsMap.current[key] = element
      },
      onCreateFolder: () => handleCreateFolder(key),
      onCreateFragment: () => handleCreateFragment(key),
      onSelectFile: () => builderManager.selectProjectFile(key)
    }
  }

  const items = list.map(getNode)

  const handleCreateFolder = targetLink => {
    if (!targetLink) return null

    const { _id } = documentManager.entityOfKey(targetLink)
    const nextFolder = {
      _type: 'TreeItem',
      _id: generateId(),
      name: 'New Folder',
      type: 'folder'
    }

    const fn = list => {
      list?.forEach?.(node => {
        if (node._id === _id) {
          node.children.push(nextFolder)
        } else {
          fn(node?.children ?? [])
        }
      })
    }

    fn(list)

    setC(p => p + 1)
    handleCollapse('expanded', targetLink)

    nextTick(() => {
      const nextFolderRef = itemRefsMap.current[documentManager.keyOfEntity(nextFolder)]
      if (nextFolderRef) {
        nextFolderRef?.handleRename()
      }
    })
  }

  const handleCreateFragment = targetLink => {
    if (!targetLink) return null

    const { _id } = documentManager.entityOfKey(targetLink)
    const nextFolder = {
      _type: 'TreeItem',
      _id: generateId(),
      name: 'New Fragment',
      type: 'fragment'
    }

    const fn = list => {
      list?.forEach?.(node => {
        if (node._id === _id) {
          node.children.push(nextFolder)
        } else {
          fn(node?.children ?? [])
        }
      })
    }

    fn(list)

    setC(p => p + 1)
    handleCollapse('expanded', targetLink)
  }

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
  }, [documentManager, selection, selectionGraph])

  return {
    items,
    handleChangeItems,
    handleCreateFragment
  }
}
