import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputText } from '@/shared/ui/InputText'
import { Textarea } from '@/shared/ui/Textarea'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { VariableIcon } from '@/entities/fragment/VariableIcon'

interface InstancePropertyArrayProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value?: unknown[]
  className?: string
  onOpen: () => void
}

export const InstancePropertyArray: FC<InstancePropertyArrayProps> = ({
  className,
  name,
  value,
  onOpen,
  ...controlRowProps
}) => {
  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <InputSelect icon={<VariableIcon type='Array' color='var(--light)' />} color='var(--primary)' onClick={onOpen}>
          {!value?.length ? `Set value` : `Items: ${value.length}`}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}
