import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import {
  Area,
  AreaChart,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { SplineChartPoint } from '@/shared/types'
import { ChartTooltip } from '@/shared/ui/charts/ChartTooltip'

interface AreaChartSplineProps {
  className?: string
  data: SplineChartPoint[]
  nestedKeys?: string[]
}

export const AreaChartSpline: FC<AreaChartSplineProps> = ({ className, data, nestedKeys }) => {
  return (
    <ResponsiveContainer className={className} width='100%' height={320}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient gradientTransform='rotate(90)' id='fill-gradient'>
            <stop offset='0%' stopColor='var(--primary)' stopOpacity={0.2} />
            <stop offset='100%' stopColor='var(--primary)' stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area dataKey='value' fill='url(#fill-gradient)' stroke='none' type='monotone' />

        <YAxis domain={['auto', 'auto']} stroke='var(--secondary)' />
        <XAxis dataKey='formatTime' stroke='var(--secondary)' />

        <Tooltip
          content={props => (
            <>
              <ChartTooltip
                label={props.label}
                points={props.payload
                  .filter((_, index) => index > 0)
                  .map(el => ({
                    color: el.color,
                    label: el.dataKey === 'value' ? 'Current value' : 'Previous value',
                    value: el.payload[el.dataKey]
                  }))}
              />
            </>
          )}
        />

        <Line type='monotone' dot={false} dataKey='value' stroke='var(--primary)' strokeWidth={2} fillOpacity={1} />

        <Line
          type='monotone'
          dot={false}
          dataKey='prevValue'
          stroke='var(--secondary)'
          strokeDasharray='2 2'
          strokeWidth={2}
          fillOpacity={1}
        />

        {nestedKeys?.map(key => (
          <Line
            key={key}
            type='monotone'
            dot={false}
            dataKey={`nested.${key}.value`}
            stroke='var(--danger)'
            strokeWidth={2}
            fillOpacity={1}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
