import React, { createContext, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import { popoutsStore } from '@/shared/store/popouts.store'

interface BuilderPopoutsProps extends PropsWithChildren {
  className?: string
}

export const BuilderPopouts: FC<BuilderPopoutsProps> = ({ className, children }) => {
  const [{ history, cursor }] = useGraph(popoutsStore, popoutsStore.key)
  const [currentPopout] = useGraph(popoutsStore, history.at(cursor) ?? 'nil')

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
