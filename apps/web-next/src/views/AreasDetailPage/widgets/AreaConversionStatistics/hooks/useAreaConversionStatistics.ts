import { useAreaVisitorsStatisticsQuery } from '../queries/AreaVisitorsStatistics.generated'
import { useDateCompare } from '@/shared/hooks/useDateCompare'
import { useMemo, useState } from 'react'
import { buildChartDataWithCompare } from '@/shared/utils/charts/buildChartDataWithCompare'
import dayjs from '@/shared/lib/dayjs'
import { useParams } from 'next/navigation'
import { useAreaConversionStatisticsQuery } from '@/views/AreasDetailPage/widgets/AreaConversionStatistics/queries/AreaConversionStatistics.generated'

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

export const useAreaConversionStatistics = () => {
  const { areaSlug } = useParams()
  const dateCompare = useDateCompare('today')

  const { data: statisticsData } = useAreaConversionStatisticsQuery({
    variables: {
      areaId: +areaSlug,
      ...dateCompare
    }
  })

  return {
    statistics: statisticsData?.areaStatistic?.at(0)
  }
}
