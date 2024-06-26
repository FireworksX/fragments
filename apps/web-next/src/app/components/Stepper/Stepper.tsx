import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Plus from '@/app/svg/plus.svg'
import Minus from '@/app/svg/minus.svg'
import { animated } from '@react-spring/web'

interface StepperProps {
  className?: string
  step?: number
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
}

const Stepper: FC<StepperProps> = animated(({ className, value, step = 1, min = 0, max = 100, onChange }) => {
  if (typeof value !== 'number') {
    return null
  }

  const incNextValue = +(value + step > max ? max : value + step).toFixed(1)
  const decNextValue = +(value - step < min ? min : value - step).toFixed(1)

  return (
    <div className={cn(styles.root, className)}>
      <Touchable className={styles.step} TagName='button' onClick={() => onChange(incNextValue)}>
        <Plus name='plus' width={15} height={15} />
      </Touchable>
      <Touchable className={styles.step} TagName='button' onClick={() => onChange(decNextValue)}>
        <Minus width={15} height={15} />
      </Touchable>
    </div>
  )
})

export default Stepper
