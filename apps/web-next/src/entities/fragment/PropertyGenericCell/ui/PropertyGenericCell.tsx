import { ElementType, FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import HashtagIcon from '@/shared/icons/hashtag.svg'
import TextFrameIcon from '@/shared/icons/text-frame.svg'
import ToggleIcon from '@/shared/icons/toggle.svg'
import { Cell } from '@/shared/ui/Cell'
import { TouchableProps } from '@/shared/ui/Touchable'
import { propertyType } from '@fragments/plugin-state'

interface PropertyBooleanCellProps extends PropsWithChildren, TouchableProps {
  type: keyof typeof propertyType
  className?: string
}

export const PropertyGenericCell: FC<PropertyBooleanCellProps> = ({ children, className, type, ...touchableProps }) => {
  const Icon = (
    {
      Number: HashtagIcon,
      String: TextFrameIcon,
      Boolean: ToggleIcon
    } as Record<keyof typeof propertyType, ElementType>
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
