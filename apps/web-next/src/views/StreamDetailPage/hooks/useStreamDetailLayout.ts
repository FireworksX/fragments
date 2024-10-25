'use client'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useSearchParams } from 'next/navigation'
import { STREAM_DETAIL } from '@/shared/api/stream/query/streamDetail'
import { CHANGE_STREAM_ACTIVE } from '@/shared/api/stream/mutation/changeStreamActive'

export const useStreamDetailLayout = () => {
  const { streamSlug, campaignSlug, projectSlug } = useParams()
  const searchParams = useSearchParams()

  const [executeChangeStreamActive, { loading: loadingChangeStreamActive }] = useMutation(CHANGE_STREAM_ACTIVE)
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

  return {
    stream,
    loadingChangeStreamActive,
    toggleActive,
    isEditMode: searchParams.get('editMode') === 'true',
    projectSlug,
    campaignSlug,
    streamSlug
  }
}
