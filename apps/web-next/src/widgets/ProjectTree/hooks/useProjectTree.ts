import { createContext, useContext, useMemo, useState } from 'react'
import { LinkKey } from '@graph-state/core'
import { buildFolderStructure } from '../lib'
import { createConstants } from '@fragments/utils'
import { useProjectFiles } from '@/shared/hooks/useProjectFiles'

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
  const { directories, fetchingProjectDirectory } = useProjectFiles()

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
