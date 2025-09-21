import React, { createContext, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import { useStack } from '@/shared/hooks/useStack'

interface BuilderPopoutsProps extends PropsWithChildren {
  className?: string
}

export const BuilderPopouts: FC<BuilderPopoutsProps> = ({ className, children }) => {
  const stackStore = useStack()

  return (
    <div
      className={cn(className, styles.root, {
        [styles.left]: stackStore.currentStack?.position === 'left'
      })}
    >
      {children}
    </div>
  )
}
