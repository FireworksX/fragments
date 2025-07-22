import React, { FC, PropsWithChildren, cloneElement } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableRowProps extends PropsWithChildren {
  className?: string
}

export const TableRow: FC<TableRowProps> = ({ className, children }) => {
  const resultChildren = React.Children.toArray(children)

  return (
    <tr className={cn(styles.root, className)}>
      {resultChildren.map((child, index) =>
        cloneElement(child, { ...child.props, className: cn(child.props.className, styles.td), key: index })
      )}
    </tr>
  )
}
