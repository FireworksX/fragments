import { FC } from 'react'
import { useStore } from '@nanostores/react'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Select from '@/app/components/Select/Select'

export interface StackLoopEffectOptions {
  value?: LoopEffectType
  onChange: (border: LoopEffectType) => void
}

interface StackLoopEffectProps {
  className?: string
}

const StackLoopEffect: FC<StackLoopEffectProps> = ({ className }) => {
  const selfContext = {} //useStore($getContextPopout('loopEffect'))

  if (!selfContext || !selfContext.value) {
    return null
  }

  const onChangeValue = (nextValue: Partial<StackLoopEffectOptions['value']>) => {
    const newValue = { ...selfContext.value, ...nextValue }
    // $updateContextPopout('loopEffect', { value: newValue })
    selfContext.onChange(newValue)
  }

  return (
    <Panel className={className}>
      <ControlRow title='Delay'>
        <InputNumber
          value={selfContext.value.delay}
          max={10}
          suffix='s'
          onChange={value => onChangeValue({ delay: value })}
        />
        <Stepper value={selfContext.value.delay} max={10} onChange={value => onChangeValue({ delay: value })} />
      </ControlRow>
      <ControlRow title='Duration'>
        <InputNumber
          value={selfContext.value.duration}
          step={0.1}
          max={10}
          suffix='s'
          onChange={value => onChangeValue({ duration: value })}
        />
        <Stepper
          value={selfContext.value.duration}
          step={0.1}
          max={10}
          onChange={value => onChangeValue({ duration: value })}
        />
      </ControlRow>
      <ControlRow title='Animation'>
        <ControlRowWide>
          <Select value={selfContext.value.name} onChange={value => onChangeValue({ name: value })}>
            {Object.keys({}).map(animation => (
              <option key={animation} value={animation}>
                {animation}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default StackLoopEffect
