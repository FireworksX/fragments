import { ElementType, FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import NumberIcon from '@/shared/icons/next/hash.svg'
import StringIcon from '@/shared/icons/next/type.svg'
import ToggleIcon from '@/shared/icons/next/toggle-left.svg'
import { Cell } from '@/shared/ui/Cell'
import { TouchableProps } from '@/shared/ui/Touchable'
import { variableType } from '@fragments/plugin-state'

interface PropertyBooleanCellProps extends PropsWithChildren, TouchableProps {
  type: keyof typeof variableType
  className?: string
}

export const PropertyGenericCell: FC<PropertyBooleanCellProps> = ({ children, className, type, ...touchableProps }) => {
  const Icon = (
    {
      Number: NumberIcon,
      String: StringIcon,
      Boolean: ToggleIcon
    } as Record<keyof typeof variableType, ElementType>
  )[type]

  return (
    <Cell
      className={cn(styles.root, className)}
      before={
        <div className={styles.icon}>
          <Icon />
        </div>
      }
      {...touchableProps}
    >
      <div className={styles.body}>{children}</div>
    </Cell>
  )
}
