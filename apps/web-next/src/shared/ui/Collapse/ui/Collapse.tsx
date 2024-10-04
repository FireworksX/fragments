'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { useToggle } from 'react-use'
import { Collapse as CollpseLib } from 'react-collapse'
import styles from './styles.module.css'
import { CollapseBaseHeader } from '@/shared/ui/CollapseBaseHeader'

interface CollapseProps extends PropsWithChildren {
  title?: string
  initialIsOpen?: boolean
  className?: string
}

const Collapse: FC<CollapseProps> = ({ className, children, title, initialIsOpen = true }) => {
  const [isOpen, toggleIsOpen] = useToggle(initialIsOpen)

  return (
    <div className={cn(styles.root, className)}>
      <CollapseBaseHeader isOpen={isOpen} onClick={toggleIsOpen}>
        {title}
      </CollapseBaseHeader>
      <CollpseLib isOpened={isOpen}>{children}</CollpseLib>
    </div>
  )
}

export default Collapse
