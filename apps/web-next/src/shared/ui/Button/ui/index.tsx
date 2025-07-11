'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import {
  ComponentProps,
  ComponentRef,
  ElementRef,
  FC,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useRef,
  useState
} from 'react'
import { TouchableProps } from '@/shared/ui/Touchable/ui'
import { Touchable } from '@/shared/ui/Touchable'
import { Spinner } from '@/shared/ui/Spinner'

export interface ButtonProps extends TouchableProps, PropsWithChildren, ComponentProps<'button'> {
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
  glowing?: boolean
  className?: string
  icon?: ReactNode
  suffix?: ReactNode
  cancelable?: boolean
  cancelDuration?: number
  ref?: RefObject<ComponentRef<'button'>>
}

const Button: FC<ButtonProps> = ({
  className,
  size = 'medium',
  mode = 'primary',
  disabled,
  stretched,
  loading,
  glowing,
  children,
  suffix,
  icon,
  cancelable,
  cancelDuration = 3000,
  ref,
  onClick,
  ...touchProps
}) => {
  const spinnerColorByMode = {
    'warning-outline': 'var(--warning)',
    'danger-outline': 'var(--danger)',
    'success-outline': 'var(--success)'
  }[mode]

  const cancelableTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const [isCancelable, setIsCancelable] = useState(false)

  const proxyOnClick = (e: unknown) => {
    if (onClick) {
      if (cancelable) {
        if (cancelableTimer.current) {
          setIsCancelable(false)
          clearTimeout(cancelableTimer.current)
          cancelableTimer.current = null
        } else {
          setIsCancelable(true)
          cancelableTimer.current = setTimeout(() => {
            setIsCancelable(false)
            cancelableTimer.current = null
            onClick(e)
          }, cancelDuration)
        }
      } else {
        onClick(e)
      }
    }
  }

  return (
    <Touchable
      ref={ref}
      disabled={disabled}
      className={cn(styles.root, className, styles[mode], styles[size], {
        [styles.stretched]: stretched,
        [styles.loading]: loading,
        [styles.glowing]: glowing,
        [styles.cancelable]: isCancelable
      })}
      TagName='button'
      onClick={proxyOnClick}
      {...touchProps}
    >
      {isCancelable && (
        <div
          className={styles.cancelBody}
          style={{
            animationDuration: `${cancelDuration}ms`
          }}
        >
          Cancel
        </div>
      )}
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
