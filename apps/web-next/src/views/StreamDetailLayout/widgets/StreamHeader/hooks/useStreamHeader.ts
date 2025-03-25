import { useEffect, useRef, useState } from 'react'
import { createState } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { useParams } from 'next/navigation'
import { useChangeStreamActiveMutation } from '../queries/ChangeStreamActive.generated'
import { useUpdateStreamMutation } from '../queries/UpdateStream.generated'
import { useStreamDetailQuery } from '../queries/StreamDetail.generated'

export const useStreamHeader = () => {
  const localStreamState = useRef(createState())
  const [localStream, updateLocalStream] = useGraph(localStreamState?.current, localStreamState.current?.key)
  const { streamSlug, campaignSlug, projectSlug } = useParams()
  const [isEditMode, setIsEditMode] = useState(false)
  const [executeChangeStreamActive, { loading: loadingChangeStreamActive }] = useChangeStreamActiveMutation()
  const [executeUpdateStream, { loading: loadingUpdateStream }] = useUpdateStreamMutation()

  const { data } = useStreamDetailQuery({
    variables: {
      streamSlug: +streamSlug
    }
  })
  const stream = data?.stream?.at(0)

  const toggleActive = () => {
    executeChangeStreamActive({
      variables: {
        streamSlug: +streamSlug,
        campaignSlug: +campaignSlug,
        active: !stream?.active
      }
    })
  }

  const handleUpdateStream = async () => {
    await executeUpdateStream({
      variables: {
        streamSlug: +streamSlug,
        campaignSlug: +campaignSlug,
        name: localStream?.name
      }
    })
    setIsEditMode(false)
  }

  useEffect(() => {
    if (isEditMode) {
      localStreamState.current.mutate(stream)
    } else {
      // console.log(localStreamState.current)
    }
  }, [isEditMode, stream])

  return {
    stream,
    loadingChangeStreamActive,
    loadingUpdateStream,
    toggleActive,
    isEditMode,
    projectSlug,
    campaignSlug,
    streamSlug,
    localStream,
    updateLocalStream,
    handleUpdateStream,
    setIsEditMode
  }
}
