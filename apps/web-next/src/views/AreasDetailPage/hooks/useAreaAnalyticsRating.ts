import { useAreaAnalyticsQuery } from '@/views/AreasDetailPage/queries/AreaAnalytics.generated'
import { useParams } from 'next/navigation'
import { CompareInterval, useDateCompare } from '@/shared/hooks/useDateCompare'
import { useMemo, useState } from 'react'
import { buildChartDataWithCompare } from '@/shared/utils/charts/buildChartDataWithCompare'
import dayjs from '@/shared/lib/dayjs'
import { Detalization } from '@/__generated__/types'
import { useAreaStatisticsQuery, useAreaVisitorsStatisticsQuery } from '../queries/AreaStatistics.generated'

export const useAreaAnalyticsRating = () => {
  const [interval, setInterval] = useState<CompareInterval>('today')
  const { areaSlug } = useParams()
  const dateCompare = useDateCompare(interval)

  const { data, loading: analyticsLoading } = useAreaAnalyticsQuery({
    variables: {
      areaId: +areaSlug,
      fromTs: dateCompare.fromTs,
      toTs: dateCompare.toTs
    }
  })

  const { data: statisticsData, loading: statisticsLoading } = useAreaStatisticsQuery({
    variables: {
      areaId: +areaSlug,
      ...dateCompare
    }
  })

  const analytics = data?.areaStatisticRating?.at(0)
  const statistics = statisticsData?.areaStatistic?.at(0)

  const visitorsChart = useMemo(
    () =>
      buildChartDataWithCompare({
        current: {
          from: dayjs(dateCompare.fromTs).valueOf(),
          to: dayjs(dateCompare.toTs).valueOf(),
          points: (statistics?.currentGroupByDate.points ?? []).map(point => ({
            time: dayjs(point.time).valueOf(),
            value: point.value?.views
          })),
          detalization: Detalization.Hour
        },
        prev: {
          from: dayjs(dateCompare.prevFromTs).valueOf(),
          to: dayjs(dateCompare.prevToTs).valueOf(),
          points: (statistics?.prevGroupByDate.points ?? []).map(point => ({
            time: dayjs(point.time).valueOf(),
            value: point.value?.views
          }))
        }
      }),
    [statistics]
  )

  const conversionChart = useMemo(
    () =>
      buildChartDataWithCompare({
        current: {
          from: dayjs(dateCompare.fromTs).valueOf(),
          to: dayjs(dateCompare.toTs).valueOf(),
          points: (statistics?.currentGroupByDate.points ?? []).map(point => ({
            time: dayjs(point.time).valueOf(),
            value: point.value?.conversion
          })),
          detalization: Detalization.Hour
        },
        prev: {
          from: dayjs(dateCompare.prevFromTs).valueOf(),
          to: dayjs(dateCompare.prevToTs).valueOf(),
          points: (statistics?.prevGroupByDate.points ?? []).map(point => ({
            time: dayjs(point.time).valueOf(),
            value: point.value?.conversion
          }))
        }
      }),
    [statistics]
  )

  return {
    statistics,
    visitorsChart,
    conversionChart,
    pages: analytics?.currentPeriod?.pages ?? [],
    countries: analytics?.currentPeriod?.countries ?? [],
    devices: analytics?.currentPeriod?.deviceTypes ?? [],
    osTypes: analytics?.currentPeriod?.osTypes ?? [],
    browsers: analytics?.currentPeriod?.browsers ?? [],
    interval,
    loading: analyticsLoading || statisticsLoading,
    setInterval
  }
}
