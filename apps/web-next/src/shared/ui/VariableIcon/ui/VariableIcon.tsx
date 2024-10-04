import HashTagFillIcon from '@/shared/icons/fills/hashtag-fill.svg'
import ToggleFillIcon from '@/shared/icons/fills/toggle-fill.svg'
import BarHorizontalIcon from '@/shared/icons/bar-horizontal.svg'
import TextFrameFillIcon from '@/shared/icons/fills/text-frame-fill.svg'
import { builderVariableType } from '@fragments/fragments-plugin'
import { FC } from 'react'

interface VariableIconProps {
  type: keyof typeof builderVariableType
}

export const VariableIcon: FC<VariableIconProps> = ({ type }) => {
  return {
    [builderVariableType.Number]: <HashTagFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [builderVariableType.Boolean]: <ToggleFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [builderVariableType.Object]: <BarHorizontalIcon width={18} height={18} />,
    [builderVariableType.String]: <TextFrameFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
  }[type]
}
