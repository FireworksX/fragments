import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { PROJECT } from '@/shared/hooks/useProject/lib/project'

export const useProject = () => {
  const { projectSlug: urlProjectSlug } = useParams()
  const projectSlug = urlProjectSlug ? +urlProjectSlug : 0

  const { data, loading } = useQuery(PROJECT, {
    variables: {
      projectSlug
    }
  })

  const project = data?.project?.at(0)

  return {
    projectSlug,
    project,
    loading
  }
}
