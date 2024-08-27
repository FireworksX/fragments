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

interface TransformConvertFromBooleanValueProps {
  truthy: SpringValue<unknown>
  falsy: SpringValue<unknown>
  outputType: keyof typeof builderVariableType
  className?: string
}

const NumberValue = ({ value }) => (
  <>
    <InputNumber value={value} onChange={next => value.set(next)} />
    <Stepper value={value} onChange={next => value.set(next)} />
  </>
)

export const TransformConvertFromBooleanValue: FC<TransformConvertFromBooleanValueProps> = ({
  className,
  outputType,
  truthy,
  falsy
}) => {
  const Children = {
    [builderVariableType.Number]: NumberValue
  }[outputType]

  return (
    <>
      <ControlRow title='Yes'>
        <Children value={truthy} />
      </ControlRow>
      <ControlRow title='No'>
        <Children value={falsy} />
      </ControlRow>
    </>
  )
}
