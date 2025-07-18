'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { CampaignContentTable } from '@/views/AreasFragmentPage/widgets/CampaignContentTable'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useParams } from 'next/navigation'

export const CampaignDetailContent = ({ children }) => {
  const { campaignSlug } = useParams()

  return (
    <div className={cn(styles.root)}>
      <CampaignContentTable campaignId={+campaignSlug} />
    </div>
  )
}
