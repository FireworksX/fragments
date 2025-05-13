'use client'
import styles from './styles.module.css'
import { CampaignsListAside } from '@/views/CampaignsListLayout/widgets/CampaignsListAside'

export const CampaignsListLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.aside}>
          <CampaignsListAside />
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
