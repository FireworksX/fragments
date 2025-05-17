import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableProps extends PropsWithChildren {
  header?: ReactNode
  className?: string
}

export const Table: FC<TableProps> = ({ className, header, children }) => {
  return (
    <table className={cn(styles.root, className)}>
      {header}
      <tbody>{children}</tbody>
    </table>
  )
}
