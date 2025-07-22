import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCampaignsListAside } from '@/views/AreasListLayout/widgets/CampaignsListAside/hooks/useCampaignsListAside'
import { Panel } from '@/shared/ui/Panel'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '../components/CampaignPreviewItem'
import { CampaignCreateItem } from '@/views/AreasListLayout/widgets/CampaignsListAside/components/CampaignCreateItem'
import { CampaignStatus } from '@/__generated__/types'

interface AreasListAsideProps {
  className?: string
}

export const AreasListAside: FC<AreasListAsideProps> = ({ className }) => {
  const { list, handleCreate } = useCampaignsListAside()

  return (
    <div className={cn(styles.root, className)}>
      <Container gutterSize={8}>
        <Panel>
          <div className={styles.content}>
            <CampaignCreateItem onCreate={handleCreate} />
            {list.map(item => (
              <CampaignPreviewItem
                key={item.id}
                className={styles.card}
                logo={item.defaultCampaign?.logo.url}
                name={item.defaultCampaign?.name}
                slug={item.id}
                isActive={item.defaultCampaign.status === CampaignStatus.Active}
              />
            ))}
          </div>
        </Panel>
      </Container>
    </div>
  )
}
