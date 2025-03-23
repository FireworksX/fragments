import { useLandingDetail } from '@/views/LandingDetail/hooks/useLandingDetail'

export const useLandingDetailHeader = () => {
  const { landing } = useLandingDetail()

  return {
    landing
  }
}
