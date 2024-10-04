import { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ComponentItem {
  kind: 'component'
  component: ReactNode
  hidden?: boolean
}

interface DelimiterItem {
  kind: 'delimiter'
  hidden?: boolean
}

interface BuilderFloatingBarProps {
  className?: string
  actions: (ComponentItem | DelimiterItem)[]
}

const BuilderFloatingBar: FC<BuilderFloatingBarProps> = ({ className, actions = [] }) => {
  return (
    <div className={cn(styles.root, className)}>
      {actions
        .filter(c => !c.hidden)
        .map((cell, index) => {
          if (cell.kind === 'delimiter') {
            return <div key={index} className={styles.delimiter} />
          }
          if (cell.kind === 'component') {
            return cell.component
          }

          return null
        })}
    </div>
  )
}

export default BuilderFloatingBar
