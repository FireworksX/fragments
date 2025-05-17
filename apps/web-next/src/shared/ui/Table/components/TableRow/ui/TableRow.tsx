import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableRowProps extends PropsWithChildren {
  className?: string
}

export const TableRow: FC<TableRowProps> = ({ className, children }) => {
  const resultChildren = React.Children.toArray(children)

  return (
    <tr className={cn(styles.root, className)}>
      {resultChildren.map((child, index) => (
        <td key={index} className={styles.td}>
          {child}
        </td>
      ))}
    </tr>
  )
}
