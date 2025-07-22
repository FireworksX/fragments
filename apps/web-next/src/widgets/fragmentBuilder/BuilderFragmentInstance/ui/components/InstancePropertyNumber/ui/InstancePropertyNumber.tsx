import { FC } from 'react'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { animated } from '@react-spring/web'
import { Stepper } from '@/shared/ui/Stepper'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'

interface BuilderImageProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  step?: number
  min?: number
  max?: number
  value: number
  displayStepper: boolean
  className?: string
  onChange(value: number): void
}

const InstancePropertyNumber: FC<BuilderImageProps> = ({
  className,
  displayStepper,
  name,
  min,
  max,
  step,
  value,
  onChange,
  ...controlRowProps
}) => {
  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <InputNumber step={step} min={min} max={max} value={value} onChange={onChange} />
      {displayStepper ? (
        <Stepper step={step} min={min} max={max} value={value} onChange={onChange} />
      ) : (
        <Slider step={step} min={min} max={max} value={value} onChange={onChange} />
      )}
    </ControlRow>
  )
}

export default animated(InstancePropertyNumber)
