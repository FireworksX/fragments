'use client'

import React from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface TouchableProps {
  className?: string
  TagName?: 'div' | 'a' | 'button' | 'span'
  effect?: 'scale' | 'none'
  disabled?: boolean
  preventDefault?: boolean
  onClick?: (e?: any) => any
  [key: string]: any
}

const Touchable: React.FC<TouchableProps> = ({
  className,
  TagName = 'div',
  disabled,
  children,
  effect = 'scale',
  preventDefault,
  onClick,
  ...rest
}) => {
  const proxyOnClick = e => {
    if (onClick) {
      if (preventDefault) {
        e.preventDefault()
        e.stopPropagation()
      }

      onClick(e)
    }
  }

  return (
    <TagName
      className={cn(styles.root, className, {
        [styles.withEffect]: effect !== 'none',
        [styles.asButton]: TagName === 'button'
      })}
      onClick={!disabled ? proxyOnClick : () => undefined}
      disabled={disabled}
      {...rest}
    >
      {children}
    </TagName>
  )
}

export default Touchable
