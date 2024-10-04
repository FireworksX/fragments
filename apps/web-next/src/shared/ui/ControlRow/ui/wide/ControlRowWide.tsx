import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface BuilderControlRowWideProps extends PropsWithChildren {
  className?: string
}

const ControlRowWide: FC<BuilderControlRowWideProps> = ({ className, children }) => {
  return <div className={cn(styles.root, className)}>{children}</div>
}

export default ControlRowWide
