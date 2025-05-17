import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatusDot } from '@/shared/ui/StatusDot'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { StatusBadge } from '@/shared/ui/StatusBadge'

interface CampaignDetailNameProps {
  name: string
  isActive?: boolean
  className?: string
  onRename?: (name: string) => void
}

export const CampaignDetailName: FC<CampaignDetailNameProps> = ({ className, name, isActive, onRename }) => {
  return (
    <div className={cn(styles.root, className)}>
      <ContentEditable value={name} className={styles.nameInner} onSubmit={onRename} />

      <StatusBadge status={isActive ? 'success' : 'warning'} />
    </div>
  )
}
