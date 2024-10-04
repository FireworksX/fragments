'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretRight from '@/shared/icons/caret-right.svg'

interface CollapseBaseHeaderProps extends PropsWithChildren {
  isOpen?: boolean
  className?: string
  onClick?: (nextIsOpen: boolean) => void
}

const CollapseBaseHeader: FC<CollapseBaseHeaderProps> = ({ className, children, isOpen, onClick }) => {
  return (
    <div className={cn(styles.root, className, { [styles.open]: isOpen })} onClick={() => onClick && onClick(!isOpen)}>
      <CaretRight className={styles.caret} width={9} height={9} />
      <div className={styles.text}>{children}</div>
    </div>
  )
}

export default CollapseBaseHeader
