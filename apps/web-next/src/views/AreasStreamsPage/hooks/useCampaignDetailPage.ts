import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useCreateCampaignMutation } from '@/views/AreasStreamsPage/queries/CreateCampaign.generated'

export const useCampaignDetailPage = () => {
  const tableRef = useRef(null)
  const { areaSlug, projectSlug } = useParams()
  const [createStream, { loading: creatingStream }] = useCreateCampaignMutation()
  // const [executeCreateStream, { loading: loadingCreateStream }] = useMutation(CREATE_STREAM)
  // const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  // const [, updateModal] = useGraph(modalStore, modalStore.key)

  const handleCreateStream = async name => {
    await createStream({
      variables: {
        name,
        active: false,
        areaId: +areaSlug
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
