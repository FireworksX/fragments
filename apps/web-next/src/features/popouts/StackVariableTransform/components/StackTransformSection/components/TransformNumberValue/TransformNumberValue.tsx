import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { Stepper } from '@/shared/ui/Stepper'

interface TransformNumberValueProps {
  value: SpringValue<number> | number
  className?: string
  min?: number
  max?: number
  step?: number
  withSlider?: boolean
  onChange(next: number): void
}

export const TransformNumberValue: FC<TransformNumberValueProps> = ({
  className,
  value,
  min,
  max,
  step,
  withSlider,
  onChange
}) => {
  const totalProps = {
    value: animatableValue(value),
    step,
    min,
    max,
    onChange
  }

  return (
    <ControlRow title='Value'>
      <InputNumber {...totalProps} />
      {withSlider ? <Slider {...totalProps} /> : <Stepper {...totalProps} />}
    </ControlRow>
  )
}
