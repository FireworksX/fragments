import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCampaignsListAside } from '@/views/CampaignsListLayout/widgets/CampaignsListAside/hooks/useCampaignsListAside'
import { Panel } from '@/shared/ui/Panel'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '../components/CampaignPreviewItem'
import { CampaignCreateItem } from '@/views/CampaignsListLayout/widgets/CampaignsListAside/components/CampaignCreateItem'

interface CampaignsListAsideProps {
  className?: string
}

export const CampaignsListAside: FC<CampaignsListAsideProps> = ({ className }) => {
  const { list, handleCreateCampaign } = useCampaignsListAside()

  return (
    <div className={cn(styles.root, className)}>
      <Container gutterSize={8}>
        <Panel title='Campaigns'>
          <div className={styles.content}>
            <CampaignCreateItem onCreate={handleCreateCampaign} />
            {list.map(campaign => (
              <CampaignPreviewItem
                key={campaign.id}
                className={styles.card}
                name={campaign.name}
                slug={campaign.id}
                isActive={campaign.active}
              />
            ))}
          </div>
        </Panel>
      </Container>
    </div>
  )
}
