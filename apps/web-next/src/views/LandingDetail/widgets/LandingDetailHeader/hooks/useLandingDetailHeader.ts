import { useLandingDetail } from '@/views/LandingDetail/hooks/useLandingDetail'
import { useUpdateLandingMutation } from '@/views/LandingDetail/queries/UpdateLanding.generated'

export const useLandingDetailHeader = () => {
  const { landing } = useLandingDetail()
  const [handleUpdateLanding] = useUpdateLandingMutation()

  const setActive = (value: boolean) => {
    if (landing) {
      handleUpdateLanding({
        variables: {
          landingId: landing?.id,
          active: value
        }
      })
    }
  }

  return {
    landing,
    setActive
  }
}
