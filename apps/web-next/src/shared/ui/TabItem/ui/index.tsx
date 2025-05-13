import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'

export interface TabItemProps extends PropsWithChildren, TouchableProps {
  icon?: ReactNode
  isActive?: boolean
  className?: string
}

const Tabs: FC<TabItemProps> = ({ className, icon, children, ...touchableProps }) => {
  return (
    <Touchable
      className={cn(styles.root, className, {
        [styles.active]: touchableProps.isActive
      })}
      {...touchableProps}
    >
      <div className={styles.icon}>{icon}</div>
      {children}
    </Touchable>
  )
}

export default Tabs
