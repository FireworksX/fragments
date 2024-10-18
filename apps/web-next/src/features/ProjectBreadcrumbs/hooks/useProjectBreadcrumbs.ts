import { useQuery } from '@apollo/client'
import { BREADCRUMB_PROJECT_DETAIL } from '../lib/breadcrumbProjectDetail'
import { useParams } from 'next/navigation'

export const useProjectBreadcrumbs = () => {
  const { fragmentSlug, projectSlug } = useParams()
  const { data } = useQuery(BREADCRUMB_PROJECT_DETAIL, {
    variables: {
      projectId: +projectSlug
    }
  })

  return {
    project: data?.project?.at(0)
  }
}
