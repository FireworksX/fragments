import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@adstore/web/src/components/Icon/Icon'

interface SelectProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

const SelectMimicry: FC<SelectProps> = ({ className, children, onClick }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon className={styles.caret} name='caret-down' width={11} />
      <div className={styles.inner} onClick={onClick}>
        {children}
      </div>
    </div>
  )
}

export default SelectMimicry
