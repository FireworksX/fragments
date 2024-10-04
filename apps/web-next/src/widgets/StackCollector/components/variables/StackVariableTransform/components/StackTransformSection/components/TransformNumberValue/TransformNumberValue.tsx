import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue } from '@react-spring/web'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import { animatableValue } from '@/builder/utils/animatableValue'

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
