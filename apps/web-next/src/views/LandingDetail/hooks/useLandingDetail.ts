import { useParams } from 'next/navigation'
import { useLandingDetailQuery } from '../queries/LandingDetial.generated'

export const useLandingDetail = () => {
  const { landingSlug: landingId } = useParams()

  const { data } = useLandingDetailQuery({
    variables: {
      landingId: +landingId
    }
  })

  return {
    landing: data?.landing?.at(0)
  }
}
