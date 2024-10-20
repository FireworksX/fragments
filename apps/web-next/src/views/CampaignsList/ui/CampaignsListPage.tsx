import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Link } from '@/shared/ui/Link/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import { ProjectCard } from '@/widgets/ProjectCard'
import { useProjectsListView } from '@/views/ProjectsList/hooks/useProjectsListView'
import { CreateProjectModal } from '@/widgets/modals/CreateProjectModal'
import { CampaignPreviewItem } from '@/widgets/campaigns/CampaignPreviewItem/ui/CampaignPreviewItem'

export const CampaignsListPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.aside}>
          <CampaignPreviewItem className={styles.card} />
          <CampaignPreviewItem className={styles.card} />
          <CampaignPreviewItem className={styles.card} />
          <CampaignPreviewItem className={styles.card} />
          <CampaignPreviewItem className={styles.card} />
          <CampaignPreviewItem className={styles.card} />
        </div>
      </div>
    </div>
  )
}
