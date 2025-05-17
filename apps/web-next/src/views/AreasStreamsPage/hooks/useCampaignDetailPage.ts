import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useCreateStreamMutation } from '@/views/AreasStreamsPage/queries/CreateStream.generated'

export const useCampaignDetailPage = () => {
  const tableRef = useRef(null)
  const { areaSlug, projectSlug } = useParams()
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
        campaignId: +areaSlug
      }
    })
  }

  const clickCreateStream = () => {
    tableRef?.current?.createNew?.()
  }

  return {
    tableRef,
    creatingStream,
    areaSlug,
    projectSlug,
    handleCreateStream,
    clickCreateStream
  }
}
