import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@adstore/web/src/components/Icon/Icon'
import Touchable from '@/app/components/Touchable'

export interface DropdownOptionProps extends PropsWithChildren {
  description?: string
  className?: string
  disabled?: boolean
  hasNested?: boolean
  onClick?: () => void
}

const DropdownOption: FC<DropdownOptionProps> = ({
  className,
  disabled,
  hasNested,
  children,
  description,
  onClick
}) => {
  return (
    <Touchable
      TagName='button'
      disabled={disabled}
      className={cn(styles.root, className, {
        [styles.disabled]: disabled
      })}
      onClick={onClick}
    >
      {children} <div className={styles.description}>{description}</div>
      {hasNested && <Icon className={styles.arrow} name='caret-right' width={13} height={13} />}
    </Touchable>
  )
}

export default DropdownOption
