'use client'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { STREAM_DETAIL } from '@/shared/api/stream/query/streamDetail'
import { CHANGE_STREAM_ACTIVE } from '@/shared/api/stream/mutation/changeStreamActive'
import { UPDATE_STREAM } from '@/shared/api/stream/mutation/updateStream'
import { useEffect, useRef } from 'react'
import { createState } from '@graph-state/core'
import { useLink } from '@/shared/ui/Link'
import { useGraph } from '@graph-state/react'

export const useStreamDetailLayout = () => {
  const { replace } = useRouter()
  const defaultStreamLink = useLink({ type: 'stream' })
  const localStreamState = useRef(createState())
  const [localStream, updateLocalStream] = useGraph(localStreamState?.current, localStreamState.current?.key)
  const { streamSlug, campaignSlug, projectSlug } = useParams()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('editMode') === 'true'

  const [executeChangeStreamActive, { loading: loadingChangeStreamActive }] = useMutation(CHANGE_STREAM_ACTIVE)
  const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  const { data } = useQuery(STREAM_DETAIL, {
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
    replace(defaultStreamLink.href)
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
    handleUpdateStream
  }
}
