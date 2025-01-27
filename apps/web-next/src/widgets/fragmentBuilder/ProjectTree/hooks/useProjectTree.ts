import { useContext, useMemo, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { nodes } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { moveNode } from '@fragments/plugin-fragment-spring'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'
import { FileSystemItemType } from '@/__generated__/graphql'
import { useProjectTree as useProjectTreeMethods } from '@/shared/hooks/useProjectTree'
import { flattenTree, removeChildrenOf } from '@/widgets/fragmentBuilder/ProjectTree/lib'
import { useGraph } from '@graph-state/react'
import { createConstants } from '@fragments/utils'
import { useProject } from '@/shared/hooks/useProject'

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

export const projectItemType = createConstants('directory', 'fragment')

export const useProjectTree = () => {
  const { builderManager } = useContext(BuilderContext)
  const [collapsedIds, setCollapsedIds] = useState<string[]>([])
  const { activeTabKey, openTab } = useBuilderTabs()
  const [droppableGraph] = useGraph(builderManager, builderManager.droppableKey)
  const [loadingItems, setLoadingItems] = useState([])
  const {
    projectSlug,
    tree,
    loadDirectory,
    createProjectFragment,
    updateProjectFragment,
    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory
  } = useProjectTreeMethods()

  console.log(tree)

  const setLoading = (id, flag) => setLoadingItems(p => (flag ? [...p, id] : p.filter(item => item !== id)))

  const flatProjectTree = useMemo(() => {
    const createItem = async (name: string, type: keyof typeof projectItemType, parent = -1) => {
      setLoading(parent, true)

      if (type === projectItemType.fragment) {
        await createProjectFragment({
          variables: {
            projectSlug,
            parentId: parent === -1 ? null : parent,
            name
          }
        })
      } else if (type === projectItemType.directory) {
        await createProjectDirectory({
          variables: {
            projectSlug,
            parentId: parent === -1 ? null : parent,
            name
          }
        })
      }

      setLoading(parent, false)
    }

    const renameItem = async (name: string, nodeId: number, type: keyof typeof projectItemType) => {
      setLoading(nodeId, true)

      if (type === projectItemType.fragment) {
        await updateProjectFragment({
          variables: {
            projectId: projectSlug,
            fragmentId: nodeId,
            name
          }
        })
      } else if (type === projectItemType.directory) {
        await updateProjectDirectory({
          variables: {
            directoryId: nodeId,
            name
          }
        })
      }

      setLoading(nodeId, false)
    }

    const deleteItem = async (nodeId: number) => {
      deleteProjectDirectory({
        variables: {
          directoryId: nodeId
        }
      })
    }

    const buildItem = (node, deepIndex = 0) => {
      if (!node) {
        return null
      }

      const collapsed = !collapsedIds.includes(node.id)
      const itemType = node.__typename === 'ProjectDirectoryGet' ? projectItemType.directory : projectItemType.fragment
      const canHaveChildren = itemType === projectItemType.directory
      const children = [...(node?.children ?? []), ...(node?.fragments ?? [])]
      const loaded = node?.hasSubdirectories && node?.children?.length > 0
      const hasChildren = (children || []).length > 0 || !!node?.hasSubdirectories

      const getHandleCollapse = () => {
        if (canHaveChildren) {
          if (loaded) {
            return () => setCollapsedIds(p => (p.includes(node.id) ? p.filter(v => v === node.id) : [...p, node.id]))
          } else {
            return () => loadDirectory(node.id)
          }
        }
      }

      return {
        id: node.id,
        type: itemType,
        name: node.name === 'root' ? 'Project' : node.name,
        deepIndex,
        collapsed,
        children: !canHaveChildren ? [] : children.map(key => buildItem(key, deepIndex + 1)),
        hasChildren,
        canHaveChildren,
        isLoading: loadingItems.includes(node.id),
        selected: false, //!!targetKey && activeTabKey === targetKey,
        onCreateFolder: (name: string) => createItem(name, projectItemType.directory, node.id),
        onCreateFragment: (name: string) => createItem(name, projectItemType.fragment, node.id),
        onSelectItem: () => undefined, //builderManager.selectProjectFile(key),
        onOpenItem: () => openTab(node.target),
        onCollapse: getHandleCollapse(),
        onRename: (name: string) => renameItem(name, node.id, itemType),
        onDelete: () => deleteItem(node.id)
      }
    }

    const flattenedTree = flattenTree([buildItem(tree.at(0), 0)])

    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) => (collapsed && children?.length ? [...acc, id] : acc),
      []
    )

    return removeChildrenOf(flattenedTree, collapsedItems)
  }, [
    collapsedIds,
    createProjectDirectory,
    createProjectFragment,
    deleteProjectDirectory,
    loadingItems,
    openTab,
    projectSlug,
    tree,
    updateProjectDirectory,
    updateProjectFragment
  ])

  return {
    list: flatProjectTree,
    draggableItem: droppableGraph.activeDraggable
      ? flatProjectTree.find(item => item.id === droppableGraph.activeDraggable.id)
      : null
  }
}
