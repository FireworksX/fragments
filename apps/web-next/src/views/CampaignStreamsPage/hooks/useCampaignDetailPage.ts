import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useGraph } from '@graph-state/react'
import { LIST_STREAMS } from '../lib/listStreams'
import { DEFAULT_LOCAL_STREAM } from '@/widgets/modals/ConfigureStreamModal'
import { useListSteamsQuery } from '@/views/CampaignStreamsPage/queries/ListStreams.generated'

export const useCampaignDetailPage = () => {
  const { campaignSlug, projectSlug } = useParams()
  // const [executeCreateStream, { loading: loadingCreateStream }] = useMutation(CREATE_STREAM)
  // const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  // const [, updateModal] = useGraph(modalStore, modalStore.key)
  const { data: listStreams } = useListSteamsQuery({
    variables: {
      campaignSlug: +campaignSlug
    }
  })

  // const handleCreateStream = () => {
  //   modalStore.open(modalNames.configureStream, {
  //     isNew: true,
  //     localStream: DEFAULT_LOCAL_STREAM,
  //     onSubmit: async stream => {
  //       await executeCreateStream({
  //         variables: {
  //           name: stream.name,
  //           weight: stream.weight,
  //           active: stream.active,
  //           campaignSlug: +campaignSlug
  //         }
  //       })
  //
  //       modalStore.close()
  //     }
  //   })
  // }
  //
  // const handleUpdateStream = stream => {
  //   modalStore.open(modalNames.configureStream, {
  //     localStream: {
  //       ...DEFAULT_LOCAL_STREAM,
  //       ...stream
  //     },
  //     onSubmit: async stream => {
  //       await executeUpdateStream({
  //         variables: {
  //           id: stream.id,
  //           name: stream.name,
  //           weight: stream.weight,
  //           active: stream.active,
  //           campaignSlug: +campaignSlug
  //         }
  //       })
  //
  //       modalStore.close()
  //     }
  //   })
  // }
  //
  // useEffect(() => {
  //   updateModal({
  //     context: {
  //       loading: loadingCreateStream || loadingUpdateStream
  //     }
  //   })
  // }, [loadingCreateStream, loadingUpdateStream, updateModal])

  return {
    streams: listStreams?.stream ?? [],
    campaignSlug,
    projectSlug
  }
}
