import { useContext, useMemo, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { nodes } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { moveNode } from '@fragments/plugin-fragment-spring'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'
import { FileSystemItemType } from '@/__generated__/graphql'
import { useProjectTree as useProjectTreeMethods } from '@/shared/hooks/useProjectTree'
import { flattenTree, removeChildrenOf } from '@/widgets/fragmentBuilder/ProjectTree/lib'

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

export const useProjectTree = () => {
  const { builderManager } = useContext(BuilderContext)
  const [collapsedIds, setCollapsedIds] = useState<string[]>([])
  const { activeTabKey, openTab } = useBuilderTabs()
  const [loadingItems, setLoadingItems] = useState([])
  const { projectSlug, projectTree, createProjectTreeItem, updateProjectTreeItem, deleteProjectTreeItem } =
    useProjectTreeMethods()

  const setLoading = (id, flag) => setLoadingItems(p => (flag ? [...p, id] : p.filter(item => item !== id)))

  const flatProjectTree = useMemo(() => {
    const rootItem = {
      id: 'root',
      name: 'Project',
      nestedItems: projectTree ?? [],
      itemType: FileSystemItemType.Directory
    }

    const createItem = async (name: string, parent = 'root', type = FileSystemItemType.Directory) => {
      setLoading(parent, true)

      await createProjectTreeItem({
        variables: {
          projectSlug,
          parentId: parent === 'root' ? null : parent,
          name,
          type
        }
      })

      setLoading(parent, false)
    }

    const renameItem = async (name: string, nodeId: number) => {
      setLoading(nodeId, true)
      await updateProjectTreeItem({
        variables: {
          projectItemId: nodeId,
          name
        }
      })
      setLoading(nodeId, false)
    }

    const deleteItem = async (nodeId: number) => {
      deleteProjectTreeItem({
        variables: {
          projectItemId: nodeId
        }
      })
    }

    const buildItem = (node, deepIndex = 0) => {
      const collapsed = !collapsedIds.includes(node.id)
      const canHaveChildren = node?.itemType === FileSystemItemType.Directory
      const hasChildren = (node?.nestedItems || []).length > 0

      return {
        id: node.id,
        type: node.itemType,
        name: node.name,
        deepIndex,
        collapsed,
        children: !canHaveChildren ? [] : (node?.nestedItems || []).map(key => buildItem(key, deepIndex + 1)),
        canHaveChildren,
        isLoading: loadingItems.includes(node.id),
        selected: false, //!!targetKey && activeTabKey === targetKey,
        onCreateFolder: (name: string) => createItem(name, node.id, FileSystemItemType.Directory),
        onCreateFragment: (name: string) => createItem(name, node.id, FileSystemItemType.Fragment),
        onSelectItem: () => undefined, //builderManager.selectProjectFile(key),
        onOpenItem: () => openTab(node.target),
        onCollapse:
          canHaveChildren && hasChildren
            ? () => setCollapsedIds(p => (p.includes(node.id) ? p.filter(v => v === node.id) : [...p, node.id]))
            : null,
        onRename: (name: string) => renameItem(name, node.id),
        onDelete: () => deleteItem(node.id)
      }
    }

    const flattenedTree = flattenTree([buildItem(rootItem, 0)])

    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) => (collapsed && children?.length ? [...acc, id] : acc),
      []
    )

    return removeChildrenOf(flattenedTree, collapsedItems)
  }, [builderManager, collapsedIds, loadingItems, openTab, projectTree])

  return {
    list: flatProjectTree
  }
}
