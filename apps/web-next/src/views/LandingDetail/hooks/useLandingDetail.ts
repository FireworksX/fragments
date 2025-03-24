import { useParams } from 'next/navigation'
import { useLandingDetailQuery } from '../queries/LandingDetial.generated'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'

export const useLandingDetail = () => {
  const { landingSlug: landingId } = useParams()

  const { data } = useLandingDetailQuery({
    variables: {
      landingId: +landingId
    }
  })

  const connectFragment = () => {}

  const handleClickConnect = () => {
    modalStore.open(modalNames.projectTree, {
      onClick: item => {
        console.log(item)
      }
    })
  }

  return {
    landing: data?.landing?.at(0),
    handleClickConnect
  }
}
