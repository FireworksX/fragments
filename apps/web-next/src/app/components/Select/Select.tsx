'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@adstore/web/src/components/Icon/Icon'

interface SelectProps extends PropsWithChildren {
  className?: string
  value: string
  onChange(value: string): void
}

const Select: FC<SelectProps> = ({ className, children, value, onChange }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon className={styles.caret} name='caret-down' width={11} />
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
}

export default Select
