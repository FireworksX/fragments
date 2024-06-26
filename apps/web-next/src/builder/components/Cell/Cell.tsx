import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable, { TouchableProps } from '@/app/components/Touchable'

interface CellProps extends TouchableProps, PropsWithChildren {
  before?: ReactNode
  description?: ReactNode
  className?: string
}

const Cell: FC<CellProps> = ({ className, children, before, description, ...touchableProps }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' {...touchableProps}>
      {before && <div className={styles.before}>{before}</div>}
      <div className={styles.text}>{children}</div>
      {description && <div className={styles.description}>{description}</div>}
    </Touchable>
  )
}

export default Cell
