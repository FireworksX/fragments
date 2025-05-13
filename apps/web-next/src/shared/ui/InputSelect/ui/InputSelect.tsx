import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Checkerboard from '@/shared/icons/checkerboard.svg'
import Close from '@/shared/icons/close.svg'
import { animated, Interpolation } from '@react-spring/web'
import { objectToColorString, rgbToHex } from '@fragmentsx/utils'
import { Touchable } from '@/shared/ui/Touchable'
import { useInterpolation } from '@/shared/hooks/useInterpolation'

export interface InputSelectProps extends PropsWithChildren {
  icon?: ReactNode
  color?: string | Interpolation<string>
  placeholder?: string
  className?: string
  bodyClassName?: string
  hasIcon?: Interpolation<boolean> | boolean
  forceReset?: boolean
  onReset?: () => void
  onClick?: () => void
}

const InputSelect: FC<InputSelectProps> = animated(
  ({
    className,
    bodyClassName,
    forceReset,
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
        title={typeof children === 'string' ? children : undefined}
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

            <animated.div
              className={styles.iconValue}
              style={{ backgroundColor: useInterpolation([color], objectToColorString) }}
            />
          </div>
        )}

        <animated.div className={cn(styles.body, bodyClassName)}>
          {children ? children : <span className={styles.placeholder}>{placeholder}</span>}
        </animated.div>

        {(children || forceReset) && onReset && (
          <Touchable
            className={styles.reset}
            onClick={e => {
              e.stopPropagation()
              onReset()
            }}
          >
            <Close width={11} height={11} />
          </Touchable>
        )}
      </Touchable>
    )
  }
)

export default InputSelect
