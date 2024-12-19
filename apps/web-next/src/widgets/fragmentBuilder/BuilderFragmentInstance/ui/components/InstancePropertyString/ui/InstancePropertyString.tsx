import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputText } from '@/shared/ui/InputText'

interface InstancePropertyStringProps {
  name: string
  value: string
  className?: string
  onChange(value: string): void
}

const InstancePropertyString: FC<InstancePropertyStringProps> = ({ className, name, value, onChange }) => {
  return (
    <ControlRow className={className} title={name}>
      <ControlRowWide>
        <InputText value={value ?? ''} onChangeValue={onChange} />
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyString)
