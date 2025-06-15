import { ComponentRef, FC, HTMLAttributes, PropsWithChildren, TdHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableCellProps extends PropsWithChildren, Omit<TdHTMLAttributes<HTMLTableCellElement>, 'className'> {
  className?: string
}

export const TableCell: FC<TableCellProps> = ({ className, children, ...rest }) => {
  return (
    <td className={cn(styles.root, className)} {...rest}>
      {children}
    </td>
  )
}
