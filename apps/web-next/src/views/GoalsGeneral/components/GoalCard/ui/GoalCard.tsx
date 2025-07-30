import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface GoalCardProps {
  id: number
  name: string
  code: string
  className?: string
  onEdit?: (options: { name?: string; code?: string }) => void
  onRemove?: () => void
}

const data = [
  { time: '10:00', value: 80 },
  { time: '11:00', value: 90 },
  { time: '12:00', value: 110 },
  { time: '13:00', value: 100 },
  { time: '14:00', value: 70 },
  { time: '15:00', value: 95 }
]

const MIN = 75
const MAX = 105

const computeOffset = val => {
  // нормируем value в [0..1] внутри [MIN, MAX]
  return (val - MIN) / (MAX - MIN)
}

// Находим оффсет порога (например для MIN и MAX)
const minOffset = 0
const maxOffset = 1

export const GoalCard: FC<GoalCardProps> = ({ className, id, name, code, onEdit, onRemove }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <div className={styles.infoBody}>
          <div className={styles.title}>
            {id}.
            <ContentEditable className={styles.editable} value={name} onSubmit={name => onEdit?.({ name })} />
          </div>

          <div className={styles.goalCode}>
            Code: <ContentEditable className={styles.editable} value={code} onSubmit={code => onEdit?.({ code })} />
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
        </div>
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='colorByValue' x1='0' y1='0' x2='0' y2='1'>
              {/* Зона за пределом MAX */}
              <stop offset={`${computeOffset(MAX)}%`} stopColor='green' stopOpacity={0.2} />
              <stop offset={`${computeOffset(MAX)}%`} stopColor='red' stopOpacity={0.5} />
              {/* Середина диапазона */}
              <stop offset={`${computeOffset(MIN)}%`} stopColor='green' stopOpacity={0.5} />
              <stop offset={`${computeOffset(MIN)}%`} stopColor='red' stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />

          <Area type='monotone' dataKey='value' stroke='#8884d8' fill='url(#colorByValue)' />
        </AreaChart>
      </ResponsiveContainer>

      <div className={styles.actions}>
        <Button mode='tertiary' icon={<RemoveIcon />} onClick={() => onRemove()} />
      </div>
    </div>
  )
}
