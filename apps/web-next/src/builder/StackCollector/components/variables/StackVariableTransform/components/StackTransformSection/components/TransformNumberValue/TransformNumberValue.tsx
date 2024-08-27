import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue } from '@react-spring/web'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'

interface TransformNumberValueProps {
  value: SpringValue<number>
  className?: string
}

export const TransformNumberValue: FC<TransformNumberValueProps> = ({ className, value }) => (
  <ControlRow title='Value'>
    <InputNumber value={value} step={0.1} onChange={next => value.set(next)} />
    <Stepper value={value} onChange={next => value.set(next)} />
  </ControlRow>
)
