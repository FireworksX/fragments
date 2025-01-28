import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { PROJECT_DIRECTORY, PROJECT_DIRECTORY_FRAGMENT } from './lib/projectDirectory'
import { DELETE_PROJECT_DIRECTORY } from './lib/deleteProjectDirectory'
import { UPDATE_PROJECT_DIRECTORY } from './lib/updateProjectDirectory'
import { CREATE_PROJECT_DIRECTORY } from './lib/createProjectDirectory'
import { useProject } from '@/shared/hooks/useProject'
import { CREATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/createProjectFragment'
import { UPDATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/updateProjectFragment'
import { useMemo } from 'react'
import { gql } from '@/__generated__'

export const useProjectTree = () => {
  const client = useApolloClient()
  const cacheData = client.cache.extract()
  const allDirectories = Object.values(cacheData)
    .filter(item => item?.__typename === 'ProjectDirectoryGet')
    .map(directory => {
      const object = client.readFragment({
        id: client.cache.identify(directory),
        fragment: PROJECT_DIRECTORY_FRAGMENT
      })

      return object ?? directory
    })

  const tree = useMemo(() => {
    // Создаём карту для быстрого доступа к элементам по их ID
    const map = new Map()

    // Добавляем каждый элемент в карту и добавляем ему свойство children
    allDirectories.forEach(item => {
      map.set(item.id, { ...item, children: [] })
    })

    // Проходим по элементам и распределяем их по дереву
    return allDirectories.reduce((acc, item) => {
      if (item.parentId === null) {
        // Если нет parentId, добавляем в корень
        acc.push(map.get(item.id))
      } else {
        // Если есть parentId, добавляем в children родителя
        const parent = map.get(item.parentId)
        if (parent) {
          parent.children.push(map.get(item.id))
        }
      }

      return acc
    }, [])
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
