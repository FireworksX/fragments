import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue } from '@react-spring/web'
import { variableType } from '@fragments/plugin-fragment-spring'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { Stepper } from '@/shared/ui/Stepper'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'

interface TransformConvertFromBooleanValueProps {
  truthy: SpringValue<unknown> | unknown
  falsy: SpringValue<unknown> | unknown
  setTruthy(next: unknown): void
  setFalsy(next: unknown): void
  outputType: keyof typeof variableType
  className?: string
  valueReferenceOptions?: unknown
}

const NumberValue = ({ value, min, max, step, withSlider, onChange }) => {
  const totalProps = {
    value,
    step,
    min,
    max,
    onChange
  }

  return (
    <>
      <InputNumber {...totalProps} />
      {withSlider ? <Slider {...totalProps} /> : <Stepper {...totalProps} />}
    </>
  )
}

const BooleanValue = ({ value, onChange }) => {
  return (
    <ControlRowWide>
      <TabsSelector items={booleanTabsSelectorItems} value={value} onChange={({ name }) => onChange(name)} />
    </ControlRowWide>
  )
}

export const TransformConvertFromBooleanValue: FC<TransformConvertFromBooleanValueProps> = ({
  className,
  outputType,
  truthy,
  falsy,
  setTruthy,
  setFalsy,
  valueReferenceOptions
}) => {
  const Children =
    {
      [variableType.Number]: NumberValue,
      [variableType.Boolean]: BooleanValue
    }[outputType] || (() => null)

  return (
    <>
      <ControlRow title='Yes'>
        <Children {...valueReferenceOptions} value={truthy} onChange={setTruthy} />
      </ControlRow>
      <ControlRow title='No'>
        <Children {...valueReferenceOptions} value={falsy} onChange={setFalsy} />
      </ControlRow>
    </>
  )
}
