import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'

export interface TabItemProps extends PropsWithChildren, TouchableProps {
  isActive?: boolean
  className?: string
}

const Tabs: FC<TabItemProps> = ({ className, children, ...touchableProps }) => {
  return (
    <Touchable
      className={cn(styles.root, className, {
        [styles.active]: touchableProps.isActive
      })}
      {...touchableProps}
    >
      {children}
    </Touchable>
  )
}

export default Tabs
