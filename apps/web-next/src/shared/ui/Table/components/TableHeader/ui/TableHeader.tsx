import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableHeaderProps extends PropsWithChildren {
  className?: string
}

export const TableHeader: FC<TableHeaderProps> = ({ className, children }) => {
  const resultChildren = React.Children.toArray(children)

  return (
    <thead className={cn(styles.root, className)}>
      <tr>
        {resultChildren.map((child, index) => (
          <th key={index} className={styles.th}>
            <div className={styles.innerCell}>{child}</div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
