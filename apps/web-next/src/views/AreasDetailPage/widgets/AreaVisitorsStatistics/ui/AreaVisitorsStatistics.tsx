import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { InfoSection } from '@/components/InfoSection'
import { DisplayNumber } from '@/shared/ui/DisplayNumber'
import { useAreaVisitorsStatistics } from '@/views/AreasDetailPage/widgets/AreaVisitorsStatistics/hooks/useAreaVisitorsStatistics'
import { ChipTrend } from '@/shared/ui/ChipTrend'
import { calcTrendDiff } from '@/shared/utils/charts/calcTrendDiff'
import ChartIcon from '@/shared/icons/next/chart-spline.svg'
import FlowIcon from '@/shared/icons/next/chart-network.svg'
import { AreaChartSection } from '@/views/AreasDetailPage/components/AreaChartSection'
import { Trend } from '@/__generated__/types'
import { AreaChartSpline } from '@/views/AreasDetailPage/components/AreaChartSpline'
import { SplineChartPoint } from '@/shared/types'
import { AreaChartFlow } from '@/views/AreasDetailPage/components/AreaChartFlow'

interface AreaVisitorsStatisticsProps {
  className?: string
  bodyClassName?: string
}

const data: SplineChartPoint[] = [
  { formatTime: '00:01', value: 80, prevValue: 17 },
  { formatTime: '00:02', value: 30, prevValue: 40 },
  { formatTime: '00:03', value: 20, prevValue: 25 },
  { formatTime: '00:10', value: 80, prevValue: 80 },
  { formatTime: '00:50', value: 30, prevValue: 91 },
  { formatTime: '00:60', value: 20, prevValue: 34 }
]

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

const items = [
  { label: <ChartIcon />, name: 'chart' },
  { label: <FlowIcon />, name: 'flow' }
]

export const AreaVisitorsStatistics: FC<AreaVisitorsStatisticsProps> = ({ className, bodyClassName }) => {
  const { statistics, chartMode, setChartMode } = useAreaVisitorsStatistics()

  return (
    <AreaChartSection
      className={className}
      bodyClassName={bodyClassName}
      title='Visitors'
      description='Graph of visitiors on this area'
      value={421}
      trend={Trend.Up}
      trendValue={2}
      chart={chartMode}
      onChangeChart={setChartMode}
    >
      {chartMode === 'flow' ? <AreaChartFlow data={data0} /> : <AreaChartSpline data={data} />}
    </AreaChartSection>
  )
}
