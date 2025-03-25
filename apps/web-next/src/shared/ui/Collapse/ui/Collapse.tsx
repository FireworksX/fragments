'use client'
import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import { useToggle } from 'react-use'
import { Collapse as CollpseLib } from 'react-collapse'
import styles from './styles.module.css'
import { CollapseBaseHeader } from '@/shared/ui/CollapseBaseHeader'

interface CollapseProps extends PropsWithChildren {
  header?: ReactNode | ((isOpen: boolean, toggleIsOpen: () => void) => ReactNode)
  title?: ReactNode
  initialIsOpen?: boolean
  className?: string
}

const Collapse: FC<CollapseProps> = ({ className, header, children, title, initialIsOpen = true }) => {
  const [isOpen, toggleIsOpen] = useToggle(initialIsOpen)

  return (
    <div className={cn(styles.root, className)}>
      {header ? (
        typeof header === 'function' ? (
          header(isOpen, toggleIsOpen)
        ) : (
          header
        )
      ) : (
        <CollapseBaseHeader isOpen={isOpen} onClick={toggleIsOpen}>
          {title}
        </CollapseBaseHeader>
      )}

      <CollpseLib isOpened={isOpen}>{children}</CollpseLib>
    </div>
  )
}

export default Collapse
