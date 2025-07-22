import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'

interface CellProps extends TouchableProps, PropsWithChildren {
  before?: ReactNode
  after?: ReactNode
  description?: ReactNode
  className?: string
}

const Cell: FC<CellProps> = ({ className, children, before, after, description, ...touchableProps }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' {...touchableProps}>
      {before && <div className={styles.before}>{before}</div>}
      <div className={styles.text}>{children}</div>
      {description && <div className={styles.description}>{description}</div>}
      {after}
    </Touchable>
  )
}

export default Cell
