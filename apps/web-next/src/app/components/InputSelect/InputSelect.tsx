import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Checkerboard from '@/app/svg/checkerboard.svg'
import Close from '@/app/svg/close.svg'

export interface InputSelectProps extends PropsWithChildren {
  icon?: ReactNode
  color?: string
  placeholder?: string
  className?: string
  bodyClassName?: string
  hasIcon?: boolean
  onReset?: () => void
  onClick?: () => void
}

const InputSelect: FC<InputSelectProps> = ({
  className,
  bodyClassName,
  children,
  placeholder = 'Add...',
  icon,
  hasIcon = true,
  color,
  onReset,
  onClick
}) => {
  return (
    <Touchable
      className={cn(styles.root, className)}
      title={typeof children === 'string' && children}
      onClick={onClick}
    >
      {hasIcon && (
        <div className={styles.iconWrapper}>
          {icon ? (
            <div className={styles.iconTarget}>{icon}</div>
          ) : (
            <div className={styles.iconPlaceholder}>
              <Checkerboard width={20} height={20} />
            </div>
          )}

          <div className={styles.iconValue} style={{ backgroundColor: color }} />
        </div>
      )}

      <div className={cn(styles.body, bodyClassName)}>
        {children ?? <span className={styles.placeholder}>{placeholder}</span>}
      </div>

      {children && onReset && (
        <Touchable className={styles.reset} onClick={onReset}>
          <Close width={11} height={11} />
        </Touchable>
      )}
    </Touchable>
  )
}

export default InputSelect
