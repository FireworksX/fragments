import { ComponentPropsWithoutRef, FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@/shared/icons/next/circle-dot.svg'

export interface InfoSectionCellProps extends PropsWithChildren, ComponentPropsWithoutRef<'div'> {
  className?: string
}

export const InfoSectionCellEmpty: FC<InfoSectionCellProps> = ({ className, ...HTMLProps }) => {
  return (
    <div className={cn(styles.root, className)} {...HTMLProps}>
      <span>Empty</span>
    </div>
  )
}
