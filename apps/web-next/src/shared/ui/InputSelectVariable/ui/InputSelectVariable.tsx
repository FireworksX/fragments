import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import Close from '@/shared/icons/close.svg'
import FilterFillIcon from '@/shared/icons/fills/filter-fill.svg'
import { Touchable } from '@/shared/ui/Touchable'
import { VariableIcon } from '@/shared/ui/VariableIcon'
import { definition } from '@fragmentsx/definition'

interface InputSelectVariableProps extends PropsWithChildren {
  type: keyof typeof definition.variableType
  mode?: keyof typeof definition.eventMode
  kind: 'variable' | 'computed'
  className?: string
  bodyClassName?: string
  onReset?: () => void
  onClick?: () => void
}

export const InputSelectVariable: FC<InputSelectVariableProps> = ({
  kind = 'variable',
  type,
  mode,
  className,
  bodyClassName,
  children,
  onClick,
  onReset
}) => {
  const Icon =
    kind === 'variable' ? (
      <VariableIcon type={type} mode={mode} />
    ) : (
      <FilterFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
    )

  return (
    <Touchable
      className={cn(styles.root, className)}
      title={typeof children === 'string' && children}
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconTarget}>{Icon}</div>
      </div>

      <animated.div className={cn(styles.body, bodyClassName)}>
        {kind === 'variable' ? children : 'Transform'}
      </animated.div>

      {(children || kind === 'computed') && onReset && (
        <Touchable className={styles.reset} isCapture onClick={onReset}>
          <Close width={11} height={11} />
        </Touchable>
      )}
    </Touchable>
  )
}
