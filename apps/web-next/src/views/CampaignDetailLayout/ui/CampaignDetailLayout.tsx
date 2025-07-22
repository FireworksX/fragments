'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { CampaignHeaderLayout } from '../widgets/CampaignHeaderLayout'

export const CampaignDetailLayout = ({ children }) => {
  return (
    <div className={cn(styles.root)}>
      <CampaignHeaderLayout className={styles.header} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
