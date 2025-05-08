import { FC, ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface StackPanelFillOptions {}

interface BuilderStackPanelEventProps {
  className?: string
  stackColors?: ReactNode
}

const BuilderStackPanelEvent: FC<BuilderStackPanelEventProps> = ({ className, stackColors }) => {
  return (
    <div className={cn(styles.root, className)}>
      <h2>test</h2>
    </div>
  )
}

export default BuilderStackPanelEvent
