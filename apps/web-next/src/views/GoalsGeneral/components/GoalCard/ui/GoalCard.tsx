import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface GoalCardProps {
  id: number
  name: string
  code: string
  min?: number | null
  max?: number | null
  className?: string
  onEdit?: () => void
  onRemove?: () => void
}

const data = [
  { time: '10:00', value: 80, value2: 30 },
  { time: '11:00', value: 90, value2: 41 },
  { time: '12:00', value: 110, value2: 60 },
  { time: '13:00', value: 100, value2: 56 },
  { time: '14:00', value: 70, value2: 33 },
  { time: '15:00', value: 95, value2: 70 }
]

const MIN = 75
const MAX = 105

const computeOffset = val => {
  // нормируем value в [0..1] внутри [MIN, MAX]
  return (val - MIN) / (MAX - MIN)
}

export const GoalCard: FC<GoalCardProps> = ({ className, id, min, max, name, code, onEdit, onRemove }) => {
  // Для градиента надо найти min и max value на графике
  const allValues = data.map(d => d.value)
  const actualMin = Math.min(...allValues)
  const actualMax = Math.max(...allValues)

  // Защита от деления на 0
  const range = actualMax - actualMin || 1

  // Оффсеты как % от общего диапазона (в строке нужен именно формат '65%' и т.п.)
  const minOffset = `${((MAX - actualMin) / range) * 100}%`
  const maxOffset = `${((MIN - actualMin) / range) * 100}%`

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <div className={styles.infoBody}>
          <div className={styles.infoBodyInner}>
            <div className={styles.title}>
              {id}.<div className={styles.editable}>{name}</div>
            </div>

            <div className={styles.goalCode}>
              Code: <div className={styles.editable}>{code}</div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button mode='outline' icon={<EditIcon />} onClick={() => onEdit?.()} />
            <Button mode='danger-outline' icon={<RemoveIcon />} onClick={() => onRemove?.()} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className={cn(styles.rowName, styles.accent)}>Конверсия</div>
            <div className={styles.rowValue}>0,46%</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowName}>Достижения цели</div>
            <div className={styles.rowValue}>45 083</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowName}>Целевые визиты</div>
            <div className={styles.rowValue}>39 167</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowName}>Min/max %</div>
            {!min && !max && (
              <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                Set min/max
              </Button>
            )}
            {!min && !!max && (
              <div className={styles.rowValue}>
                <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                  Set min
                </Button>{' '}
                / {max}
              </div>
            )}
            {min && !max && (
              <div className={styles.rowValue}>
                {min} /{' '}
                <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                  Set max
                </Button>
              </div>
            )}
            {!!min && !!max && (
              <div className={styles.rowValue}>
                {min} / {max}
              </div>
            )}
          </div>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={150}>
        <LineChart data={data}>
          {/* Линия MIN */}
          <ReferenceLine
            y={MIN}
            stroke='orange'
            strokeDasharray='4 4'
            label={{ value: 'MIN', position: 'insideTopLeft', fill: 'orange' }}
          />

          {/* Линия MAX */}
          <ReferenceLine
            y={MAX}
            stroke='orange'
            strokeDasharray='4 4'
            label={{ value: 'MAX', position: 'insideTopLeft', fill: 'orange' }}
          />

          <CartesianGrid strokeDasharray='0' stroke='rgba(var(--secondary--rgb), .3)' />
          <YAxis domain={['auto', 'auto']} stroke='var(--secondary)' />
          <XAxis dataKey='time' stroke='var(--secondary)' />
          <Tooltip />
          <Line type='monotone' dataKey='value' stroke='#8884d8' fill='url(#colorByValue)' fillOpacity={1} />
          <Line type='monotone' dataKey='value2' stroke='#8884d8' fill='url(#colorByValue)' fillOpacity={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
