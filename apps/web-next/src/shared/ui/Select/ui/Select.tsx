'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretDown from '@/app/svg/caret-down.svg'
import { animated } from '@react-spring/web'

interface SelectProps extends PropsWithChildren {
  className?: string
  value: string
  onChange(value: string): void
}

const Select: FC<SelectProps> = animated(({ className, children, value, onChange }) => {
  return (
    <div className={cn(styles.root, className)}>
      <CaretDown className={styles.caret} width={11} />
      <select
        className={styles.inner}
        value={value}
        onChange={e => {
          onChange(e.target.value)
        }}
      >
        {children}
      </select>
    </div>
  )
})

export default Select
