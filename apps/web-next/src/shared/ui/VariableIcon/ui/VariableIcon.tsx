import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import HashTagFillIcon from '@/shared/icons/fills/hashtag-fill.svg'
import ToggleFillIcon from '@/shared/icons/fills/toggle-fill.svg'
import BarHorizontalIcon from '@/shared/icons/bar-horizontal.svg'
import TextFrameFillIcon from '@/shared/icons/fills/text-frame-fill.svg'
import ColorFillIcon from '@/shared/icons/fills/color-fill.svg'
import ActionIcon from '@/shared/icons/fills/action-fill.svg'
import GoalIcon from '@/shared/icons/fills/goal-fill.svg'

interface VariableIconProps {
  type: keyof typeof definition.variableType
  mode: keyof typeof definition.eventMode
}

export const VariableIcon: FC<VariableIconProps> = ({ type, mode }) => {
  return {
    [definition.variableType.Number]: <HashTagFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [definition.variableType.Boolean]: <ToggleFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [definition.variableType.Object]: <BarHorizontalIcon width={18} height={18} />,
    [definition.variableType.String]: <TextFrameFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [definition.variableType.Color]: <ColorFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [definition.variableType.Event]:
      mode === definition.eventMode.goal ? (
        <GoalIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
      ) : (
        <ActionIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
      )
  }[type]
}
