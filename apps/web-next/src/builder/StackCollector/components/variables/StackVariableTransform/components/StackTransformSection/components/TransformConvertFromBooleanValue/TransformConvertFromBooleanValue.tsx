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
  truthy: SpringValue<unknown>
  falsy: SpringValue<unknown>
  outputType: keyof typeof builderVariableType
  className?: string
  valueReferenceOptions?: unknown
}

const NumberValue = ({ value, min, max, step, withSlider }) => {
  const totalProps = {
    value,
    step,
    min,
    max,
    onChange: next => value.set(next)
  }

  return (
    <>
      <InputNumber {...totalProps} />
      {withSlider ? <Slider {...totalProps} /> : <Stepper {...totalProps} />}
    </>
  )
}

const BooleanValue = ({ value }) => {
  return (
    <ControlRowWide>
      <TabsSelector items={tabsSelectorItemsBoolean} value={value} onChange={({ name }) => value.set(name)} />
    </ControlRowWide>
  )
}

export const TransformConvertFromBooleanValue: FC<TransformConvertFromBooleanValueProps> = ({
  className,
  outputType,
  truthy,
  falsy,
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
        <Children {...valueReferenceOptions} value={truthy} />
      </ControlRow>
      <ControlRow title='No'>
        <Children {...valueReferenceOptions} value={falsy} />
      </ControlRow>
    </>
  )
}
