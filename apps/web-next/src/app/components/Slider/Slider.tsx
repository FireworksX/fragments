import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface SliderProps<T = number> {
  value: T
  className?: string
  step?: number
  min?: number
  max?: number
  onChange?: (value: this['value']) => void
}

const Slider: FC<SliderProps> = ({ className, value, step = 1, min = 0, max = 100, onChange }) => {
  return (
    <input
      type='range'
      value={value}
      className={cn(styles.root, className)}
      style={{
        '--progress': `${(value / max) * 100}%`
      }}
      step={step}
      max={max}
      min={min}
      onChange={e => onChange && onChange(+e.target.value)}
    />
  )
}

export default Slider
