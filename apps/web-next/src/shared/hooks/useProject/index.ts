import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { useProjectQuery } from './queries/Project.generated'

export const useProject = () => {
  const { projectSlug: urlProjectSlug } = useParams()
  const projectSlug = urlProjectSlug ? +urlProjectSlug : 0

  const { data, loading } = useProjectQuery({
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
