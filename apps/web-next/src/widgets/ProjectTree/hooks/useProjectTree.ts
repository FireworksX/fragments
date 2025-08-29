import { createContext, use, useContext, useEffect, useMemo, useState } from 'react'
import { LinkKey } from '@graph-state/core'
import { buildFolderStructure } from '../lib'
import { createConstants } from '@fragmentsx/utils'
import { useProjectFiles } from '@/shared/hooks/useProjectFiles'
import { useGraph } from '@graph-state/react'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useDndMonitor } from '@dnd-kit/core'
import { DragStartEvent } from '@dnd-kit/core/dist/types'
import { useCurrentDraggable } from '@/shared/hooks/useCurrentDraggable'

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
  const { directories, rootDirectoryId, fetchingProjectDirectory } = useProjectFiles()
  const [openedIds, setOpenedIds] = useState<string[]>([])

  // console.log(droppableGraph)

  const draggable = useCurrentDraggable('projectTree')
  const draggableId = draggable?.active.data?.current?.id

  const directoriesList = useMemo(() => {
    return buildFolderStructure(directories, openedIds)
  }, [directories, openedIds])

  useEffect(() => {
    if (!openedIds?.length && rootDirectoryId) {
      setOpenedIds([rootDirectoryId])
    }
  }, [rootDirectoryId, openedIds])

  const toggleIsOpen = (id: number, flag: boolean) =>
    setOpenedIds(p => (flag ? [...p, id] : p.filter(item => item !== id)))

  return {
    openedIds,
    toggleIsOpen,
    fetching: fetchingProjectDirectory,
    list: directoriesList,
    draggableItem: draggableId
      ? directoriesList.find(item => item.type === projectItemType.fragment && item.id === draggableId)
      : null
  }
}
