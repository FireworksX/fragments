import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { PROJECT_DIRECTORY, PROJECT_TREE } from './lib/projectDirectory'
import { DELETE_PROJECT_DIRECTORY, DELETE_PROJECT_TREE_ITEM } from './lib/deleteProjectDirectory'
import { UPDATE_PROJECT_DIRECTORY, UPDATE_PROJECT_TREE_ITEM } from './lib/updateProjectDirectory'
import { CREATE_PROJECT_DIRECTORY, CREATE_PROJECT_TREE_ITEM } from './lib/createProjectDirectory'
import { useProject } from '@/shared/hooks/useProject'
import { CREATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/createProjectFragment'
import { UPDATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/updateProjectFragment'
import { useMemo } from 'react'

export const useProjectTree = () => {
  const client = useApolloClient()
  const cacheData = client.cache.extract()
  const allDirectories = Object.values(cacheData).filter(item => item?.__typename === 'ProjectDirectoryGet')

  const tree = useMemo(() => {
    const rootItem = allDirectories.find(item => item.id === -1)

    if (!rootItem) return []

    const root: TreeItem = { id: 'root', children: [] }
    const nodes: Record<string, TreeItem> = { [root.id]: root }
    const items = allDirectories.map(item => ({ ...item, children: [] }))

    for (const item of items) {
      const { id, children } = item
      const parentId = item.parentId ?? root.id
      const parent = nodes[parentId] ?? allDirectories.find(item => item.id === parentId)

      nodes[id] = { id, children }
      parent.children.push(item)
    }

    return root.children
  }, [allDirectories])

  const { projectSlug } = useProject()

  const { data, refetch } = useQuery(PROJECT_DIRECTORY, {
    variables: {
      projectSlug
    }
  })

  const [createProjectDirectory] = useMutation(CREATE_PROJECT_DIRECTORY)
  const [updateProjectDirectory] = useMutation(UPDATE_PROJECT_DIRECTORY)
  const [deleteProjectDirectory] = useMutation(DELETE_PROJECT_DIRECTORY)

  const [createProjectFragment] = useMutation(CREATE_PROJECT_FRAGMENT)
  const [updateProjectFragment] = useMutation(UPDATE_PROJECT_FRAGMENT)
  // const [deleteProjectDirectory] = useMutation(DELETE_PROJECT_DIRECTORY)

  return {
    projectSlug,
    tree,

    loadDirectory: (directoryId: number) => refetch({ projectSlug, directoryId }),

    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory,

    createProjectFragment,
    updateProjectFragment
  }
}
