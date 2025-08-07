import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Trend } from '@/__generated__/types'
import { AreaChartFlow } from '@/views/AreasDetailPage/components/AreaChartFlow'
import { AreaChartSpline } from '@/views/AreasDetailPage/components/AreaChartSpline'
import { AreaChartSection } from '@/views/AreasDetailPage/components/AreaChartSection'
import { SplineChartPoint } from '@/shared/types'

interface AreaConversionStatisticsProps {
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

export const AreaConversionStatistics: FC<AreaConversionStatisticsProps> = ({ className, bodyClassName }) => {
  return (
    <AreaChartSection
      className={className}
      bodyClassName={bodyClassName}
      title='Conversion'
      description='Conversion of area'
      value={0.1}
      format={{ style: 'percent' }}
      trend={Trend.Up}
      trendValue={0.1}
      chart={'chart'}
      // onChangeChart={setChartMode}
    >
      {'chart' === 'flow' ? <AreaChartFlow data={data0} /> : <AreaChartSpline data={data} />}
    </AreaChartSection>
  )
}
