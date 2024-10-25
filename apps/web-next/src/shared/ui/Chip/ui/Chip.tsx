import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'
import RemoveIcon from '@/shared/icons/next/close-circle.svg'

interface ChipProps extends PropsWithChildren, TouchableProps {
  className?: string
  prefix?: string
  onRemove?(): void
}

export const Chip: FC<ChipProps> = ({ className, children, prefix, onRemove, ...touchableProps }) => {
  return (
    <Touchable className={cn(styles.root, className)} {...touchableProps}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      {children}
      {onRemove && (
        <Touchable className={styles.remove} preventDefault TagName='span' onClick={onRemove}>
          <RemoveIcon width={14} height={14} />
        </Touchable>
      )}
    </Touchable>
  )
}
