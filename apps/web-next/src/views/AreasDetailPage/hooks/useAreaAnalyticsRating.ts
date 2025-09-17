import { useAreaAnalyticsQuery } from '@/views/AreasDetailPage/queries/AreaAnalytics.generated'
import { useParams } from 'next/navigation'
import { useDateCompare } from '@/shared/hooks/useDateCompare'
import { useMemo } from 'react'

export const useAreaAnalyticsRating = () => {
  const { areaSlug } = useParams()
  const dateCompare = useDateCompare('today')

  const { data } = useAreaAnalyticsQuery({
    variables: {
      areaId: +areaSlug,
      fromTs: dateCompare.fromTs,
      toTs: dateCompare.toTs
    }
  })
  const statistics = data?.areaStatisticRating?.at(0)

  console.log(data)

  return {
    pages: statistics?.currentPeriod?.pages ?? [],
    countries: statistics?.currentPeriod?.countries ?? [],
    devices: statistics?.currentPeriod?.deviceTypes ?? [],
    osTypes: statistics?.currentPeriod?.osTypes ?? [],
    browsers: statistics?.currentPeriod?.browsers ?? []
  }
}
