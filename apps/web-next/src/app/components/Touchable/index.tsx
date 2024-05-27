'use client'

import React from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface TouchableProps {
  className?: string
  TagName?: 'div' | 'a' | 'button' | 'span'
  effect?: 'scale' | 'none'
  disabled?: boolean
  onClick?: (e?: any) => any
  [key: string]: any
}

const Touchable: React.FC<TouchableProps> = ({
  className,
  TagName = 'div',
  disabled,
  children,
  effect = 'scale',
  onClick,
  ...rest
}) => {
  const proxyOnClick = e => {
    if (onClick) {
      e.preventDefault()
      e.stopPropagation()
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
      {...rest}
    >
      {children}
    </TagName>
  )
}

export default Touchable
