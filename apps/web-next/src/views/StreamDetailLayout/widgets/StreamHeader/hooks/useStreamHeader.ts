import { useParams } from 'next/navigation'
import { useStreamDetailQuery } from '../queries/StreamDetail.generated'
import {
  UpdateStreamMutationVariables,
  useUpdateStreamMutation
} from '@/shared/api/stream/mutation/UpdateStream.generated'
import { useDeleteStreamMutation } from '@/shared/api/stream/mutation/DeleteStream.generated'

export const useStreamHeader = () => {
  const { streamSlug, campaignSlug, projectSlug } = useParams()
  const [executeUpdateStream, { loading: loadingUpdateStream }] = useUpdateStreamMutation()
  const [executeDeleteStream, { loading: loadingDeleteStream }] = useDeleteStreamMutation()

  const { data } = useStreamDetailQuery({
    variables: {
      streamSlug: +streamSlug
    }
  })
  const stream = data?.stream?.at(0)

  const toggleActive = () => {
    handleUpdateStream({
      active: !stream?.active
    })
  }

  const handleUpdateStream = async (variables: Omit<UpdateStreamMutationVariables, 'campaignId' | 'streamId'>) => {
    await executeUpdateStream({
      variables: {
        streamId: +streamSlug,
        campaignId: +campaignSlug,
        ...variables
      }
    })
  }

  const handleDeleteStream = () => {
    executeDeleteStream({
      variables: { streamId: +streamSlug }
    })
  }

  return {
    stream,
    loadingUpdateStream,
    toggleActive,
    projectSlug,
    campaignSlug,
    streamSlug,
    handleUpdateStream,
    handleDeleteStream,
    loadingDeleteStream
  }
}
