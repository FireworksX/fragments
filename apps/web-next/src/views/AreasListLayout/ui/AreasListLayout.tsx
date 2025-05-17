'use client'
import styles from './styles.module.css'
import { CampaignsListAside } from '@/views/AreasListLayout/widgets/CampaignsListAside'

export const AreasListLayout = ({ children }) => {
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
