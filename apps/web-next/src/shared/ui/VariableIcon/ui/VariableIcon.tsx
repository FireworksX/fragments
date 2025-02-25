import { FC } from 'react'
import { variableType } from '@fragments/plugin-fragment-spring'
import HashTagFillIcon from '@/shared/icons/fills/hashtag-fill.svg'
import ToggleFillIcon from '@/shared/icons/fills/toggle-fill.svg'
import BarHorizontalIcon from '@/shared/icons/bar-horizontal.svg'
import TextFrameFillIcon from '@/shared/icons/fills/text-frame-fill.svg'
import ColorFillIcon from '@/shared/icons/fills/color-fill.svg'

interface VariableIconProps {
  type: keyof typeof variableType
}

export const VariableIcon: FC<VariableIconProps> = ({ type }) => {
  return {
    [variableType.Number]: <HashTagFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [variableType.Boolean]: <ToggleFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [variableType.Object]: <BarHorizontalIcon width={18} height={18} />,
    [variableType.String]: <TextFrameFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [variableType.Color]: <ColorFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
  }[type]
}
