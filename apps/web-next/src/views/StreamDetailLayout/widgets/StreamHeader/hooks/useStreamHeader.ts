import { useParams } from 'next/navigation'
import { useStreamDetailQuery } from '../queries/StreamDetail.generated'
import { useMemo } from 'react'

export const useStreamHeader = () => {
  const { streamSlug, areaSlug, projectSlug } = useParams()
  const [executeUpdateStream, { loading: loadingUpdateStream }] = [] //useUpdateStreamMutation()
  const [executeDeleteStream, { loading: loadingDeleteStream }] = [] //useDeleteStreamMutation()

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
        campaignId: +areaSlug,
        ...variables
      }
    })
  }

  const handleDeleteStream = () => {
    executeDeleteStream({
      variables: { streamId: +streamSlug }
    })
  }

  const filters = useMemo(() => {
    return {
      osType: stream?.filters?.find(filter => filter.__typename === 'FilterOSTypeGet'),
      deviceType: stream?.filters?.find(filter => filter.__typename === 'FilterDeviceTypeGet')
    }
  }, [stream])

  return {
    stream,
    loadingUpdateStream,
    toggleActive,
    projectSlug,
    areaSlug,
    streamSlug,
    filters,
    handleUpdateStream,
    handleDeleteStream,
    loadingDeleteStream
  }
}
