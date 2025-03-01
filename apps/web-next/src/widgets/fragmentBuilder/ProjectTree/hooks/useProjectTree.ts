import { createContext, useContext, useMemo, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { nodes } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { moveNode } from '@fragments/plugin-fragment-spring'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'
import { FileSystemItemType } from '@/__generated__/graphql'
import { useProjectFiles, useProjectFiles as useProjectTreeMethods } from '../../../../shared/hooks/useProjectFiles'
import {
  buildFolderStructure,
  flattenTree,
  formatDirectories,
  removeChildrenOf
} from '@/widgets/fragmentBuilder/ProjectTree/lib'
import { useGraph } from '@graph-state/react'
import { createConstants } from '@fragments/utils'
import { useProject } from '@/shared/hooks/useProject'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

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
  const [openedIds, setOpenedIds] = useState<string[]>([])
  const { directories, fetchingProjectDirectory } = useProjectTreeMethods()

  const directoriesList = useMemo(() => {
    return buildFolderStructure(directories, openedIds)
  }, [directories, openedIds])

  const toggleIsOpen = (id: number, flag: boolean) =>
    setOpenedIds(p => (flag ? [...p, id] : p.filter(item => item !== id)))

  return {
    openedIds,
    toggleIsOpen,
    fetching: fetchingProjectDirectory,
    list: directoriesList
    // draggableItem: droppableGraph.activeDraggable
    //   ? flatProjectTree.find(
    //       item => item.type === projectItemType.fragment && item.id === droppableGraph.activeDraggable.id
    //     )
    //   : null
  }
}
