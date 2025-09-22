import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { useProjectQuery } from './queries/Project.generated'
import { useCallback, useState } from 'react'
import { useUpdateProjectMutation } from '@/shared/api/project/mutaion/UpdateProject.generated'

export const useProject = () => {
  const { projectSlug: urlProjectSlug } = useParams()
  const projectSlug = urlProjectSlug ? +urlProjectSlug : 0

  const { data, loading } = useProjectQuery({
    variables: {
      projectSlug
    }
  })

  const project = data?.project?.at(0)

  const [updateProject, { loading: isUpdatingProject }] = useUpdateProjectMutation()

  const handleUpdateProperties = useCallback(nextProperties => {
    updateProject({
      variables: {
        projectSlug,
        properties: nextProperties
      }
    })
  }, [])

  return {
    projectSlug,
    project,
    loading,
    properties: project?.properties ?? [],
    updateProperties: handleUpdateProperties
  }
}
