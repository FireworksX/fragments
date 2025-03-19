import { useProject } from '@/shared/hooks/useProject'
import { useProjectsListQuery } from '../queries/ProjectsList.generated'

export const useProjectBreadcrumbs = () => {
  const { project, loading } = useProject()
  const { data } = useProjectsListQuery()

  const homeProject = project ?? data?.project?.at(0)

  return {
    homeProject,
    project,
    loading,
    list: data?.project ?? []
  }
}
