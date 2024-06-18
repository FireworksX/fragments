import { useParams } from 'next/navigation'
import { useRequest } from '@/app/hooks/requests/useRequest'
import { requestType } from '@/app/hooks/requests/requestConfig'

export const useProjectDetail = () => {
  const { projectSlug } = useParams()
  const { data } = useRequest(requestType.projectDetail, { params: { projectSlug }, pause: !projectSlug })

  return {
    project: data
  }
}
