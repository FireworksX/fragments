import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'
import ActionIcon from '@/shared/icons/next/zap.svg'
import GoalIcon from '@/shared/icons/next/circle-dot.svg'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import { useStack } from '@/shared/hooks/useStack'

interface InstancePropertyEventProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value: { name?: string }
  mode?: keyof typeof definition.eventMode
  className?: string
  onChange(value: string): void
}

const InstancePropertyEvent: FC<InstancePropertyEventProps> = ({
  className,
  name,
  mode,
  value,
  onChange,
  ...controlRowProps
}) => {
  const stack = useStack()
  // if (typeof value?.name !== 'string') return null

  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <InputSelect
          hasIcon
          icon={
            mode === definition.eventMode.callback ? (
              <ActionIcon style={{ color: 'var(--text-color)' }} />
            ) : (
              <GoalIcon style={{ color: 'var(--text-color)' }} />
            )
          }
          color='var(--primary)'
          onClick={() => {
            stack.open(popoutNames.stackGoals, {
              activeGoalCode: value?.code,
              onSelect: goal => {
                onChange(goal)
              }
            })
          }}
        >
          {value?.name}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}

export default InstancePropertyEvent
