import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useListSteamsQuery } from '@/views/CampaignStreamsPage/queries/ListStreams.generated'
import { useCreateStreamMutation } from '@/views/CampaignStreamsPage/queries/CreateStream.generated'

export const useCampaignDetailPage = () => {
  const creatingRef = useRef<ComponentRef<'div'>>(null)
  const [creatingName, setCreatingName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const { campaignSlug, projectSlug } = useParams()
  const [createStream, { loading: creatingStream }] = useCreateStreamMutation()
  // const [executeCreateStream, { loading: loadingCreateStream }] = useMutation(CREATE_STREAM)
  // const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  // const [, updateModal] = useGraph(modalStore, modalStore.key)
  const { data: listStreams } = useListSteamsQuery({
    variables: {
      campaignSlug: +campaignSlug
    }
  })

  useEffect(() => {
    if (isCreating) {
      creatingRef?.current?.focus()
    } else {
      setCreatingName('')
    }
  }, [isCreating])

  const handleCreateStream = async () => {
    await createStream({
      variables: {
        name: creatingName,
        active: false,
        weight: 0,
        campaignId: +campaignSlug
      }
    })

    setIsCreating(false)
  }

  return {
    creatingStream,
    creatingName,
    setCreatingName,
    creatingRef,
    isCreating,
    setIsCreating,
    streams: listStreams?.stream ?? [],
    campaignSlug,
    projectSlug,
    handleCreateStream
  }
}
