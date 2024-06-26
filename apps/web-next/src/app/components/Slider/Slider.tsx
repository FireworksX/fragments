import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated } from '@react-spring/web'

interface SliderProps<T = number> {
  value: T | SpringValue<T>
  className?: string
  step?: number
  min?: number
  max?: number
  onChange?: (value: this['value']) => void
}

const Slider: FC<SliderProps> = animated(({ className, value, step = 1, min = 0, max = 100, onChange }) => {
  const getProgress = (value: number) => `${(value / max) * 100}%`

  return (
    <input
      type='range'
      value={value}
      className={cn(styles.root, className)}
      style={{
        '--progress': value instanceof SpringValue ? value.to(getProgress) : getProgress(value)
      }}
      step={step}
      max={max}
      min={min}
      onChange={e => onChange && onChange(+e.target.value)}
    />
  )
})

export default Slider
