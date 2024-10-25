import { useMutation } from '@apollo/client'
import { UPDATE_STREAM } from '@/widgets/campaigns/StreamPreviewItem/lib/updateStream'
import { useParams } from 'next/navigation'
import { StreamPreviewItemProps } from '@/widgets/campaigns/StreamPreviewItem/ui/StreamPreviewItem'
import { CHANGE_STREAM_ACTIVE } from '@/shared/api/stream/mutation/changeStreamActive'

export const useStreamPreviewItem = (item: StreamPreviewItemProps) => {
  const { campaignSlug } = useParams()
  const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(CHANGE_STREAM_ACTIVE)

  const toggleActive = () => {
    executeUpdateStream({
      variables: {
        streamSlug: +item.id,
        campaignSlug: +campaignSlug,
        active: !item.active
      }
    })
  }

  return {
    toggleActive,
    loadingUpdateStream
  }
}
