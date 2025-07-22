'use client'
import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretRight from '@/shared/icons/caret-right.svg'
import { animated } from '@react-spring/web'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'

export interface DropdownOptionProps extends PropsWithChildren, TouchableProps {
  size?: 'large' | 'medium'
  mode?: 'danger' | 'success' | 'warning'
  direction?: 'row' | 'column'
  icon?: ReactNode
  description?: string
  indicator?: string | number
  className?: string
  gap?: number
  bodyClassName?: string
  disabled?: boolean
  fetching?: boolean
  hasNested?: boolean
  suffix?: ReactNode
  onClick?: () => void
}

const DropdownOption: FC<DropdownOptionProps> = ({
  className,
  bodyClassName,
  size = 'medium',
  direction = 'row',
  icon,
  gap,
  indicator,
  disabled,
  hasNested,
  children,
  fetching,
  description,
  mode,
  suffix,
  ...touchableProps
}) => {
  return (
    <Touchable
      TagName='button'
      disabled={disabled}
      className={cn(styles.root, className, styles[size], styles[mode], styles[direction], {
        [styles.disabled]: disabled
      })}
      style={{ gap }}
      {...touchableProps}
    >
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={cn(styles.body, bodyClassName)}>
        {children} <div className={styles.description}>{indicator}</div>
      </div>
      {description && <div className={styles.bottomDescription}>{description}</div>}

      {(suffix || hasNested || fetching) && (
        <div>
          {fetching && <div></div>}
          {suffix && <div>{suffix}</div>}
          {hasNested && <CaretRight className={styles.arrow} width={13} height={13} />}
        </div>
      )}
    </Touchable>
  )
}

export default DropdownOption
