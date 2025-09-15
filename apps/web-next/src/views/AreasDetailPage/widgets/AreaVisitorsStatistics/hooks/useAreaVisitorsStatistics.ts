import { useAreaVisitorsStatisticsQuery } from '../queries/AreaVisitorsStatistics.generated'
import { useDateCompare } from '@/shared/hooks/useDateCompare'
import { useMemo, useState } from 'react'
import { buildChartDataWithCompare } from '@/shared/utils/charts/buildChartDataWithCompare'
import dayjs from '@/shared/lib/dayjs'
import { useParams } from 'next/navigation'

const data0 = {
  nodes: [
    { name: 'Area' },
    { name: 'Campaign 1' },
    { name: 'Campaign 2' },
    { name: 'Variant A' },
    { name: 'Variant B' }
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 1, target: 2, value: 40 },
    { source: 1, target: 3, value: 30 },
    { source: 1, target: 4, value: 30 }
  ]
}

export const useAreaVisitorsStatistics = () => {
  const { areaSlug } = useParams()
  const [chartMode, setChartMode] = useState<'chart' | 'flow'>('chart')
  const dateCompare = useDateCompare('today')

  const { data: statisticsData } = useAreaVisitorsStatisticsQuery({
    variables: {
      areaId: +areaSlug,
      ...dateCompare
    }
  })

  console.log(statisticsData, dateCompare)

  const chartData = useMemo(() => {
    if (chartMode === 'flow') {
      return data0
    }

    return []
  }, [chartMode])

  const resultStatistics = useMemo(() => {
    const stats = statisticsData?.areaStatistic?.at(0)

    return {
      ...stats
      // splinePoints: buildChartDataWithCompare({
      //   current: {
      //     from: dayjs(dateCompare.fromTs).valueOf(),
      //     to: dayjs(dateCompare.toTs).valueOf(),
      //     points: (stats?.currentGroupByDate.points ?? []).map(point => ({
      //       time: dayjs(point.time).valueOf(),
      //       value: point.value?.conversion
      //     })),
      //     detalization: Detalization.Hour
      //   },
      //   prev: {
      //     from: dayjs(dateCompare.prevFromTs).valueOf(),
      //     to: dayjs(dateCompare.prevToTs).valueOf(),
      //     points: (goalStatistic?.prevGroupByDate.points ?? []).map(point => ({
      //       time: dayjs(point.time).valueOf(),
      //       value: point.value?.conversion
      //     }))
      //   }
      // })
    }
  }, [])

  return {
    chartData,
    chartMode,
    setChartMode,
    statistics: statisticsData?.areaStatistic?.at(0)
  }
}
