import { useContext, useEffect, useRef, useState, useTransition } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { nodes } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { moveNode } from '@fragments/plugin-fragment-spring'
import { generateId } from '@fragments/utils'
import { nextTick } from '@/shared/utils/nextTick'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'

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
            type: 'fragment',
            target: {
              _type: 'FragmentModule',
              _id: generateId(),
              name: 'Button',
              fragment: 'Fragment:buttonid'
            }
          },
          {
            _type: 'TreeItem',
            _id: generateId(),
            name: 'PredictionCard',
            type: 'fragment',
            target: {
              _type: 'FragmentModule',
              _id: generateId(),
              name: 'PredictionCard',
              fragment: 'Fragment:g34gherhg3g'
            }
          }
        ]
      }
    ]
  }
]

export const useProjectTree = () => {
  const [c, setC] = useState(0)
  const { builderManager } = useContext(BuilderContext)
  const [expandedLinkKeys, setExpandedLinkKeys] = useState<string[]>([])
  const itemRefsMap = useRef({})
  const { activeTabKey, openTab } = useBuilderTabs()

  const getNode = (node, deepIndex = 0) => {
    const key = builderManager.keyOfEntity(node)
    const targetKey = builderManager.keyOfEntity(node.target)
    const collapsed = !expandedLinkKeys.includes(key)
    const canHaveChildren = node?.type === 'folder'

    return {
      ...node,
      id: key,
      collapsed,
      children: !canHaveChildren ? [] : (node?.children || []).map(key => getNode(key, deepIndex + 1)),
      canHaveChildren,
      selected: !!targetKey && activeTabKey === targetKey,
      ref: element => {
        itemRefsMap.current[key] = element
      },
      onCreateFolder: () => handleCreateFolder(key),
      onCreateFragment: () => handleCreateFragment(key),
      onSelectItem: () => builderManager.selectProjectFile(key),
      onOpenItem: () => openTab(node.target)
    }
  }

  const items = list.map(getNode)

  const handleCreateFolder = targetLink => {
    if (!targetLink) return null

    const { _id } = builderManager.entityOfKey(targetLink)
    const nextFolder = {
      _type: 'TreeItem',
      _id: generateId(),
      name: 'New Folder',
      type: 'folder'
    }

    const fn = list => {
      list?.forEach?.(node => {
        if (node._id === _id) {
          node.children?.push?.(nextFolder)
        } else {
          fn(node?.children ?? [])
        }
      })
    }

    fn(list)

    setC(p => p + 1)
    handleCollapse('expanded', targetLink)

    nextTick(() => {
      const nextFolderRef = itemRefsMap.current[builderManager.keyOfEntity(nextFolder)]
      if (nextFolderRef) {
        nextFolderRef?.handleRename()
      }
    })
  }

  const handleCreateFragment = targetLink => {
    if (!targetLink) return null

    const { _id } = builderManager.entityOfKey(targetLink)
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
    nextTick(() => {
      const nextFolderRef = itemRefsMap.current[builderManager.keyOfEntity(nextFolder)]
      if (nextFolderRef) {
        nextFolderRef?.handleRename()
      }
    })
  }

  const handleCollapse = (type: 'collapse' | 'expanded', key: LinkKey) => {
    setExpandedLinkKeys(prev => (type === 'expanded' ? [...prev, key] : prev.filter(k => k !== key)))
  }

  const handleChangeItems = (nextItemsTree, reason) => {
    const { draggedFromParent: from, draggedItem, item, droppedToParent: to, type } = reason

    if (type === 'collapsed' || type === 'expanded') {
      handleCollapse(type, item.id)
    }

    console.log(nextItemsTree, reason)

    if (type === 'dropped') {
      const itemKey = draggedItem?.id
      const toKey = to?.id
      const itemOrder = findIndexOfNode(nextItemsTree, itemKey)

      if (builderManager.entityOfKey(toKey)?._type === nodes.Fragment || !toKey) {
        return
      }

      moveNode(builderManager, itemKey, toKey, itemOrder)
    }
  }

  return {
    items,
    handleChangeItems,
    handleCreateFragment
  }
}
