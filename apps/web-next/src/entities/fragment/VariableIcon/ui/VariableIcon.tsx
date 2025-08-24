import { ElementType, FC, ReactNode } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import EventIcon from '@/shared/icons/next/zap.svg'
import NumberIcon from '@/shared/icons/next/hash.svg'
import StringIcon from '@/shared/icons/next/type.svg'
import ToggleIcon from '@/shared/icons/next/toggle-left.svg'
import ObjectIcon from '@/shared/icons/next/braces.svg'
import ColorIcon from '@/shared/icons/next/color.svg'
import ArrayIcon from '@/shared/icons/next/brackets.svg'
import ImageIcon from '@/shared/icons/next/image.svg'

interface VariableIconProps {
  type: keyof typeof definition.variableType
}

export const VariableIcon: FC<VariableIconProps> = ({ type, ...rest }) => {
  return (
    (
      {
        [definition.variableType.Event]: <EventIcon {...rest} />,
        [definition.variableType.Number]: <NumberIcon {...rest} />,
        [definition.variableType.String]: <StringIcon {...rest} />,
        [definition.variableType.Boolean]: <ToggleIcon {...rest} />,
        [definition.variableType.Object]: <ObjectIcon {...rest} />,
        [definition.variableType.Color]: <ColorIcon {...rest} />,
        [definition.variableType.Array]: <ArrayIcon {...rest} />,
        [definition.variableType.Image]: <ImageIcon {...rest} />
      } as Record<keyof typeof definition.variableType, ReactNode>
    )[type] ?? <ObjectIcon {...rest} />
  )
}
