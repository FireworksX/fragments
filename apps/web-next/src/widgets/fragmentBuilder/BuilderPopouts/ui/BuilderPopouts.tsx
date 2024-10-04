import React, { createContext, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import { popoutsStore } from '@/app/store/popouts.store'

interface BuilderPopoutsProps extends PropsWithChildren {
  className?: string
}

export const BuilderPopouts: FC<BuilderPopoutsProps> = ({ className, children }) => {
  const [currentPopout] = useGraph(popoutsStore, popoutsStore.getCurrent())

  return (
    <div
      className={cn(className, styles.root, {
        [styles.left]: currentPopout?.position === 'left'
      })}
    >
      {children}
    </div>
  )
}
