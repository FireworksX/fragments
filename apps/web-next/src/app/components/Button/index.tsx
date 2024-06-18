import cn from 'classnames'
import styles from './styles.module.css'
import Touchable, { TouchableProps } from '@/app/components/Touchable'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { Spinner } from '@/app/components/Spinner/Spinner'

export interface ButtonProps extends TouchableProps, PropsWithChildren {
  size?: 'small' | 'regular' | 'medium' | 'large' | 'xlarge'
  mode?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-secondary' | 'outline' | 'danger' | 'success'
  stretched?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: ReactNode
  suffix?: ReactNode
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
  ...touchProps
}) => {
  return (
    <Touchable
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
          <Spinner size={16} />
        </div>
      )}
      <div className={styles.body}>
        {children}
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
    </Touchable>
  )
}

export default Button
