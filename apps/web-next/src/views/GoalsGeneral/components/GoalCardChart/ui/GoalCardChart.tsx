import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartTooltip } from '../../../../../shared/ui/charts/ChartTooltip'
import { SplineChartPoint } from '@/shared/types'

export interface GoalCardChartProps {
  className?: string
  min?: number
  max?: number
  points: SplineChartPoint[]
}

export const GoalCardChart: FC<GoalCardChartProps> = ({ className, points, min, max }) => {
  if (!points) return null

  return (
    <ResponsiveContainer className={className} width='100%' height={150}>
      <LineChart data={points}>
        {[min, max].map((value, index) => (
          <ReferenceLine
            key={index === 0 ? 'MIN' : 'MAX'}
            y={value}
            stroke='orange'
            strokeDasharray='4 4'
            label={{ value: index === 0 ? 'MIN' : 'MAX', position: 'insideTopLeft', fill: 'orange' }}
          />
        ))}

        <CartesianGrid strokeDasharray='0' stroke='rgba(var(--secondary--rgb), .3)' />
        <YAxis domain={['auto', 'auto']} stroke='var(--secondary)' />
        <XAxis dataKey='formatTime' stroke='var(--secondary)' />
        <Tooltip
          content={props => (
            <>
              <ChartTooltip
                label={props.label}
                points={props.payload.map(el => ({
                  color: el.color,
                  label: el.dataKey === 'value' ? 'Current value' : 'Previous value',
                  value: el.payload[el.dataKey]
                }))}
              />
            </>
          )}
        />

        <Line type='monotone' dot={false} dataKey='value' strokeWidth={2} stroke='var(--primary)' fillOpacity={1} />
        <Line
          type='monotone'
          dot={false}
          dataKey='prevValue'
          stroke='var(--secondary)'
          strokeDasharray='2 2'
          strokeWidth={2}
          fillOpacity={1}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
