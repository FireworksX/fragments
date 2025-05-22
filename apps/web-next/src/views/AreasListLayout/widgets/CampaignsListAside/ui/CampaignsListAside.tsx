import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCampaignsListAside } from '@/views/AreasListLayout/widgets/CampaignsListAside/hooks/useCampaignsListAside'
import { Panel } from '@/shared/ui/Panel'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '../components/CampaignPreviewItem'
import { CampaignCreateItem } from '@/views/AreasListLayout/widgets/CampaignsListAside/components/CampaignCreateItem'

interface CampaignsListAsideProps {
  className?: string
}

export const CampaignsListAside: FC<CampaignsListAsideProps> = ({ className }) => {
  const { list, handleCreate } = useCampaignsListAside()

  return (
    <div className={cn(styles.root, className)}>
      <Container gutterSize={8}>
        <Panel title='Areas'>
          <div className={styles.content}>
            <CampaignCreateItem onCreate={handleCreate} />
            {list.map(item => (
              <CampaignPreviewItem
                key={item.id}
                className={styles.card}
                name={item.name}
                slug={item.id}
                isActive={item.defaultCampaign.active}
              />
            ))}
          </div>
        </Panel>
      </Container>
    </div>
  )
}
