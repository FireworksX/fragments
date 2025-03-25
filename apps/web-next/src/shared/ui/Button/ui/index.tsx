import cn from 'classnames'
import styles from './styles.module.css'
import { ElementRef, FC, PropsWithChildren, ReactNode, RefObject } from 'react'
import { TouchableProps } from '@/shared/ui/Touchable/ui'
import { Touchable } from '@/shared/ui/Touchable'
import { Spinner } from '@/shared/ui/Spinner'

export interface ButtonProps extends TouchableProps, PropsWithChildren {
  size?: 'small' | 'regular' | 'medium' | 'large' | 'xlarge'
  mode?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-secondary'
    | 'outline'
    | 'danger'
    | 'success'
    | 'warning'
    | 'danger-outline'
    | 'success-outline'
    | 'warning-outline'
  stretched?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: ReactNode
  suffix?: ReactNode
  ref?: RefObject<ElementRef<'button'>>
}

const Button: FC<ButtonProps> = ({
  className,
  size = 'medium',
  mode = 'primary',
  disabled,
  stretched,
  loading,
  children,
  suffix,
  icon,
  ref,
  ...touchProps
}) => {
  const spinnerColorByMode = {
    'warning-outline': 'var(--warning)',
    'success-outline': 'var(--success)'
  }[mode]

  return (
    <Touchable
      ref={ref}
      disabled={disabled}
      className={cn(styles.root, className, styles[mode], styles[size], {
        [styles.stretched]: stretched,
        [styles.loading]: loading
      })}
      TagName='button'
      {...touchProps}
    >
      {loading && (
        <div className={styles.loadingState}>
          <Spinner size={16} color={spinnerColorByMode} />
        </div>
      )}
      <div className={styles.body}>
        {icon}
        {children}
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
    </Touchable>
  )
}

export default Button
