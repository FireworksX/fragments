import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BaseIcon from '@/shared/icons/next/info.svg'

interface InfoSectionFooterProps extends PropsWithChildren {
  icon?: ReactNode
  aside?: ReactNode
  className?: string
}

export const InfoSectionFooter: FC<InfoSectionFooterProps> = ({ className, children, icon = <BaseIcon />, aside }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.content}>
        {icon}
        {children}
      </div>
      {aside}
    </div>
  )
}
