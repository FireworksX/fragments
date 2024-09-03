import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { builderVariableType } from '@fragments/fragments-plugin'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { InputSelectVariable } from '@/app/components/InputSelectVariable/InputSelectVariable'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import { SpringValue } from '@react-spring/web'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import TabsSelector from '@/app/components/TabsSelector'
import { tabsSelectorItemsBoolean } from '@/builder/data'

interface TransformConvertFromBooleanValueProps {
  truthy: SpringValue<unknown> | unknown
  falsy: SpringValue<unknown> | unknown
  setTruthy(next: unknown): void
  setFalsy(next: unknown): void
  outputType: keyof typeof builderVariableType
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
      <TabsSelector items={tabsSelectorItemsBoolean} value={value} onChange={({ name }) => onChange(name)} />
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
      [builderVariableType.Number]: NumberValue,
      [builderVariableType.Boolean]: BooleanValue
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
