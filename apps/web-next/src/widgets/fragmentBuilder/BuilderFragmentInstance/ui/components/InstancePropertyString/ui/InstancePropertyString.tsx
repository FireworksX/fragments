import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputText } from '@/shared/ui/InputText'
import { Textarea } from '@/shared/ui/Textarea'

interface InstancePropertyStringProps {
  name: string
  value: string
  isTextarea?: boolean
  className?: string
  onChange(value: string): void
}

const InstancePropertyString: FC<InstancePropertyStringProps> = ({ className, isTextarea, name, value, onChange }) => {
  return (
    <ControlRow className={className} title={name}>
      <ControlRowWide>
        {isTextarea ? (
          <Textarea value={value ?? ''} onChangeValue={onChange} />
        ) : (
          <InputText value={value ?? ''} onChangeValue={onChange} />
        )}
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyString)
