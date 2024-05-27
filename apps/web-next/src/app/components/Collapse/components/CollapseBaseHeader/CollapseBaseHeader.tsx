'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@adstore/web/src/components/Icon/Icon'

interface CollapseBaseHeaderProps extends PropsWithChildren {
  isOpen?: boolean
  className?: string
  onClick?: (nextIsOpen: boolean) => void
}

const CollapseBaseHeader: FC<CollapseBaseHeaderProps> = ({ className, children, isOpen, onClick }) => {
  return (
    <div className={cn(styles.root, className)} onClick={() => onClick && onClick(!isOpen)}>
      <Icon className={styles.caret} name='caret-right' width={9} height={9} />
      <div className={styles.text}>{children}</div>
    </div>
  )
}

export default CollapseBaseHeader
