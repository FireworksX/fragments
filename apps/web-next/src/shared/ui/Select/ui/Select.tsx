'use client'
import { ComponentProps, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import CaretDown from '@/shared/icons/caret-down.svg'

interface SelectProps extends PropsWithChildren, ComponentProps<'select'> {
  className?: string
}

const Select: FC<SelectProps> = animated(({ className, children, value, onChange, ...rest }) => {
  return (
    <div className={cn(styles.root, className)}>
      <CaretDown className={styles.caret} width={11} />
      <select
        className={styles.inner}
        value={value}
        onChange={e => {
          onChange?.(e.target.value)
        }}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
})

export default Select
