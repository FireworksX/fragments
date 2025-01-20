import { useProject } from '@/shared/hooks/useProject'

export const useProjectBreadcrumbs = () => {
  const { project, loading } = useProject()

  return {
    project,
    loading
  }
}
