'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { CampaignContentTable } from '@/views/AreasFragmentPage/widgets/CampaignContentTable'

export const CampaignDetailContent = ({ children }) => {
  return (
    <div className={cn(styles.root)}>
      <CampaignContentTable campaignId={5} />
    </div>
  )
}
