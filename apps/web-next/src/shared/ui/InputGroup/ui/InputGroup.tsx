import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InputGroupProps extends PropsWithChildren {
  className?: string
}

const InputGroup: FC<InputGroupProps> = ({ className, children }) => {
  return <div className={cn(styles.root, className)}>{children}</div>
}

export default InputGroup
