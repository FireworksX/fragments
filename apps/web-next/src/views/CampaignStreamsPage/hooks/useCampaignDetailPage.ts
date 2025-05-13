import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useListSteamsQuery } from '@/views/CampaignStreamsPage/queries/ListStreams.generated'
import { useCreateStreamMutation } from '@/views/CampaignStreamsPage/queries/CreateStream.generated'

export const useCampaignDetailPage = () => {
  const tableRef = useRef(null)
  const { campaignSlug, projectSlug } = useParams()
  const [createStream, { loading: creatingStream }] = useCreateStreamMutation()
  // const [executeCreateStream, { loading: loadingCreateStream }] = useMutation(CREATE_STREAM)
  // const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  // const [, updateModal] = useGraph(modalStore, modalStore.key)

  const handleCreateStream = async name => {
    await createStream({
      variables: {
        name,
        active: false,
        weight: 0,
        campaignId: +campaignSlug
      }
    })
  }

  const clickCreateStream = () => {
    tableRef?.current?.createNew?.()
  }

  return {
    tableRef,
    creatingStream,
    campaignSlug,
    projectSlug,
    handleCreateStream,
    clickCreateStream
  }
}
