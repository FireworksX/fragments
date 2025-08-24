import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputText } from '@/shared/ui/InputText'
import { Textarea } from '@/shared/ui/Textarea'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { VariableIcon } from '@/entities/fragment/VariableIcon'

interface InstancePropertyObjectProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value: string
  fields: unknown
  className?: string
  onOpenObject: () => void
  onChange(value: string): void
}

export const InstancePropertyObject: FC<InstancePropertyObjectProps> = ({
  className,
  name,
  value,
  fields = {},
  onChange,
  onOpenObject,
  ...controlRowProps
}) => {
  const cleanFields = Object.keys(fields).filter(key => key !== '_id' && key !== '_type')

  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <InputSelect
          icon={<VariableIcon type='Object' color='var(--light)' />}
          color='var(--primary)'
          onClick={onOpenObject}
        >
          {cleanFields.join(', ')}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}
