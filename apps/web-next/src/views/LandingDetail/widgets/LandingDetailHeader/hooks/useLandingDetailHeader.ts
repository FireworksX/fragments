import { useLandingDetail } from '@/views/LandingDetail/hooks/useLandingDetail'
import {
  UpdateLandingMutationVariables,
  useUpdateLandingMutation
} from '@/views/LandingDetail/queries/UpdateLanding.generated'

export const useLandingDetailHeader = () => {
  const { landing } = useLandingDetail()
  const [handleUpdateLanding] = useUpdateLandingMutation()

  const updateLanding = (variables: Omit<UpdateLandingMutationVariables, 'landingId'>) => {
    if (landing) {
      handleUpdateLanding({
        variables: {
          ...variables,
          landingId: landing?.id
        }
      })
    }
  }

  return {
    landing,
    updateLanding
  }
}
