import { use, useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { FileSystemItemType } from '@/__generated__/graphql'
import { projectItemType } from '../../../hooks/useProjectTree'
import { nextTick } from '@/shared/utils/nextTick'
import { useApolloClient, useFragment } from '@apollo/client'
import { useProjectFiles } from '@/shared/hooks/useProjectFiles'
import { ProjectTreeContext } from '../../../ui/ProjectTree'
import { PROJECT_TREE_DIRECTORY_FRAGMENT, PROJECT_TREE_FRAGMENT_FRAGMENT } from '../lib/ProjectTreeItemFragment'
import { useProject } from '@/shared/hooks/useProject'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useReadProjectTreeItem } from '@/shared/api/fragment/query/useReadProjectTreeItem'

interface Options {
  itemId: number
  parentId: number
  type: keyof typeof projectItemType
  onClick?: () => void
}

export const useProjectTreeItem = ({ itemId, type, parentId, onClick }: Options) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const { openedIds, toggleIsOpen } = use(ProjectTreeContext)
  const { projectSlug } = useProject()
  const {
    updateProjectDirectory,
    updateProjectFragment,
    createProjectDirectory,
    createProjectFragment,
    deleteProjectDirectory,
    deleteProjectFragment
  } = useProjectFiles()
  const cellRef = useRef(null)
  const creatingRef = useRef(null)
  const [creatingNew, setCreatingNew] = useState<FileSystemItemType | null>(null)

  const itemData = useReadProjectTreeItem({ type, id: itemId })

  const isOpen = openedIds?.includes(itemId)
  const hasChildren = type === projectItemType.directory && (itemData.hasSubdirectories || itemData.hasFragments)
  const resultParentId = parentId ?? itemData?.parentId

  const edit = () => {
    cellRef?.current?.edit()
  }

  const handleCreateNew = (type: typeof projectItemType) => {
    setCreatingNew(type)
    nextTick(() => {
      creatingRef.current.edit()
    })
  }
  //
  const handleFinishCreateNew = async (name: string) => {
    toggleIsLoading()
    setCreatingNew(null)
    const variables = {
      projectSlug,
      parentId: itemId,
      name
    }

    const fn = creatingNew === projectItemType.directory ? createProjectDirectory : createProjectFragment
    await fn({ variables })

    toggleIsLoading()
  }

  const deleteItem = async () => {
    toggleIsLoading()
    const variables = {
      id: itemId
    }
    const fn = type === projectItemType.directory ? deleteProjectDirectory : deleteProjectFragment
    await fn({ variables })

    toggleIsLoading()
  }

  const rename = async (name: string) => {
    toggleIsLoading()

    if (type === projectItemType.fragment) {
      await updateProjectFragment({
        variables: {
          projectId: projectSlug,
          fragmentId: itemId,
          name
        }
      })
    } else if (type === projectItemType.directory) {
      await updateProjectDirectory({
        variables: {
          directoryId: itemId,
          name
        }
      })
    }

    toggleIsLoading()
  }

  return {
    isOpen,
    isLoading,
    type,
    name: itemData?.name,
    cellRef,
    creatingRef,
    creatingNew,
    hasChildren,
    toggleIsOpen: hasChildren ? () => toggleIsOpen(itemId, !isOpen) : null,
    handleCreateNew,
    handleFinishCreateNew,
    cancelCreatingNew: () => setCreatingNew(null),
    rename: resultParentId ? rename : null,
    edit: resultParentId ? edit : null,
    delete: resultParentId ? deleteItem : null,
    handleClick: () => (type === projectItemType.fragment ? onClick?.() : null) // TODO openFragment()
  }
}
