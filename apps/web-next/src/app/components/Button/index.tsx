import cn from 'classnames'
import styles from './styles.module.css'
import Touchable, { TouchableProps } from '@/app/components/Touchable'
import { FC, PropsWithChildren, ReactNode } from 'react'

export interface ButtonProps extends TouchableProps, PropsWithChildren {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  mode?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger' | 'success'
  stretched?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: ReactNode
}

const Button: FC<ButtonProps> = ({
  className,
  size = 'medium',
  mode = 'primary',
  disabled,
  stretched,
  children,
  ...touchProps
}) => {
  return (
    <Touchable
      disabled={disabled}
      className={cn(styles.root, className, styles[mode], styles[size], {
        [styles.stretched]: stretched
      })}
      TagName='button'
      {...touchProps}
    >
      {children}
    </Touchable>
  )
}

export default Button
