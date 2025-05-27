import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'
import ActionIcon from '@/shared/icons/next/zap.svg'
import GoalIcon from '@/shared/icons/next/circle-dot.svg'

interface InstancePropertyEventProps {
  name: string
  value: { name?: string }
  mode?: keyof typeof definition.eventMode
  className?: string
  onChange(value: string): void
}

const InstancePropertyEvent: FC<InstancePropertyEventProps> = ({ className, name, mode, value, onChange }) => {
  return (
    <ControlRow className={className} title={name}>
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
            popoutsStore.open(popoutNames.stackGoals, {
              initial: true,
              context: {
                activeGoalCode: value?.code,
                onSelect: goal => {
                  onChange(goal)
                  popoutsStore.updateCurrentContext({ activeGoalCode: goal.code })
                }
              }
            })
          }}
        >
          {value.name}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}

export default InstancePropertyEvent
