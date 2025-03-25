import { useParams } from 'next/navigation'
import { useLandingDetailQuery } from '../queries/LandingDetial.generated'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useUpdateLandingMutation } from '@/views/LandingDetail/queries/UpdateLanding.generated'

export const useLandingDetail = () => {
  const { landingSlug: landingId } = useParams()

  const { data } = useLandingDetailQuery({
    variables: {
      landingId: +landingId
    }
  })

  const [handleUpdateLanding] = useUpdateLandingMutation()

  const connectFragment = id => {
    handleUpdateLanding({
      variables: {
        landingId: +landingId,
        fragmentId: id
      }
    })
  }

  const handleClickConnect = () => {
    modalStore.open(modalNames.projectTree, {
      onClick: item => {
        connectFragment(item.id)
        modalStore.close()
      }
    })
  }

  return {
    landing: data?.landing?.at(0),
    handleClickConnect
  }
}
