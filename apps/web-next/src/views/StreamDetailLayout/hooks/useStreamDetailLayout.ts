'use client'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { CHANGE_STREAM_ACTIVE } from '@/shared/api/stream/mutation/changeStreamActive'
import { UPDATE_STREAM } from '@/shared/api/stream/mutation/updateStream'
import { useEffect, useRef, useState } from 'react'
import { createState } from '@graph-state/core'
import { useLink } from '@/shared/ui/Link'
import { useGraph } from '@graph-state/react'
import { useStreamDetailQuery } from '@/views/StreamDetailLayout/queries/StreamDetail.generated'
import { useChangeStreamActiveMutation } from '@/views/StreamDetailLayout/queries/ChangeStreamActive.generated'
import { useUpdateStreamMutation } from '@/views/StreamDetailLayout/queries/UpdateStream.generated'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useStreamFilters } from '@/views/StreamDetailLayout/hooks/useStreamFilters'

export const useStreamDetailLayout = () => {
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
