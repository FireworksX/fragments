import { FC } from 'react'
import styles from './styles.module.css'
import { AnalyticsValueInfo } from '@/views/AreasDetailPage/components/AnalyticsValueInfo'
import { CurrentFragmentPreview } from '@/views/AreasDetailPage/components/CurrentFragmentPreview'
import { CurrentExperimentPreview } from '@/views/AreasDetailPage/components/CurrentExperimentPreview'

interface CampaignDetailPageProps {}

export const AreasDetailPage: FC<CampaignDetailPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <AnalyticsValueInfo className={styles.valueInfoWidget} title='Impression' trend={12} dynamic='+256'>
          14.688
        </AnalyticsValueInfo>
        <AnalyticsValueInfo className={styles.valueInfoWidget} title='Conversion Avg' trend={3}>
          5.31%
        </AnalyticsValueInfo>

        <AnalyticsValueInfo className={styles.valueInfoWidget} title='Revenue' trend={12} dynamic='+$812'>
          $12,432
        </AnalyticsValueInfo>

        <CurrentFragmentPreview className={styles.currentFragment}></CurrentFragmentPreview>

        <CurrentExperimentPreview className={styles.currentExperiment}></CurrentExperimentPreview>
      </div>
    </div>
  )
}
