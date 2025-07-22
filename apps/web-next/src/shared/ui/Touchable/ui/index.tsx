'use client'

import React, { ElementRef, RefObject } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface TouchableProps {
  className?: string
  TagName?: 'div' | 'a' | 'button' | 'span'
  effect?: 'scale' | 'none'
  disabled?: boolean
  preventDefault?: boolean
  onClick?: (e?: any) => any
  isCapture?: boolean
  ref?: RefObject<ElementRef<'button'> | ElementRef<'div'>>
  [key: string]: any
}

const Touchable: React.FC<TouchableProps> = ({
  className,
  TagName = 'div',
  type = 'button',
  disabled,
  children,
  effect = 'scale',
  preventDefault,
  isCapture,
  ref,
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

  if (isCapture) {
    rest.onClickCapture = !disabled ? proxyOnClick : () => undefined
  } else {
    rest.onClick = !disabled ? proxyOnClick : () => undefined
  }

  return (
    <TagName
      ref={ref}
      className={cn(styles.root, className, {
        [styles.withEffect]: effect !== 'none',
        [styles.asButton]: TagName === 'button'
      })}
      type={TagName === 'button' ? type : null}
      disabled={disabled}
      {...rest}
    >
      {children}
    </TagName>
  )
}

export default Touchable
