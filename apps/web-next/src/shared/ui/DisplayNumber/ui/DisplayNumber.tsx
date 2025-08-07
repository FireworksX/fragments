import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface DisplayNumberProps {
  className?: string
  children?: string | number
  styled?: boolean
  format?: Intl.NumberFormatOptions
}

export const DisplayNumber: FC<DisplayNumberProps> = ({ className, styled, children, format }) => {
  const value = (typeof children === 'string' ? (!isNaN(+children) ? +children : 0) : children) ?? 0

  return (
    <span
      className={cn(styles.root, className, {
        [styles.styled]: styled
      })}
    >
      {value.toLocaleString('en-US', format)}
    </span>
  )
}
